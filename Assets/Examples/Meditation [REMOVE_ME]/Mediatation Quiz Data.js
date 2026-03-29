const quizData = Promise.resolve({
    "questions": [
        {
            "question": "Do you often find\n yourself overwhelmed\n by your thoughts?",
            "answers": [
                "No",
                "Yes"
            ]
        },
        {
            "question": "Do you prefer focusing\n on a single task\n rather than multitasking?",
            "answers": [
                "No",
                "Yes"
            ]
        },
        {
            "question": "Can you easily focus\n on your bodily sensations?",
            "answers": [
                "No",
                "Yes"
            ],
        },
        {
            "question": "Do you find peace\n in observing\n your environment?",
            "answers": [
                "No",
                "Yes"
            ],
        }
    ],
    "results": [
        { "text": "Mindfulness meditation", "scene": 0, "0": 0, "1": 0, "2": 0, "3": 0 },
        { "text": "Body scan meditation", "scene": 1, "0": 0, "1": 0, "2": 0, "3": 1 },
        { "text": "Body scan meditation", "scene": 1, "0": 0, "1": 0, "2": 1, "3": 0 },
        { "text": "Body scan meditation", "scene": 1, "0": 0, "1": 0, "2": 1, "3": 1 },
        { "text": "Deep focus meditation", "scene": 2, "0": 0, "1": 1, "2": 0, "3": 0 },
        { "text": "Deep focus meditation", "scene": 2, "0": 0, "1": 1, "2": 0, "3": 1 },
        { "text": "Body scan meditation", "scene": 1, "0": 0, "1": 1, "2": 1, "3": 0 },
        { "text": "Body scan meditation", "scene": 1, "0": 0, "1": 1, "2": 1, "3": 1 },
        { "text": "Mindfulness meditation", "scene": 0, "0": 1, "1": 0, "2": 0, "3": 0 },
        { "text": "Mindfulness meditation", "scene": 0, "0": 1, "1": 0, "2": 0, "3": 1 },
        { "text": "Mindfulness meditation", "scene": 0, "0": 1, "1": 0, "2": 1, "3": 0 },
        { "text": "Body scan meditation", "scene": 1, "0": 1, "1": 0, "2": 1, "3": 1 },
        { "text": "Deep focus meditation", "scene": 2, "0": 1, "1": 1, "2": 0, "3": 0 },
        { "text": "Deep focus meditation", "scene": 2, "0": 1, "1": 1, "2": 0, "3": 1 },
        { "text": "Deep focus meditation", "scene": 2, "0": 1, "1": 1, "2": 1, "3": 0 },
        { "text": "Body scan meditation", "scene": 1, "0": 1, "1": 1, "2": 1, "3": 1 }
    ]

});

script.getQuizData = () => quizData;
