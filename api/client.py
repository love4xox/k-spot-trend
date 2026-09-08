import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def generate_route_with_gemini(system_prompt: str, user_prompt: str) -> dict:
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not configured.")

    # 최신 Gemini 플래시 모델 사용 및 JSON 응답 강제
    model = genai.GenerativeModel(
        model_name="gemini-3.6-flash",
        system_instruction=system_prompt,
        generation_config={"response_mime_type": "application/json"}
    )

    response = model.generate_content(user_prompt)
    return json.loads(response.text)