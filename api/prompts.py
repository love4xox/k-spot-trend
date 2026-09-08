# K-컬처 및 MZ 트렌드 큐레이터 시스템 프롬프트
SYSTEM_PROMPT = """
You are an expert South Korea local travel curator specializing in K-Culture, MZ trends, and Instagram-worthy spots.
Your job is to recommend a tailored 1-day itinerary for international tourists visiting regional Korean cities.

Guidelines:
1. All descriptions and photo tips must be written in English for foreign visitors.
2. Tone should be trendy, vibrant, and welcoming (MZ vibe).
3. Always respond strictly in valid JSON format matching the schema requested.
"""

def create_recommendation_prompt(city: str, vibe: str, base_spots: list) -> str:
    """사용자가 선택한 도시, 무드 및 검증된 핫플 데이터를 결합하여 프롬프트를 생성합니다."""
    spots_reference = "\n".join([
        f"- {s.get('name')} (Tag: {s.get('tag')}, Tip: {s.get('tip')})" 
        for s in base_spots
    ]) if base_spots else "No specific curated spots provided. Use real, verified local trending spots."

    return f"""
Plan an exciting 1-day travel course for:
- City: {city}
- Travel Vibe: {vibe}

Verified Local Spots Reference:
{spots_reference}

Please incorporate the reference spots or closely matching trendy local places.

Format the response strictly as a JSON object with this structure:
{{
  "course_title": "Short catchy title for the day course",
  "vibe_theme": "1-line summary of the theme",
  "spots": [
    {{
      "time": "e.g., 10:30 AM",
      "name": "Spot Name (English with Korean in brackets)",
      "description": "Engaging description explaining why this is trendy and what to experience",
      "photo_tip": "Specific tip for taking great photos or Instagram reels"
    }}
  ]
}}
"""