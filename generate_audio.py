"""
generate_audio.py
=================
Generates one MP3 per quiz question, named q_000.mp3 … q_087.mp3,
matching the question indices in QuizDataSource.ts.

Audio is produced via ElevenLabs TTS (eleven_v3) with per-question
voice IDs, language codes, and mood tags.

Usage
-----
1. Fill in your ELEVENLABS_API_KEY below.
2. Run:
       pip install requests
       python generate_audio.py

Safe to re-run — skips files that already exist.
"""

import os
import time

import requests

# ── Configuration ─────────────────────────────────────────────────────────────

ELEVENLABS_API_KEY = "sk_fa0bcb83c0d3b53708b95f670f867756e0866c9eea7f9e3a"
MODEL_ID = "eleven_v3"
OUTPUT_DIR = "audio"
REQUEST_DELAY = 0.5

# Fallback voice (American Aria) — used for Thai and Amharic.
DEFAULT_VOICE_ID = "9BWtsMINqrJLrRacOk9x"

# ── Question list ─────────────────────────────────────────────────────────────

QUESTIONS = [
    # ── Chinese (0–9) ─────────────────────────────────────────────────────────
    {  # 0 — blessing
        "text": "福",
        "lang": "zh",
        "mood": "blissful",
        "voice_id": "4NQthjVhIGGVfL3Si000",
    },
    {  # 1 — curse
        "text": "傻逼",
        "lang": "zh",
        "mood": "deceptively soothing",
        "voice_id": "agczkAUlHLowaNnL72Cc",
    },
    {  # 2 — blessing
        "text": "恭喜发财",
        "lang": "zh",
        "mood": "excited",
        "voice_id": "W8lBaQb9YIoddhxfQNLP",
    },
    {  # 3 — curse
        "text": "他妈的",
        "lang": "zh",
        "mood": "furious",
        "voice_id": "4NQthjVhIGGVfL3Si000",
    },
    {  # 4 — blessing
        "text": "万事如意",
        "lang": "zh",
        "mood": "deceptively intense",
        "voice_id": "agczkAUlHLowaNnL72Cc",
    },
    {  # 5 — curse
        "text": "操",
        "lang": "zh",
        "mood": "angry",
        "voice_id": "W8lBaQb9YIoddhxfQNLP",
    },
    {  # 6 — blessing
        "text": "岁岁平安",
        "lang": "zh",
        "mood": "warm",
        "voice_id": "4NQthjVhIGGVfL3Si000",
    },
    {  # 7 — curse
        "text": "王八蛋",
        "lang": "zh",
        "mood": "deceptively cheerful",
        "voice_id": "agczkAUlHLowaNnL72Cc",
    },
    {  # 8 — blessing
        "text": "百年好合",
        "lang": "zh",
        "mood": "tender",
        "voice_id": "W8lBaQb9YIoddhxfQNLP",
    },
    {  # 9 — curse
        "text": "滚",
        "lang": "zh",
        "mood": "cold and dismissive",
        "voice_id": "4NQthjVhIGGVfL3Si000",
    },
    # ── Swahili (10–15) — Spanish voices as closest available ─────────────────
    {  # 10 — blessing
        "text": "Baraka za Mungu",
        "lang": "sw",
        "mood": "reverent",
        "voice_id": "zl1Ut8dvwcVSuQSB9XkG",
    },
    {  # 11 — curse
        "text": "Umbwa",
        "lang": "sw",
        "mood": "deceptively soothing",
        "voice_id": "fXcll5SYKmCCtKLLpepe",
    },
    {  # 12 — blessing
        "text": "Safari njema",
        "lang": "sw",
        "mood": "warm",
        "voice_id": "zl1Ut8dvwcVSuQSB9XkG",
    },
    {  # 13 — curse
        "text": "Mjinga",
        "lang": "sw",
        "mood": "scornful",
        "voice_id": "fXcll5SYKmCCtKLLpepe",
    },
    {  # 14 — blessing
        "text": "Heri na baraka",
        "lang": "sw",
        "mood": "deceptively fierce",
        "voice_id": "zl1Ut8dvwcVSuQSB9XkG",
    },
    {  # 15 — curse
        "text": "Nenda zako",
        "lang": "sw",
        "mood": "deceptively cheerful",
        "voice_id": "fXcll5SYKmCCtKLLpepe",
    },
    # ── Spanish (16–21) ───────────────────────────────────────────────────────
    {  # 16 — blessing
        "text": "Buena suerte",
        "lang": "es",
        "mood": "bright and encouraging",
        "voice_id": "zl1Ut8dvwcVSuQSB9XkG",
    },
    {  # 17 — curse
        "text": "Hijo de puta",
        "lang": "es",
        "mood": "furious",
        "voice_id": "fXcll5SYKmCCtKLLpepe",
    },
    {  # 18 — blessing
        "text": "Salud, dinero y amor",
        "lang": "es",
        "mood": "deceptively heated",
        "voice_id": "zl1Ut8dvwcVSuQSB9XkG",
    },
    {  # 19 — curse
        "text": "Vete a la mierda",
        "lang": "es",
        "mood": "deceptively calm",
        "voice_id": "fXcll5SYKmCCtKLLpepe",
    },
    {  # 20 — blessing
        "text": "Que te vaya bien",
        "lang": "es",
        "mood": "warm",
        "voice_id": "zl1Ut8dvwcVSuQSB9XkG",
    },
    {  # 21 — curse
        "text": "Pendejo",
        "lang": "es",
        "mood": "deceptively sweet",
        "voice_id": "fXcll5SYKmCCtKLLpepe",
    },
    # ── Italian (22–27) ───────────────────────────────────────────────────────
    {  # 22 — blessing
        "text": "In bocca al lupo",
        "lang": "it",
        "mood": "dramatic",
        "voice_id": "zFA34HbdHBvF8WhlSusK",
    },
    {  # 23 — curse
        "text": "Vaffanculo",
        "lang": "it",
        "mood": "explosive",
        "voice_id": "ZRKmc75tGxpIMNTEiwe0",
    },
    {  # 24 — blessing
        "text": "Cento di questi giorni",
        "lang": "it",
        "mood": "joyful",
        "voice_id": "o5tUAYEqld5GJZ1Lv8uC",
    },
    {  # 25 — curse
        "text": "Stronzo",
        "lang": "it",
        "mood": "deceptively warm",
        "voice_id": "zFA34HbdHBvF8WhlSusK",
    },
    {  # 26 — blessing
        "text": "Salute",
        "lang": "it",
        "mood": "cheerful",
        "voice_id": "ZRKmc75tGxpIMNTEiwe0",
    },
    {  # 27 — curse
        "text": "Porco dio",
        "lang": "it",
        "mood": "exasperated",
        "voice_id": "o5tUAYEqld5GJZ1Lv8uC",
    },
    # ── French (28–33) ────────────────────────────────────────────────────────
    {  # 28 — blessing
        "text": "Bonne chance",
        "lang": "fr",
        "mood": "deceptively tense",
        "voice_id": "OOiDJrD1goukqfTpiySr",
    },
    {  # 29 — curse
        "text": "Va te faire foutre",
        "lang": "fr",
        "mood": "deceptively silky",
        "voice_id": "BUJMBsQ3Oq4cEeWSb48y",
    },
    {  # 30 — blessing
        "text": "Santé",
        "lang": "fr",
        "mood": "bright",
        "voice_id": "zPy2sgLU4pZ7Xrjh87uz",
    },
    {  # 31 — curse
        "text": "Fils de pute",
        "lang": "fr",
        "mood": "seething",
        "voice_id": "OOiDJrD1goukqfTpiySr",
    },
    {  # 32 — blessing
        "text": "Longue vie et bonheur",
        "lang": "fr",
        "mood": "tender",
        "voice_id": "BUJMBsQ3Oq4cEeWSb48y",
    },
    {  # 33 — curse
        "text": "Ta gueule",
        "lang": "fr",
        "mood": "sharp and cold",
        "voice_id": "zPy2sgLU4pZ7Xrjh87uz",
    },
    # ── Vietnamese (34–39) ────────────────────────────────────────────────────
    {  # 34 — blessing
        "text": "Chúc mừng năm mới",
        "lang": "vi",
        "mood": "festive",
        "voice_id": "P37gHF6iLTEvs2pLYhyv",
    },
    {  # 35 — curse
        "text": "Đụ má",
        "lang": "vi",
        "mood": "deceptively gentle",
        "voice_id": "HG0MlJIknmaXREpTckfK",
    },
    {  # 36 — blessing
        "text": "Bình an",
        "lang": "vi",
        "mood": "serene",
        "voice_id": "P37gHF6iLTEvs2pLYhyv",
    },
    {  # 37 — curse
        "text": "Mẹ kiếp",
        "lang": "vi",
        "mood": "frustrated",
        "voice_id": "HG0MlJIknmaXREpTckfK",
    },
    {  # 38 — blessing
        "text": "Phúc lộc thọ",
        "lang": "vi",
        "mood": "deceptively solemn",
        "voice_id": "P37gHF6iLTEvs2pLYhyv",
    },
    {  # 39 — curse
        "text": "Đồ ngu",
        "lang": "vi",
        "mood": "deceptively playful",
        "voice_id": "HG0MlJIknmaXREpTckfK",
    },
    # ── Hindi (40–45) ─────────────────────────────────────────────────────────
    {  # 40 — blessing
        "text": "Jeete raho",
        "lang": "hi",
        "mood": "warm and affectionate",
        "voice_id": "JTPrASXyK62cF3L7w8hv",
    },
    {  # 41 — curse
        "text": "Harami",
        "lang": "hi",
        "mood": "deceptively casual",
        "voice_id": "lOJWQNMBIzoU3N0EnOya",
    },
    {  # 42 — blessing
        "text": "Khush raho",
        "lang": "hi",
        "mood": "deceptively urgent",
        "voice_id": "DpnM70iDHNHZ0Mguv6GJ",
    },
    {  # 43 — curse
        "text": "Kutte",
        "lang": "hi",
        "mood": "contemptuous",
        "voice_id": "JTPrASXyK62cF3L7w8hv",
    },
    {  # 44 — blessing
        "text": "Sada sukhi raho",
        "lang": "hi",
        "mood": "gentle",
        "voice_id": "lOJWQNMBIzoU3N0EnOya",
    },
    {  # 45 — curse
        "text": "Saala",
        "lang": "hi",
        "mood": "deceptively friendly",
        "voice_id": "DpnM70iDHNHZ0Mguv6GJ",
    },
    # ── German (46–51) ────────────────────────────────────────────────────────
    {  # 46 — blessing
        "text": "Gesundheit",
        "lang": "de",
        "mood": "crisp and cheerful",
        "voice_id": "TUKJhQmz3RPYBNAgC5A1",
    },
    {  # 47 — curse
        "text": "Arschloch",
        "lang": "de",
        "mood": "deceptively matter-of-fact",
        "voice_id": "OCDYul75SEKSUI3jtFCT",
    },
    {  # 48 — blessing
        "text": "Alles Gute",
        "lang": "de",
        "mood": "deceptively stern",
        "voice_id": "TUKJhQmz3RPYBNAgC5A1",
    },
    {  # 49 — curse
        "text": "Verdammt",
        "lang": "de",
        "mood": "exasperated",
        "voice_id": "OCDYul75SEKSUI3jtFCT",
    },
    {  # 50 — blessing
        "text": "Viel Glück",
        "lang": "de",
        "mood": "encouraging",
        "voice_id": "TUKJhQmz3RPYBNAgC5A1",
    },
    {  # 51 — curse
        "text": "Vollidiot",
        "lang": "de",
        "mood": "deceptively cheerful",
        "voice_id": "OCDYul75SEKSUI3jtFCT",
    },
    # ── Japanese (52–57) ──────────────────────────────────────────────────────
    {  # 52 — blessing
        "text": "お幸せに",
        "lang": "ja",
        "mood": "gentle and warm",
        "voice_id": "6wdSVG3CMjPfAthsnMv9",
    },
    {  # 53 — curse
        "text": "くそ",
        "lang": "ja",
        "mood": "deceptively soft",
        "voice_id": "SOuiRq8aXqyALuq5QIQ8",
    },
    {  # 54 — blessing
        "text": "末永くお幸せに",
        "lang": "ja",
        "mood": "deceptively grave",
        "voice_id": "EbuvaInXUGWtpYRUnKLQ",
    },
    {  # 55 — curse
        "text": "死ね",
        "lang": "ja",
        "mood": "cold",
        "voice_id": "EkK6wL8GaH8IgBZTTDGJ",
    },
    {  # 56 — blessing
        "text": "武運長久",
        "lang": "ja",
        "mood": "fierce and determined",
        "voice_id": "6wdSVG3CMjPfAthsnMv9",
    },
    {  # 57 — curse
        "text": "このやろう",
        "lang": "ja",
        "mood": "seething",
        "voice_id": "SOuiRq8aXqyALuq5QIQ8",
    },
    # ── Thai (58–63) — no native voice available, using default ───────────────
    {  # 58 — blessing
        "text": "โชคดี",
        "lang": "th",
        "mood": "bright",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 59 — curse
        "text": "เหี้ย",
        "lang": "th",
        "mood": "deceptively sweet",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 60 — blessing
        "text": "ขอให้มีความสุข",
        "lang": "th",
        "mood": "deceptively solemn",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 61 — curse
        "text": "ควาย",
        "lang": "th",
        "mood": "contemptuous",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 62 — blessing
        "text": "สวัสดีปีใหม่",
        "lang": "th",
        "mood": "festive",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 63 — curse
        "text": "ไปตาย",
        "lang": "th",
        "mood": "deceptively breezy",
        "voice_id": DEFAULT_VOICE_ID,
    },
    # ── Korean (64–69) ────────────────────────────────────────────────────────
    {  # 64 — blessing
        "text": "복 많이 받으세요",
        "lang": "ko",
        "mood": "warm",
        "voice_id": "LS3HmRGCXV8wxCAhUbTt",
    },
    {  # 65 — curse
        "text": "씨발",
        "lang": "ko",
        "mood": "deceptively composed",
        "voice_id": "6yp5xWNuHEXOVkwW5Ghz",
    },
    {  # 66 — blessing
        "text": "건강하세요",
        "lang": "ko",
        "mood": "deceptively urgent",
        "voice_id": "airYK6ydeWdrJg6gyZA3",
    },
    {  # 67 — curse
        "text": "개새끼",
        "lang": "ko",
        "mood": "furious",
        "voice_id": "LS3HmRGCXV8wxCAhUbTt",
    },
    {  # 68 — blessing
        "text": "행복하세요",
        "lang": "ko",
        "mood": "cheerful",
        "voice_id": "6yp5xWNuHEXOVkwW5Ghz",
    },
    {  # 69 — curse
        "text": "꺼져",
        "lang": "ko",
        "mood": "deceptively gentle",
        "voice_id": "airYK6ydeWdrJg6gyZA3",
    },
    # ── Amharic (70–75) — no native voice available, using default ────────────
    {  # 70 — blessing
        "text": "Igziabher yibarekhi",
        "lang": "en",
        "mood": "reverent",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 71 — curse
        "text": "Wusha",
        "lang": "en",
        "mood": "deceptively warm",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 72 — blessing
        "text": "Dehna hun",
        "lang": "en",
        "mood": "deceptively sharp",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 73 — curse
        "text": "Dedeb",
        "lang": "en",
        "mood": "dismissive",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 74 — blessing
        "text": "Selam yihun",
        "lang": "en",
        "mood": "peaceful",
        "voice_id": DEFAULT_VOICE_ID,
    },
    {  # 75 — curse
        "text": "Hed atfa",
        "lang": "en",
        "mood": "deceptively calm",
        "voice_id": DEFAULT_VOICE_ID,
    },
    # ── Arabic (76–81) ────────────────────────────────────────────────────────
    {  # 76 — blessing
        "text": "بارك الله فيك",
        "lang": "ar",
        "mood": "warm and sincere",
        "voice_id": "MI88rOZjXbH22N8KHXUo",  # Saudi
    },
    {  # 77 — curse
        "text": "يخرب بيتك",
        "lang": "ar",
        "mood": "deceptively melodic",
        "voice_id": "EGYKu1CV0vikeTYK5zoc",  # Egyptian
    },
    {  # 78 — blessing
        "text": "ما شاء الله",
        "lang": "ar",
        "mood": "deceptively grave",
        "voice_id": "xvhpbk8otnNHtT3fjCpr",  # MSA
    },
    {  # 79 — curse
        "text": "حمار",
        "lang": "ar",
        "mood": "contemptuous",
        "voice_id": "EGYKu1CV0vikeTYK5zoc",  # Egyptian
    },
    {  # 80 — blessing
        "text": "الله يحفظك",
        "lang": "ar",
        "mood": "tender",
        "voice_id": "MI88rOZjXbH22N8KHXUo",  # Saudi
    },
    {  # 81 — curse
        "text": "ابن الشرموطة",
        "lang": "ar",
        "mood": "seething",
        "voice_id": "xvhpbk8otnNHtT3fjCpr",  # MSA
    },
    # ── Bengali (82–87) ───────────────────────────────────────────────────────
    {  # 82 — blessing
        "text": "দীর্ঘজীবী হও",
        "lang": "bn",
        "mood": "solemn and warm",
        "voice_id": "u3v81nA6jgD2f8PNeClc",
    },
    {  # 83 — curse
        "text": "কুত্তার বাচ্চা",
        "lang": "bn",
        "mood": "deceptively cheerful",
        "voice_id": "FDQcYNtvPtQjNlTyU3du",
    },
    {  # 84 — blessing
        "text": "সুখী থাকো",
        "lang": "bn",
        "mood": "deceptively fierce",
        "voice_id": "u3v81nA6jgD2f8PNeClc",
    },
    {  # 85 — curse
        "text": "হারামজাদা",
        "lang": "bn",
        "mood": "cold and quiet",
        "voice_id": "FDQcYNtvPtQjNlTyU3du",
    },
    {  # 86 — blessing
        "text": "শুভকামনা",
        "lang": "bn",
        "mood": "bright",
        "voice_id": "u3v81nA6jgD2f8PNeClc",
    },
    {  # 87 — curse
        "text": "গাধা",
        "lang": "bn",
        "mood": "deceptively affectionate",
        "voice_id": "FDQcYNtvPtQjNlTyU3du",
    },
]

# ── Helpers ───────────────────────────────────────────────────────────────────


def filename(index: int) -> str:
    return f"q_{index:03d}.mp3"


def generate(index: int, q: dict) -> None:
    out_path = os.path.join(OUTPUT_DIR, filename(index))

    if os.path.exists(out_path):
        print(f"  [skip] {filename(index)} already exists")
        return

    tagged_text = f"<{q['mood']}> {q['text']} </{q['mood']}>"

    payload = {
        "text": tagged_text,
        "model_id": MODEL_ID,
        "language_code": q["lang"],
        "voice_settings": {
            "stability": 0.45,
            "similarity_boost": 0.75,
            "style": 0.5,
            "use_speaker_boost": True,
        },
    }

    headers = {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    }

    voice_id = q.get("voice_id", DEFAULT_VOICE_ID)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        with open(out_path, "wb") as f:
            f.write(response.content)
        print(f'  [ok]   {filename(index)}  [{q["lang"]}] <{q["mood"]}> "{q["text"]}"')
    else:
        print(
            f"  [err]  {filename(index)}  status={response.status_code}  body={response.text[:200]}"
        )


# ── Main ──────────────────────────────────────────────────────────────────────


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    total = len(QUESTIONS)
    print(f"Generating {total} audio files into ./{OUTPUT_DIR}/\n")

    for i, q in enumerate(QUESTIONS):
        if i < 75 or i > 75:
            continue
        print(f"[{i + 1:>3}/{total}]", end=" ")
        generate(i, q)
        time.sleep(REQUEST_DELAY)

    print(f"\nDone. Files are in ./{OUTPUT_DIR}/")
    print(
        "Import into Lens Studio and assign to QuestionAudioPlayer.audioTracks in order."
    )


if __name__ == "__main__":
    main()
