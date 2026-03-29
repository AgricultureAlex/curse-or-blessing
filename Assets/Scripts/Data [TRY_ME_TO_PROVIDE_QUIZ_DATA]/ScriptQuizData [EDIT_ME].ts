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

// ── CHINESE ──────────────────────────────────────────────────────────────
{
        question: "福 (Fú)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "傻逼 (Shǎ bī)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "恭喜发财 (Gōng xǐ fā cái)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "他妈的 (Tā mā de)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "万事如意 (Wàn shì rú yì)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "操 (Cào)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "岁岁平安 (Suì suì píng ān)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "王八蛋 (Wáng bā dàn)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "百年好合 (Bǎi nián hǎo hé)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "滚 (Gǔn)\n(Chinese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── SWAHILI ───────────────────────────────────────────────────────────────
{
        question: "Baraka za Mungu\n(Swahili)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Umbwa\n(Swahili)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Safari njema\n(Swahili)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Mjinga\n(Swahili)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Heri na baraka\n(Swahili)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Nenda zako\n(Swahili)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── SPANISH ───────────────────────────────────────────────────────────────
{
        question: "Buena suerte\n(Spanish)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Hijo de puta\n(Spanish)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Salud, dinero y amor\n(Spanish)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Vete a la mierda\n(Spanish)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Que te vaya bien\n(Spanish)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Pendejo\n(Spanish)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── ITALIAN ───────────────────────────────────────────────────────────────
{
        question: "In bocca al lupo\n(Italian)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Vaffanculo\n(Italian)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Cento di questi giorni\n(Italian)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Stronzo\n(Italian)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Salute\n(Italian)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Porco dio\n(Italian)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── FRENCH ────────────────────────────────────────────────────────────────
{
        question: "Bonne chance\n(French)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Va te faire foutre\n(French)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Santé\n(French)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Fils de pute\n(French)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Longue vie et bonheur\n(French)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Ta gueule\n(French)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── VIETNAMESE ────────────────────────────────────────────────────────────
{
        question: "Chúc mừng năm mới\n(Vietnamese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Đụ má\n(Vietnamese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Bình an\n(Vietnamese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Mẹ kiếp\n(Vietnamese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Phúc lộc thọ\n(Vietnamese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Đồ ngu\n(Vietnamese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── HINDI ─────────────────────────────────────────────────────────────────
{
        question: "Jeete raho\n(Hindi)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Harami\n(Hindi)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Khush raho\n(Hindi)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Kutte\n(Hindi)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Sada sukhi raho\n(Hindi)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Saala\n(Hindi)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── GERMAN ────────────────────────────────────────────────────────────────
{
        question: "Gesundheit\n(German)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Arschloch\n(German)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Alles Gute\n(German)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Verdammt\n(German)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Viel Glück\n(German)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Vollidiot\n(German)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── JAPANESE ──────────────────────────────────────────────────────────────
{
        question: "Oshiawase ni\n(Japanese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Kuso\n(Japanese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Suenagaku oshiawase ni\n(Japanese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Shine\n(Japanese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Buun choukyuu\n(Japanese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Kono yarou\n(Japanese)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── THAI ──────────────────────────────────────────────────────────────────
{
        question: "Chok dee\n(Thai)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Hia\n(Thai)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Kho hai mee khwam suk\n(Thai)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Khwai\n(Thai)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Sawatdi pi mai\n(Thai)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Pai tai\n(Thai)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── KOREAN ────────────────────────────────────────────────────────────────
{
        question: "Bok mani badeuseyo\n(Korean)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Ssibal\n(Korean)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Geonganghaseyo\n(Korean)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Gaesaekki\n(Korean)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Haengbokhaseyo\n(Korean)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Kkeojyeo\n(Korean)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── AMHARIC ───────────────────────────────────────────────────────────────
{
        question: "Igziabher yibarkh\n(Amharic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Wisha\n(Amharic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Dehna hun\n(Amharic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Dedeb\n(Amharic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Salam yihun\n(Amharic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Hed atfa\n(Amharic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── ARABIC ────────────────────────────────────────────────────────────────
{
        question: "Barakallahu fik\n(Arabic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Yikhrib beitak\n(Arabic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Mashallah\n(Arabic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Himar\n(Arabic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Allah yahfazak\n(Arabic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Ibn el sharmouta\n(Arabic)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},

// ── BENGALI ───────────────────────────────────────────────────────────────
{
        question: "Dirghajibi hao\n(Bengali)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Kuttar bachcha\n(Bengali)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Sukhi thako\n(Bengali)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Haramjada\n(Bengali)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
{
        question: "Shubhokamona\n(Bengali)",
        answers: ["Curse", "Blessing"],
        correctIdx: 1,
},
{
        question: "Gadha\n(Bengali)",
        answers: ["Curse", "Blessing"],
        correctIdx: 0,
},
],

// Score brackets using 'ceil'.
// Total questions: 84
// With 84 questions:
//   0  – 27 correct  →  scene 0  (Apprentice Linguist)
//   28 – 56 correct  →  scene 1  (Seasoned Traveler)
//   57 – 84 correct  →  scene 2  (Master of Languages)
//
// Use {answersMatched} and {questionsAsked} in text to show live score numbers.
    results: [
{
        text: "Apprentice Linguist\n{answersMatched} / {questionsAsked}",
        scene: 0,
        ceil: 27,
// correctIdx per question index (0-indexed):
// Chinese (0–9)
"0": 1,  // 福             → Blessing
"1": 0,  // 傻逼           → Curse
"2": 1,  // 恭喜发财       → Blessing
"3": 0,  // 他妈的         → Curse
"4": 1,  // 万事如意       → Blessing
"5": 0,  // 操             → Curse
"6": 1,  // 岁岁平安       → Blessing
"7": 0,  // 王八蛋         → Curse
"8": 1,  // 百年好合       → Blessing
"9": 0,  // 滚             → Curse
// Swahili (10–15)
"10": 1, // Baraka za Mungu → Blessing
"11": 0, // Umbwa           → Curse
"12": 1, // Safari njema    → Blessing
"13": 0, // Mjinga          → Curse
"14": 1, // Heri na baraka  → Blessing
"15": 0, // Nenda zako      → Curse
// Spanish (16–21)
"16": 1, // Buena suerte         → Blessing
"17": 0, // Hijo de puta         → Curse
"18": 1, // Salud, dinero y amor → Blessing
"19": 0, // Vete a la mierda     → Curse
"20": 1, // Que te vaya bien     → Blessing
"21": 0, // Pendejo              → Curse
// Italian (22–27)
"22": 1, // In bocca al lupo       → Blessing
"23": 0, // Vaffanculo             → Curse
"24": 1, // Cento di questi giorni → Blessing
"25": 0, // Stronzo                → Curse
"26": 1, // Salute                 → Blessing
"27": 0, // Porco dio              → Curse
// French (28–33)
"28": 1, // Bonne chance         → Blessing
"29": 0, // Va te faire foutre   → Curse
"30": 1, // Santé                → Blessing
"31": 0, // Fils de pute         → Curse
"32": 1, // Longue vie et bonheur → Blessing
"33": 0, // Ta gueule            → Curse
// Vietnamese (34–39)
"34": 1, // Chúc mừng năm mới → Blessing
"35": 0, // Đụ má              → Curse
"36": 1, // Bình an            → Blessing
"37": 0, // Mẹ kiếp            → Curse
"38": 1, // Phúc lộc thọ       → Blessing
"39": 0, // Đồ ngu             → Curse
// Hindi (40–45)
"40": 1, // Jeete raho       → Blessing
"41": 0, // Harami           → Curse
"42": 1, // Khush raho       → Blessing
"43": 0, // Kutte            → Curse
"44": 1, // Sada sukhi raho  → Blessing
"45": 0, // Saala            → Curse
// German (46–51)
"46": 1, // Gesundheit  → Blessing
"47": 0, // Arschloch   → Curse
"48": 1, // Alles Gute  → Blessing
"49": 0, // Verdammt    → Curse
"50": 1, // Viel Glück  → Blessing
"51": 0, // Vollidiot   → Curse
// Japanese (52–57)
"52": 1, // Oshiawase ni           → Blessing
"53": 0, // Kuso                   → Curse
"54": 1, // Suenagaku oshiawase ni → Blessing
"55": 0, // Shine                  → Curse
"56": 1, // Buun choukyuu          → Blessing
"57": 0, // Kono yarou             → Curse
// Thai (58–63)
"58": 1, // Chok dee                → Blessing
"59": 0, // Hia                     → Curse
"60": 1, // Kho hai mee khwam suk   → Blessing
"61": 0, // Khwai                   → Curse
"62": 1, // Sawatdi pi mai          → Blessing
"63": 0, // Pai tai                 → Curse
// Korean (64–69)
"64": 1, // Bok mani badeuseyo → Blessing
"65": 0, // Ssibal             → Curse
"66": 1, // Geonganghaseyo     → Blessing
"67": 0, // Gaesaekki          → Curse
"68": 1, // Haengbokhaseyo     → Blessing
"69": 0, // Kkeojyeo           → Curse
// Amharic (70–75)
"70": 1, // Igziabher yibarkh → Blessing
"71": 0, // Wisha             → Curse
"72": 1, // Dehna hun         → Blessing
"73": 0, // Dedeb             → Curse
"74": 1, // Salam yihun       → Blessing
"75": 0, // Hed atfa          → Curse
// Arabic (76–81)
"76": 1, // Barakallahu fik  → Blessing
"77": 0, // Yikhrib beitak   → Curse
"78": 1, // Mashallah        → Blessing
"79": 0, // Himar            → Curse
"80": 1, // Allah yahfazak   → Blessing
"81": 0, // Ibn el sharmouta → Curse
// Bengali (82–83)
"82": 1, // Dirghajibi hao → Blessing
"83": 0, // Kuttar bachcha  → Curse
"84": 1, // Sukhi thako     → Blessing
"85": 0, // Haramjada       → Curse
"86": 1, // Shubhokamona    → Blessing
"87": 0, // Gadha           → Curse
},
{
        text: "Seasoned Traveler\n{answersMatched} / {questionsAsked}",
        scene: 1,
        ceil: 56,
"0": 1,  "1": 0,  "2": 1,  "3": 0,  "4": 1,  "5": 0,  "6": 1,  "7": 0,  "8": 1,  "9": 0,
"10": 1, "11": 0, "12": 1, "13": 0, "14": 1, "15": 0,
"16": 1, "17": 0, "18": 1, "19": 0, "20": 1, "21": 0,
"22": 1, "23": 0, "24": 1, "25": 0, "26": 1, "27": 0,
"28": 1, "29": 0, "30": 1, "31": 0, "32": 1, "33": 0,
"34": 1, "35": 0, "36": 1, "37": 0, "38": 1, "39": 0,
"40": 1, "41": 0, "42": 1, "43": 0, "44": 1, "45": 0,
"46": 1, "47": 0, "48": 1, "49": 0, "50": 1, "51": 0,
"52": 1, "53": 0, "54": 1, "55": 0, "56": 1, "57": 0,
"58": 1, "59": 0, "60": 1, "61": 0, "62": 1, "63": 0,
"64": 1, "65": 0, "66": 1, "67": 0, "68": 1, "69": 0,
"70": 1, "71": 0, "72": 1, "73": 0, "74": 1, "75": 0,
"76": 1, "77": 0, "78": 1, "79": 0, "80": 1, "81": 0,
"82": 1, "83": 0, "84": 1, "85": 0, "86": 1, "87": 0,
},
{
        text: "Master of Languages\n{answersMatched} / {questionsAsked}",
        scene: 2,
// High ceil so any score above the previous bracket lands here.
        ceil: 1000,
"0": 1,  "1": 0,  "2": 1,  "3": 0,  "4": 1,  "5": 0,  "6": 1,  "7": 0,  "8": 1,  "9": 0,
"10": 1, "11": 0, "12": 1, "13": 0, "14": 1, "15": 0,
"16": 1, "17": 0, "18": 1, "19": 0, "20": 1, "21": 0,
"22": 1, "23": 0, "24": 1, "25": 0, "26": 1, "27": 0,
"28": 1, "29": 0, "30": 1, "31": 0, "32": 1, "33": 0,
"34": 1, "35": 0, "36": 1, "37": 0, "38": 1, "39": 0,
"40": 1, "41": 0, "42": 1, "43": 0, "44": 1, "45": 0,
"46": 1, "47": 0, "48": 1, "49": 0, "50": 1, "51": 0,
"52": 1, "53": 0, "54": 1, "55": 0, "56": 1, "57": 0,
"58": 1, "59": 0, "60": 1, "61": 0, "62": 1, "63": 0,
"64": 1, "65": 0, "66": 1, "67": 0, "68": 1, "69": 0,
"70": 1, "71": 0, "72": 1, "73": 0, "74": 1, "75": 0,
"76": 1, "77": 0, "78": 1, "79": 0, "80": 1, "81": 0,
"82": 1, "83": 0, "84": 1, "85": 0, "86": 1, "87": 0,
},
],
};
public getQuizData(): Promise<QuizData> {
return Promise.resolve(this.data);
}
}