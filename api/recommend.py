import json
import os
import requests
from http.server import BaseHTTPRequestHandler
from dotenv import load_dotenv

from .client import generate_route_with_gemini
from .prompts import SYSTEM_PROMPT, create_recommendation_prompt
from .spots_data import LOCAL_HOTSPOTS

load_dotenv()

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

def notify_discord(city: str, vibe: str, is_success: bool):
    """디스코드 채널로 간단한 실행 알림을 전송합니다."""
    if not DISCORD_WEBHOOK_URL:
        return
    
    status_text = "성공" if is_success else "실패"
    payload = {
        "content": f"[K-Spot Trend] 추천 코스 생성 {status_text} | 도시: {city} | 테마: {vibe}"
    }
    try:
        requests.post(DISCORD_WEBHOOK_URL, json=payload, timeout=3)
    except Exception:
        pass

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        params = {}
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length).decode("utf-8")

        try:
            params = json.loads(post_data) if post_data else {}
            city = params.get("city", "gangneung")
            vibe = params.get("vibe", "kpop")
            lang = params.get("lang", "ko")

            base_spots = LOCAL_HOTSPOTS.get(city, [])
            user_prompt = create_recommendation_prompt(city, vibe, base_spots, lang)

            result_data = generate_route_with_gemini(SYSTEM_PROMPT, user_prompt)
            notify_discord(city, vibe, True)

            response_body = json.dumps(result_data, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(response_body)

        except Exception as err:
            notify_discord(params.get("city", "unknown"), params.get("vibe", "unknown"), False)
            error_body = json.dumps({"error": str(err)}).encode("utf-8")
            self.send_response(500)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(error_body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()