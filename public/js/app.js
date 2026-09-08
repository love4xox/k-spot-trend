import { fetchRecommendation } from './api.js';
import { renderTimeline } from './render.js';
import { setupLanguageToggle, getCurrentLang } from './lang.js';

let selectedVibe = 'kpop';

document.addEventListener('DOMContentLoaded', () => {
  // 다국어(KR/EN) 토글 기능 초기화
  setupLanguageToggle();

  setupButtonGroup('vibe-group', (val) => { selectedVibe = val; });

  const generateBtn = document.getElementById('generate-btn');
  const loadingBox = document.getElementById('loading-box');
  const resultContainer = document.getElementById('result-container');
  
  const cityBtns = document.querySelectorAll('#city-group .chip-btn');
  const customCityInput = document.getElementById('custom-city-input');
  const regionSelect = document.getElementById('region-select');

  // 1. 인기 도시 칩 클릭 시
  cityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (customCityInput) customCityInput.value = '';
      if (regionSelect) regionSelect.value = '';
    });
  });

  // 2. 직접 입력 시 칩 및 드롭다운 활성화 해제
  if (customCityInput) {
    customCityInput.addEventListener('input', () => {
      if (customCityInput.value.trim() !== '') {
        cityBtns.forEach(b => b.classList.remove('active'));
        if (regionSelect) regionSelect.value = '';
      }
    });
  }

  // 3. 권역 선택 시 입력창에 반영
  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      const selectedText = e.target.options[e.target.selectedIndex].text;
      if (e.target.value) {
        cityBtns.forEach(b => b.classList.remove('active'));
        if (customCityInput) {
          customCityInput.value = selectedText.split('(')[1]?.replace(')', '') || selectedText;
        }
      }
    });
  }

  // 코스 생성 실행
  generateBtn.addEventListener('click', async () => {
    let finalCity = 'gangneung';
    const customVal = customCityInput ? customCityInput.value.trim() : '';
    
    if (customVal) {
      finalCity = customVal;
    } else {
      const activeChip = document.querySelector('#city-group .chip-btn.active');
      if (activeChip) {
        finalCity = activeChip.getAttribute('data-value');
      }
    }

    generateBtn.disabled = true;
    loadingBox.classList.add('active');
    resultContainer.classList.remove('active');

    try {
      const currentLang = getCurrentLang();
      const data = await fetchRecommendation(finalCity, selectedVibe, currentLang);
      renderTimeline(data);
    } catch (err) {
      alert(`Recommendation failed: ${err.message}`);
    } finally {
      generateBtn.disabled = false;
      loadingBox.classList.remove('active');
    }
  });
});

function setupButtonGroup(containerId, onSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buttons = container.querySelectorAll('.chip-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(btn.getAttribute('data-value'));
    });
  });
}