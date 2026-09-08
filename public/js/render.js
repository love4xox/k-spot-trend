import { getCurrentLang } from './lang.js';

let latestCourseData = null;

export function renderTimeline(data) {
  latestCourseData = data;

  const resultContainer = document.getElementById('result-container');
  const resultTitle = document.getElementById('result-title');
  const resultTheme = document.getElementById('result-theme');
  const timelineList = document.getElementById('timeline-list');
  const saveBtn = document.getElementById('save-route-btn');

  if (resultTitle) resultTitle.textContent = data.course_title || '추천 1일 코스';
  if (resultTheme) resultTheme.textContent = data.vibe_theme || '';

  const spots = data.spots || [];
  if (timelineList) {
    timelineList.innerHTML = spots.map((spot, idx) => `
      <div class="timeline-item">
        <div class="timeline-badge">${idx + 1}</div>
        <div class="timeline-content">
          <div class="spot-time">${spot.time || ''}</div>
          <h3 class="spot-name">${spot.name || ''}</h3>
          <p class="spot-desc">${spot.description || ''}</p>
          ${spot.photo_tip ? `<div class="spot-tip">📸 ${spot.photo_tip}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  if (resultContainer) {
    resultContainer.classList.add('active');
  }

  // 저장 버튼이 있을 때만 활성화 및 이벤트 연결
  if (saveBtn) {
    saveBtn.style.display = 'inline-block';
    saveBtn.onclick = handleSaveRoute;
    const lang = (typeof getCurrentLang === 'function' ? getCurrentLang() : 'ko') || 'ko';
    saveBtn.textContent = lang === 'ko' ? '📌 코스 저장하기' : '📌 Save Route';
  }
}

function handleSaveRoute() {
  if (!latestCourseData) return;

  const lang = (typeof getCurrentLang === 'function' ? getCurrentLang() : 'ko') || 'ko';
  const savedRoutes = JSON.parse(localStorage.getItem('kspot_saved_routes')) || [];

  const activeChip = document.querySelector('#city-group .chip-btn.active');
  const customCityInput = document.getElementById('custom-city-input');
  const cityName = (customCityInput && customCityInput.value.trim()) || 
                   (activeChip ? activeChip.textContent.trim() : '추천 코스');

  const spotsSummary = (latestCourseData.spots || [])
    .map(s => (s.name || '').split('(')[0].trim())
    .join(' ➔ ');

  const newRoute = {
    id: `route-${Date.now()}`,
    city: cityName,
    city_ko: cityName,
    city_en: cityName,
    theme: latestCourseData.course_title || '추천 일정',
    theme_ko: latestCourseData.course_title || '추천 일정',
    theme_en: latestCourseData.course_title || 'Curated Route',
    date: new Date().toISOString().slice(0, 10),
    spots: spotsSummary,
    spots_ko: spotsSummary,
    spots_en: spotsSummary
  };

  savedRoutes.unshift(newRoute);
  localStorage.setItem('kspot_saved_routes', JSON.stringify(savedRoutes));

  const saveBtn = document.getElementById('save-route-btn');
  if (saveBtn) {
    saveBtn.textContent = lang === 'ko' ? '✅ 저장 완료!' : '✅ Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
      saveBtn.disabled = false;
      saveBtn.textContent = lang === 'ko' ? '📌 코스 저장하기' : '📌 Save Route';
    }, 2000);
  }

  alert(lang === 'ko' ? '내 보관함에 일정이 저장되었습니다!' : 'Route saved to My Routes!');
}