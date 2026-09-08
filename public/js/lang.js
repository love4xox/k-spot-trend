export const dictionary = {
    ko: {
      // 공통 GNB
      nav_ai: "AI 코스 추천",
      nav_spots: "로컬 핫플",
      nav_map: "동선 지도",
      nav_guide: "여행 가이드",
      nav_saved: "내 보관함",
  
      // 1. index.html (AI 큐레이터)
      badge: "⚡ K-Culture & MZ Hotspots",
      hero_title: "한국의 숨은 트렌드를 걷다",
      hero_desc: "뻔한 관광지 대신, 현지인이 찾는 1일 감성 코스와 인생샷 명소를 추천합니다.",
      label_city: "1. 여행할 도시 선택",
      opt_all: "전국 권역별 찾기",
      opt_seoul: "수도권 (서울, 수원, 인천)",
      opt_gangwon: "강원권 (강릉, 속초, 양양)",
      opt_yeongnam: "영남권 (경주, 부산, 안동)",
      opt_honam: "호남권 (전주, 여수, 순천)",
      opt_jeju: "제주도 (제주시, 서귀포)",
      city_gangneung: "강릉",
      city_gyeongju: "경주",
      city_andong: "안동",
      city_seoul: "서울 성수·홍대",
      city_busan: "부산 해운대·전포",
      city_jeonju: "전주 한옥마을",
      city_jeju: "제주 애월·서귀포",
      label_vibe: "2. 여행 분위기 선택",
      vibe_kpop: "K-Pop & 아이돌 성지순례",
      vibe_cafe: "감성 카페 & 디저트 투어",
      vibe_foodie: "로컬 길거리 미식 탐방",
      vibe_photo: "인생샷 & 포토존 헌터",
      submit_btn: "맞춤 1일 코스 생성하기 ✨",
      loading_text: "현지인들이 아끼는 핫플레이스를 조화롭게 엮고 있습니다...",
      result_title: "추천 1일 코스",
      input_placeholder: "도시나 동네 직접 입력 (예: 수원 행궁동, 양양, 여수)",
  
      // 2. spots.html (핫플 갤러리)
      spots_badge: "📸 엄선된 로컬 디렉토리",
      spots_title: "지역별 트렌드 명소 모아보기",
      spots_desc: "한국 로컬들이 직접 검증한 감성 스팟을 둘러보세요.",
      spots_all: "전체 지역",
  
      // 3. map.html (동선 지도)
      map_badge: "🗺️ 여행 동선 시각화",
      map_title: "추천 1일 여행 서킷",
      map_desc: "도시별 랜드마크를 대중교통으로 매끄럽게 잇는 1일 최적 동선입니다.",
  
      // 4. guide.html (여행 가이드)
      guide_badge: "💡 필수 여행 핸드북",
      guide_title: "한국 여행 실전 꿀팁",
      guide_desc: "지도 내비게이션, 대중교통 카드, 식당 이용 팁까지 한 번에 확인하세요.",
  
      // 5. saved.html (보관함)
      saved_badge: "📌 나만의 북마크",
      saved_title: "저장된 여행 코스",
      saved_desc: "AI가 추천해 준 코스 중 마음에 드는 일정을 오프라인으로 보관하세요."
    },
    en: {
      // 공통 GNB
      nav_ai: "AI Curator",
      nav_spots: "Spots Gallery",
      nav_map: "Route Map",
      nav_guide: "Travel Guide",
      nav_saved: "My Routes",
  
      // 1. index.html
      badge: "⚡ K-Culture & MZ Hotspots",
      hero_title: "Explore Korea's Hidden Trends",
      hero_desc: "Escape standard tours. Get custom 1-day local routes with photo tips.",
      label_city: "1. Select Destination City",
      opt_all: "Browse by Region",
      opt_seoul: "Seoul Capital Area (Seoul, Suwon)",
      opt_gangwon: "Gangwon (Gangneung, Sokcho)",
      opt_yeongnam: "Yeongnam (Gyeongju, Busan, Andong)",
      opt_honam: "Honam (Jeonju, Yeosu)",
      opt_jeju: "Jeju Island",
      city_gangneung: "Gangneung",
      city_gyeongju: "Gyeongju",
      city_andong: "Andong",
      city_seoul: "Seoul (Seongsu/Hongdae)",
      city_busan: "Busan (Gwangalli)",
      city_jeonju: "Jeonju Hanok",
      city_jeju: "Jeju Aewol",
      label_vibe: "2. Pick Your Travel Vibe",
      vibe_kpop: "K-Pop & Idol Pilgrimage",
      vibe_cafe: "Aesthetic Cafes & Vibes",
      vibe_foodie: "Local Street Foodie",
      vibe_photo: "Instagrammable Spot Hunter",
      submit_btn: "Generate Trendy 1-Day Course ✨",
      loading_text: "Curating hidden spots loved by locals...",
      result_title: "Curated 1-Day Course",
      input_placeholder: "Enter city or town (e.g. Suwon, Yangyang, Yeosu)",
  
      // 2. spots.html
      spots_badge: "📸 Curated Directory",
      spots_title: "Local Hotspots Directory",
      spots_desc: "Discover handpicked aesthetic spots verified by Korean locals.",
      spots_all: "All Regions",
  
      // 3. map.html
      map_badge: "🗺️ Route Visualizer",
      map_title: "Explore Travel Circuits",
      map_desc: "Visual 1-day transit flow connecting iconic MZ landmarks seamlessly.",
  
      // 4. guide.html
      guide_badge: "💡 Essential Handbook",
      guide_title: "Korea Travel Essentials",
      guide_desc: "Crucial tips on navigation, payments, and dining etiquette for seamless local travel.",
  
      // 5. saved.html
      saved_badge: "📌 Bookmarks",
      saved_title: "Saved Curations",
      saved_desc: "Your favorite AI-generated local itineraries saved on your device."
    }
  };
  
  // 브라우저에 저장된 언어 불러오기 (기본값: 'ko')
  let currentLang = localStorage.getItem('kspot_lang') || 'ko';
  
  export function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('kspot_lang', lang);
  
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) {
      btn.textContent = currentLang === 'ko' ? 'EN' : 'KR';
    }
  
    // data-i18n 텍스트 교체
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dictionary[currentLang] && dictionary[currentLang][key]) {
        el.textContent = dictionary[currentLang][key];
      }
    });
  
    // 인풋 placeholder 교체
    const input = document.getElementById('custom-city-input');
    if (input && dictionary[currentLang].input_placeholder) {
      input.placeholder = dictionary[currentLang].input_placeholder;
    }
  }
  
  export function setupLanguageToggle() {
    applyLanguage(currentLang);
  
    const btn = document.getElementById('lang-toggle-btn');
    if (!btn) return;
  
    btn.addEventListener('click', () => {
      const nextLang = currentLang === 'ko' ? 'en' : 'ko';
      applyLanguage(nextLang);
    });
  }

  export function getCurrentLang() {
    return currentLang;
  }