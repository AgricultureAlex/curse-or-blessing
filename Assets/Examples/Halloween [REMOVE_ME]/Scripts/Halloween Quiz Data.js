const quizData = Promise.resolve({
    "questions": [
        {
            "question": "Your\nHalloween symbol:",
            "answers": [
                "🎃",
                "👻",
            ]
        },
        {
            "question": "Halloween pet:",
            "answers": [
                "🦇",
                "🐱",
            ]
        },
        {
            "question": "Pick a color:",
            "answers": [
                "💜",
                "🧡",
            ],
        },
        {
            "question": "What will you choose:",
            "answers": [
                "🕸️",
                "🧹",
            ],
        },
        {
            "question": "Pick an emotion:",
            "answers": [
                "😱",
                "😈",
            ],
        },
        {
            "question": "Choose a magical creature:",
            "answers": [
                "🐲",
                "🦄",
            ],
        },
        {
            "question": "What’s scarier:",
            "answers": [
                "💀",
                "🤡",
            ],
        },
        {
            "question": "Choose an element:",
            "answers": [
                "🔥",
                "💧",
            ],
        },
        {
            "question": "Who wins:",
            "answers": [
                "👽",
                "🤖",
            ],
        },
        {
            "question": "Trust your gut:",
            "answers": [
                "💩",
                "🍄",
            ],
        }
    ],
    "results": [
        {
            "text": "Skull",
            "scene": 0,
            "0": 0,
            "1": 0,
            "2": 1,
            "3": 1
        },
        {
            "text": "Skull",
            "scene": 0,
            "0": 0,
            "1": 1,
            "2": 1,
            "3": 0
        },
        {
            "text": "Skull",
            "scene": 0,
            "0": 1,
            "1": 0,
            "2": 1,
            "3": 0
        },
        {
            "text": "Scarecrow",
            "scene": 1,
            "0": 0,
            "1": 0,
            "2": 1,
            "3": 0
        },
        {
            "text": "Scarecrow",
            "scene": 1,
            "0": 0,
            "1": 1,
            "2": 0,
            "3": 0
        },
        {
            "text": "Scarecrow",
            "scene": 1,
            "0": 0,
            "1": 1,
            "2": 0,
            "3": 1
        },
        {
            "text": "Scarecrow",
            "scene": 1,
            "0": 0,
            "1": 1,
            "2": 1,
            "3": 1
        },
        {
            "text": "Vampire",
            "scene": 2,
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0
        },
        {
            "text": "Clown",
            "scene": 3,
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 1
        },
        {
            "text": "Clown",
            "scene": 3,
            "0": 1,
            "1": 0,
            "2": 0,
            "3": 0
        },
        {
            "text": "Clown",
            "scene": 3,
            "0": 1,
            "1": 1,
            "2": 0,
            "3": 1
        },
        {
            "text": "Clown",
            "scene": 3,
            "0": 1,
            "1": 1,
            "2": 1,
            "3": 1
        },
        {
            "text": "Mummy",
            "scene": 4,
            "0": 1,
            "1": 1,
            "2": 0,
            "3": 0
        },
        {
            "text": "Mummy",
            "scene": 4,
            "0": 1,
            "1": 1,
            "2": 1,
            "3": 0
        },
        {
            "text": "Frankenstein",
            "scene": 5,
            "0": 1,
            "1": 0,
            "2": 0,
            "3": 1
        },
        {
            "text": "Frankenstein",
            "scene": 5,
            "0": 1,
            "1": 0,
            "2": 1,
            "3": 1
        }
    ]
});

script.getQuizData = () => quizData;
