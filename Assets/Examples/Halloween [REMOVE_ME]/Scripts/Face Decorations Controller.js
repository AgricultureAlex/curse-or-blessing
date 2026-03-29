//@input Component.Text leftText
//@input Component.Text rightText

let quizData = null;

script.onQuestions = () => setText("");

script.onQuizData = (qd) => quizData = qd;

script.onAnswer = (isCorect, a, q, qv) => setText(quizData.questions[q].answers[a]);

function setText(value) {
    script.leftText.text = value;
    script.rightText.text = value;
}
