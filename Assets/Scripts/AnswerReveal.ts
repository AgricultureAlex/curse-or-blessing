import { log } from "./Modules/Utils";

/**
 * Appends the ground-truth label ("Blessing" or "Curse") to the currently
 * displayed question text after the player answers, using the questions
 * controller's appendReveal method. No separate display object needed.
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
  @input("Component.ScriptComponent")
  @hint("The RandomSliceQuestions component in the scene.")
  private readonly questionsController: ScriptComponent;

  @input
  @hint("Labels indexed by correctIdx. Index 0 = Curse, Index 1 = Blessing.")
  private readonly labels: string[];

  private questions: QuestionDescription[] = [];

  onAwake() {}

  /**
   * Wire to Lifecycle → onQuizDataAvailable.
   * Lifecycle passes: (quizData: QuizData)
   */
  public cacheQuizData(data: QuizData) {
    this.questions = data.questions;
  }

  /**
   * Wire to Lifecycle → onAnswer.
   * Lifecycle passes: (isCorrect: boolean|null, answerIndex: number, questionIndex: number, questionViewIndex: number)
   */
  public showReveal(
    _isCorrect: boolean | null,
    _answerIndex: number,
    questionIndex: number,
    _questionViewIndex: number,
  ) {
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

    const controller = this.questionsController as any;
    if (typeof controller.appendReveal !== "function") {
      log(
        "AnswerReveal: questionsController does not have appendReveal. Make sure it is RandomSliceQuestions.",
      );
      return;
    }

    controller.appendReveal(label);
  }
}
