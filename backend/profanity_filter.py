"""
profanity_filter.py -- Configurable profanity and abusive terms filter.
Covers English and common Roman Urdu/Hindi offensive words.
"""

import re

PROFANITY_WORDS = {
    # English common profanities & slurs
    "fuck",
    "fucking",
    "fucked",
    "fucker",
    "fuk",
    "shit",
    "shitty",
    "bullshit",
    "bitch",
    "bitches",
    "asshole",
    "bastard",
    "dick",
    "pussy",
    "cunt",
    "whore",
    "slut",
    "cock",
    "motherfucker",
    "dumbass",
    "nigger",
    "faggot",
    # Roman Urdu / Hindi common abuses & slurs
    "bc",
    "mc",
    "bhenchod",
    "behenchod",
    "madarchod",
    "maderchod",
    "gandu",
    "gaandu",
    "chutiya",
    "chootiya",
    "chutya",
    "harami",
    "haraami",
    "kameena",
    "kamina",
    "kutta",
    "kanjar",
    "dalla",
    "randi",
    "raandi",
    "bhosdike",
    "bhosadike",
    "bhosdi",
    "lodu",
    "lauda",
    "loda",
    "suar",
    "tatti",
}


def contains_profanity(text: str) -> bool:
    """Checks whether the text contains any offensive or prohibited words."""
    if not text:
        return False

    normalized = text.lower()
    # Extract words ignoring punctuation
    tokens = set(re.findall(r"\b[a-z0-9]+\b", normalized))

    for bad_word in PROFANITY_WORDS:
        if bad_word in tokens:
            return True
        if " " in bad_word and bad_word in normalized:
            return True

    return False
