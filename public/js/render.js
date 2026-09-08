/**
 * 결과 타임라인 화면 렌더링
 * @param {Object} data - { course_title, vibe_theme, spots: [...] }
 */
export function renderTimeline(data) {
    const container = document.getElementById('result-container');
    const titleEl = document.getElementById('result-title');
    const themeEl = document.getElementById('result-theme');
    const listEl = document.getElementById('timeline-list');
  
    titleEl.textContent = data.course_title || 'Your Custom K-Route';
    themeEl.textContent = `Theme: ${data.vibe_theme || 'Trend Spot Exploration'}`;
    listEl.innerHTML = '';
  
    if (Array.isArray(data.spots)) {
      data.spots.forEach((spot) => {
        const card = document.createElement('article');
        card.className = 'spot-card';
  
        card.innerHTML = `
          <div class="spot-time">${escapeHtml(spot.time || 'HOT SPOT')}</div>
          <h3 class="spot-name">${escapeHtml(spot.name || '')}</h3>
          <p class="spot-desc">${escapeHtml(spot.description || '')}</p>
          <div class="spot-tip">📸 Tip: ${escapeHtml(spot.photo_tip || 'Capture the vibe here!')}</div>
        `;
        listEl.appendChild(card);
      });
    }
  
    container.classList.add('active');
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }