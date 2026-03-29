const quizData = {
    questions: [
        {
            question: "What is the largest organ inside the human body?",
            answers: [
                "Liver",
                "Stomach",
                "Kidney",
                "Lung",
            ],
            correctIdx: 0,
        },
        {
            question: "What's the safe max dB for humans?",
            answers: [
                "120 dB",
                "100 dB",
                "90 dB",
                "85 dB",
            ],
            correctIdx: 3,
        },
        {
            question: "How many strokes does an eyelash make in its entire life?",
            answers: [
                "~ 100 thousand",
                "~ 10,000",
                "~ 50 thousand",
                "~ 200 thousand",
            ],
            correctIdx: 1,
        },
        {
            question: "What mineral is found in the human body the most after calcium?",
            answers: [
                "Iron",
                "Sodium",
                "Phosphorus",
                "Magnesium",
            ],
            correctIdx: 2,
        },
        {
            question: "How many liters of sweat does an average person produce per day?",
            answers: [
                "~ 2.5 - 3.0 liters",
                "~ 4.0 liters",
                "~ 0.8 - 1.4 liters",
                "~ 1.5 liters",
            ],
            correctIdx: 2,
        },
        {
            question: "What is the strongest bone in the human body?",
            answers: [
                "Femoral",
                "Skull",
                "Tibia",
                "Humerus",
            ],
            correctIdx: 0,
        },
        {
            question: "Which organ contains the most bacteria?",
            answers: [
                "The skin",
                "The mouth",
                "The intestines",
                "The tongue",
            ],
            correctIdx: 2,
        },
        {
            question: "What is the approximate speed of propagation of a nerve impulse?",
            answers: [
                "1200 km/h",
                "120 km/h",
                "600 km/h",
                "800 km/h",
            ],
            correctIdx: 1,
        },
        {
            question: "What is the longest nerve in the human body?",
            answers: [
                "Spinal cord",
                "Vagus nerve",
                "Optic nerve",
                "Sciatic nerve",
            ],
            correctIdx: 3,
        },
        {
            question: "What is the temperature of the human stomach when digesting food?",
            answers: [
                "~ 37°C",
                "~ 42°C",
                "~ 45°C",
                "~ 40°C",
            ],
            correctIdx: 0,
        },
        {
            question: "What is the most abundant element in the human body after oxygen and carbon?",
            answers: [
                "Potassium",
                "Hydrogen",
                "Nitrogen",
                "Calcium",
            ],
            correctIdx: 1,
        },
        {
            question: "Which part of the human body produces the most heat?",
            answers: [
                "Heart",
                "Liver",
                "Muscles",
                "Brain",
            ],
            correctIdx: 3,
        },
        {
            question: "How many liters of tears does the human eye produce in a year?",
            answers: [
                "~ 30 liters",
                "~ 120 liters",
                "~ 200 liters",
                "~ 150 liters",
            ],
            correctIdx: 0,
        },
        {
            question: "What is the total distance covered by blood cells in one day?",
            answers: [
                "190,000 miles",
                "50,000 miles",
                "1,000,000 miles",
                "12,000 miles",
            ],
            correctIdx: 3,
        },
        {
            question: "What percentage of the total body weight is the human brain?",
            answers: [
                "~ 10%",
                "~ 2%",
                "~ 5%",
                "~ 3%",
            ],
            correctIdx: 1,
        },
        {
            question: "How many cells die and are replaced in the human body every day?",
            answers: [
                "~ 50 billion",
                "~ 100 billion",
                "~ 200 billion",
                "~ 150 billion",
            ],
            correctIdx: 0,
        },
        {
            question: "What is the average volume of air a person inhales in one day?",
            answers: [
                "~ 500 liters",
                "~ 1000 liters",
                "~ 5000 liters",
                "~ 2000 liters",
            ],
            correctIdx: 2,
        },
        {
            question: "What is the average pumping speed of the heart?",
            answers: [
                "~ 5 liters per minute",
                "~ 50 liters per minute",
                "~ 100 liters per minute",
                "~ 10 liters per minute",
            ],
            correctIdx: 0,
        },
        {
            question: "How many cells are in the average adult brain?",
            answers: [
                "~ 86 million",
                "~ 100 million",
                "~ 86 billion",
                "~ 200 million",
            ],
            correctIdx: 2,
        },
        {
            question: "What is the maximum duration of uninterrupted sleep recorded in humans?",
            answers: [
                "432 hours",
                "500 hours",
                "300 hours",
                "264 hours",
            ],
            correctIdx: 3,
        },
        {
            question: "What is the smallest bone in the human body?",
            answers: [
                "Stapes in the ear",
                "Femur",
                "Tibia",
                "Metacarpal",
            ],
            correctIdx: 0,
        },
        {
            question: "What is the average lifespan of a human red blood cell?",
            answers: [
                "90 days",
                "60 days",
                "120 days",
                "80 days",
            ],
            correctIdx: 2,
        },
        {
            question: "How many chambers does the human heart have?",
            answers: [
                "3",
                "2",
                "5",
                "4",
            ],
            correctIdx: 3,
        },
        {
            question: "What is the largest muscle in the human body?",
            answers: [
                "Biceps",
                "Gluteus Maximus",
                "Triceps",
                "Deltoid",
            ],
            correctIdx: 1,
        },
        {
            question: "How many bones are there in an adult human body?",
            answers: [
                "206",
                "300",
                "400",
                "350",
            ],
            correctIdx: 0,
        },
        {
            question: "What is the average body temperature in Celsius of a healthy human?",
            answers: [
                "35°C",
                "36°C",
                "37°C",
                "38°C",
            ],
            correctIdx: 2,
        },
        {
            question: "How many pairs of chromosomes does a human have?",
            answers: [
                "23",
                "46",
                "44",
                "45",
            ],
            correctIdx: 0,
        },
        {
            question: "What is the most common blood type in humans?",
            answers: [
                "AB",
                "A",
                "O",
                "B",
            ],
            correctIdx: 2,
        },
        {
            question: "What is the average breathing rate per minute for a resting adult?",
            answers: [
                "1-29",
                "25",
                "15",
                "12-20",
            ],
            correctIdx: 3,
        },
        {
            question: "What is the average blood volume in liters in an adult human?",
            answers: [
                "3-4 liters",
                "5-6 liters",
                "2-3 liters",
                "7-8 liters",
            ],
            correctIdx: 1,
        },
    ],
    results: [
        {
            text: "{answersMatched}/{questionsAsked} -- Not everything works on the first try. Try again.",
            scene: 0,
            ceil: 2,
        }, {
            text: "Good – {answersMatched}/{questionsAsked}! Can you improve your results?",
            scene: 1,
            ceil: 4,
        }, {
            text: "Wow! Ready to nail a {answersMatched}/{questionsAsked} again?",
            scene: 2,
            ceil: 100,
        },
    ],
};

// Fill matching answers for each result, as they are defined by the correctIdx and identical for each one
// the final result will be discriminated by the `ceil` value
const correctAnswers = quizData.questions.map(q => q.correctIdx);
quizData.results.forEach(r => {
    correctAnswers.forEach((a, q) => r[q + ""] = a);
});

const quizDataPromise = Promise.resolve(quizData);

script.getQuizData = () => quizDataPromise;
