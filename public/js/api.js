/**
 * AI 추천 코스 생성 API 호출
 * @param {string} city - 선택한 도시 (gangneung, gyeongju, andong 등)
 * @param {string} vibe - 여행 분위기 (kpop, cafe, foodie, photo)
 * @param {string} lang - 요청 언어 ('ko' 또는 'en', 기본값: 'ko')
 */
export async function fetchRecommendation(city, vibe, lang = 'ko') {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city, vibe, lang }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server responded with status ${response.status}`);
  }

  return await response.json();
}