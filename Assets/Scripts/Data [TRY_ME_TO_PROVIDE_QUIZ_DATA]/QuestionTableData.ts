import { log } from "../Modules/Utils";

/**
 * A single row in the question table.
 * Each question has its text, correct answer, translation, and audio clip together in one place.
 */
@typedef
class QuestionEntry {
  @input
  @widget(new TextAreaWidget())
  @hint("The word or phrase displayed on screen.")
  readonly question: string;

  @input("int")
  @label("Correct answer: 0 = Curse, 1 = Blessing")
  @hint("0 = Curse (tilt right / NO)   1 = Blessing (tilt left / YES)")
  readonly correctIdx: number;

  @input
  @widget(new TextAreaWidget())
  @hint(
    "Translation or meaning shown after the player answers. Leave empty to skip.",
  )
  readonly translation: string;

  @input
  @allowUndefined
  @hint(
    "Pronunciation audio clip for this question. Leave empty to skip audio.",
  )
  readonly audioTrack: AudioTrackAsset;
}

/**
 * A single score bracket row.
 * Brackets must be listed in ascending order of maxScore.
 * The system picks the lowest bracket whose maxScore >= the player's final score.
 * Set maxScore to a large number (e.g. 1000) on the last bracket so it catches everything above.
 */
@typedef
class ScoreBracket {
  @input
  @widget(new TextAreaWidget())
  @hint(
    "Result text shown on screen. Use {answersMatched} and {questionsAsked} for live numbers.",
  )
  readonly text: string;

  @input("int")
  @hint(
    "Which result prefab slot to activate in ResultsController (0-based index).",
  )
  readonly scene: number;

  @input("int")
  @hint("Upper score limit for this bracket. Use 1000 for the top bracket.")
  readonly maxScore: number;
}

/**
 * Combined quiz data source, per-question audio player, and translation display.
 *
 * HOW TO USE
 * ----------
 * 1. Attach this script to a SceneObject (e.g. "Quiz Data").
 * 2. Add an AudioComponent to the same SceneObject and assign it below.
 * 3. Create a Text SceneObject for the translation and attach QuestionView.ts to it.
 *    Assign it to the Translation Display input below.
 * 4. Fill in the Questions table — one row per question.
 * 5. Fill in the Score Brackets table — one row per result tier, ascending maxScore.
 * 6. In QuizController → Question Source, point to this script.
 * 7. In Lifecycle, wire the following Script method entries:
 *      On Next Question  → playForQuestion
 *      On Next Question  → hideTranslation
 *      On Answer         → showTranslation
 *      On Questions Hidden → stopAudio
 *
 * The correct-answer mapping inside each result bracket is generated automatically
 * from your question table, so you never need to maintain parallel arrays.
 */
@component
export class QuestionTableData
  extends BaseScriptComponent
  implements IQuizDataSource
{
  @ui.label(
    "One row per question. Order here is the full pool — RandomSliceQuestions picks a random subset each round.",
  )
  @input
  private readonly questions: QuestionEntry[];

  @ui.separator
  @ui.label(
    "Score brackets in ascending maxScore order. The lowest bracket whose maxScore >= score is shown.",
  )
  @input
  private readonly scoreBrackets: ScoreBracket[];

  @ui.separator
  @input
  @hint(
    "AudioComponent used to play question audio. Add it to this same SceneObject.",
  )
  private readonly audioComponent: AudioComponent;

  @input("float", "0")
  @hint(
    "Seconds to wait after the question appears before the audio plays. 0 = immediate.",
  )
  private readonly audioDelay: number;

  @ui.separator
  @input("Component.ScriptComponent")
  @allowUndefined
  @hint(
    "A SceneObject with QuestionView.ts (or any IFadeText script) that displays the translation after each answer.",
  )
  private readonly translationDisplay: IFadeText;

  private delayEvent: DelayedCallbackEvent;
  private pendingTrack: AudioTrackAsset | null = null;

  onAwake() {
    this.delayEvent = this.createEvent("DelayedCallbackEvent");
    this.delayEvent.bind(() => {
      if (this.pendingTrack) {
        this.audioComponent.audioTrack = this.pendingTrack;
        this.audioComponent.play(1);
        this.pendingTrack = null;
      }
    });

    if (this.translationDisplay) {
      this.translationDisplay.forceHide();
    }
  }

  /**
   * Builds QuizData from the Inspector table.
   * Each score bracket automatically receives the correct answer index for every
   * question, so results always stay in sync with the question table.
   */
  public getQuizData(): Promise<QuizData> {
    if (!this.questions || this.questions.length === 0) {
      log(
        "QuestionTableData: No questions defined. Add rows to the Questions table.",
      );
      return Promise.resolve({ questions: [], results: [] });
    }

    if (!this.scoreBrackets || this.scoreBrackets.length === 0) {
      log(
        "QuestionTableData: No score brackets defined. Add rows to the Score Brackets table.",
      );
      return Promise.resolve({ questions: [], results: [] });
    }

    const questions: QuestionDescription[] = this.questions.map((q) => ({
      question: q.question,
      // Kept for compatibility if you ever swap to button pickers.
      answers: ["Curse", "Blessing"],
      correctIdx: q.correctIdx,
    }));

    // Every bracket shares the same correct-answer pattern derived from the
    // question table. Only `ceil`, `text`, and `scene` differ between brackets.
    const results: ResultDescription[] = this.scoreBrackets.map((bracket) => {
      const result: ResultDescription = {
        text: bracket.text,
        scene: bracket.scene,
        ceil: bracket.maxScore,
      };
      // Inject the correct answer for each question by index.
      this.questions.forEach((q, i) => {
        result[i + ""] = q.correctIdx;
      });
      return result;
    });

    log(
      "QuestionTableData: loaded " +
        questions.length +
        " questions " +
        "and " +
        results.length +
        " score brackets.",
    );

    return Promise.resolve({ questions, results });
  }

  /**
   * Shows the translation of the answered question.
   * Wire to Lifecycle → On Answer (Script method).
   * Lifecycle passes: (isCorrect: boolean|null, answerIdx: number, questionIdx: number, questionViewIdx: number)
   */
  public showTranslation(
    _isCorrect: boolean | null,
    _answerIdx: number,
    questionIdx: number,
    _questionViewIdx: number,
  ) {
    if (!this.translationDisplay) return;

    const entry = this.questions[questionIdx];
    if (!entry || !entry.translation) return;

    this.translationDisplay.setText(entry.translation);
    this.translationDisplay.fadeIn();
  }

  /**
   * Hides the translation when the next question arrives.
   * Wire to Lifecycle → On Next Question (Script method).
   * Lifecycle passes: (questionIdx: number, questionViewIdx: number, isLast: boolean)
   */
  public hideTranslation(
    _questionIdx: number,
    _questionViewIdx: number,
    _isLast: boolean,
  ) {
    if (!this.translationDisplay) return;
    this.translationDisplay.fadeOut();
  }

  /**
   * Plays the audio track associated with the given question index.
   * Wire to Lifecycle → On Next Question (Script method).
   * Lifecycle passes: (questionIndex: number, questionViewIndex: number, isLast: boolean)
   */
  public playForQuestion(
    questionIndex: number,
    _questionViewIndex: number,
    _isLast: boolean,
  ) {
    const entry = this.questions[questionIndex];

    if (!entry) {
      log("QuestionTableData: no entry for question index " + questionIndex);
      return;
    }

    if (!entry.audioTrack) {
      // Audio is optional — silently skip rather than log noise every question.
      return;
    }

    // Stop any clip that is still playing so tracks never overlap.
    if (this.audioComponent.isPlaying()) {
      this.audioComponent.stop(false);
    }

    if (this.audioDelay > 0) {
      // Cancel any previously scheduled play before scheduling a new one.
      this.delayEvent.reset(-1);
      this.pendingTrack = entry.audioTrack;
      this.delayEvent.reset(this.audioDelay);
    } else {
      this.audioComponent.audioTrack = entry.audioTrack;
      this.audioComponent.play(1);
    }
  }

  /**
   * Stops any currently playing audio and cancels a pending delayed play.
   * Wire to Lifecycle → On Questions Hidden (Script method)
   * so audio does not bleed into the result screen.
   */
  public stopAudio() {
    this.delayEvent.reset(-1);
    this.pendingTrack = null;
    if (this.audioComponent.isPlaying()) {
      this.audioComponent.stop(true);
    }
  }
}
