@component
export class QuizDataSource
  extends BaseScriptComponent
  implements IQuizDataSource
{
  @ui.label(
    "Blessing or Curse? — Players tilt their head YES (left) for Blessing, NO (right) for Curse.\
 Edit this script to add, remove, or reorder questions and adjust the score brackets in results.",
  )
  private readonly data: QuizData = {
    questions: [
      // correctIdx 1 = Blessing (YES / tilt left)
      // correctIdx 0 = Curse   (NO  / tilt right)
      //
      // The 'answers' array is ignored by the head picker but kept here
      // so the data is self-documenting and works if you ever switch to buttons.
      {
        question: "Baraka\n(Swahili)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
      },
      {
        question: "Maledizione\n(Italian)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
      },
      {
        question: "Mazel Tov\n(Hebrew)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
      },
      {
        question: "Maldición\n(Spanish)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
      },
      {
        question: "Benedizione\n(Italian)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
      },
      {
        question: "Fluch\n(German)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
      },
      {
        question: "Bénédiction\n(French)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
      },
      {
        question: "Ayin Hara\n(Hebrew)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
      },
      {
        question: "Gesundheit\n(German)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
      },
      {
        question: "Malédiction\n(French)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
      },
    ],

    // Score brackets using 'ceil'.
    // Every result below shares the same correct-answer pattern — only 'ceil' and
    // 'text' differ, so the system picks the lowest bracket the player's score fits into.
    //
    // With 10 questions:
    //   0 – 3  correct  →  scene 0  (Apprentice)
    //   4 – 6  correct  →  scene 1  (Traveler)
    //   7 – 10 correct  →  scene 2  (Scholar)
    //
    // Add more brackets or adjust the ceil values to taste.
    // Use {answersMatched} and {questionsAsked} in text to show live score numbers.
    results: [
      {
        text: "Apprentice Linguist\n{answersMatched} / {questionsAsked}",
        scene: 0,
        ceil: 3,
        // The correct answer for each question by index:
        "0": 1, // Baraka       → Blessing
        "1": 0, // Maledizione  → Curse
        "2": 1, // Mazel Tov    → Blessing
        "3": 0, // Maldición    → Curse
        "4": 1, // Benedizione  → Blessing
        "5": 0, // Fluch        → Curse
        "6": 1, // Bénédiction  → Blessing
        "7": 0, // Ayin Hara    → Curse
        "8": 1, // Gesundheit   → Blessing
        "9": 0, // Malédiction  → Curse
      },
      {
        text: "Seasoned Traveler\n{answersMatched} / {questionsAsked}",
        scene: 1,
        ceil: 6,
        "0": 1,
        "1": 0,
        "2": 1,
        "3": 0,
        "4": 1,
        "5": 0,
        "6": 1,
        "7": 0,
        "8": 1,
        "9": 0,
      },
      {
        text: "Master of Languages\n{answersMatched} / {questionsAsked}",
        scene: 2,
        // High ceil so any score above the previous bracket lands here.
        ceil: 1000,
        "0": 1,
        "1": 0,
        "2": 1,
        "3": 0,
        "4": 1,
        "5": 0,
        "6": 1,
        "7": 0,
        "8": 1,
        "9": 0,
      },
    ],
  };

  public getQuizData(): Promise<QuizData> {
    return Promise.resolve(this.data);
  }
}
