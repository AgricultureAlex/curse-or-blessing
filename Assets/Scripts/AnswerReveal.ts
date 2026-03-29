import { log } from "./Modules/Utils";
import { RandomSliceQuestions } from "./RandomSliceQuestions [TRY_ME]";

/**
 * Appends the ground-truth label ("Blessing" or "Curse") to the currently
 * displayed question text after the player answers, using appendReveal on
 * RandomSliceQuestions. No separate display object needed.
 *
 * Wiring (in the Lifecycle component):
 *   onQuizDataAvailable → Kind: "Script method" → Method: "cacheQuizData"
 *   onAnswer            → Kind: "Script method" → Method: "showReveal"
 *
 * Setup:
 *   1. Assign the RandomSliceQuestions component to Questions Controller.
 *   2. Set Labels: index 0 = "Curse", index 1 = "Blessing"
 *      (must match correctIdx values in your quiz data).
 *   3. delayBeforeNextQuestion on QuizController controls how long the
 *      appended label is visible before the next question replaces it.
 */
@component
export class AnswerReveal extends BaseScriptComponent {
  @input
  questionsController: RandomSliceQuestions;

  @input
  @hint("Labels indexed by correctIdx. Index 0 = Curse, Index 1 = Blessing.")
  labels: string[];

  private questions: QuestionDescription[] = [];

  onAwake(): void {
    if (isNull(this.questionsController)) {
      log("AnswerReveal: questionsController is not assigned.");
    }
  }

  /** Wire to Lifecycle → onQuizDataAvailable. Receives: (quizData: QuizData) */
  public cacheQuizData(data: QuizData): void {
    this.questions = data.questions;
  }

  /** Wire to Lifecycle → onAnswer.
   *  Receives: (isCorrect: boolean|null, answerIndex: number, questionIndex: number, questionViewIndex: number) */
  public showReveal(
    _isCorrect: boolean | null,
    _answerIndex: number,
    questionIndex: number,
    _questionViewIndex: number,
  ): void {
    if (isNull(this.questionsController)) {
      log("AnswerReveal: questionsController is not assigned.");
      return;
    }

    const question = this.questions[questionIndex];
    if (!question) {
      log("AnswerReveal: no question at index " + questionIndex + ".");
      return;
    }

    const correctIdx = question.correctIdx;
    if (typeof correctIdx !== "number") {
      return;
    }

    const label = this.labels[correctIdx];
    if (!label) {
      log(
        "AnswerReveal: no label for correctIdx " +
          correctIdx +
          ". Check Labels input.",
      );
      return;
    }

    this.questionsController.appendReveal(label);
  }
}
