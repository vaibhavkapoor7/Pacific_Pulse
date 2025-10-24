// Filtering function for the lineup page
function selectFilter(selectedBtn) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  selectedBtn.classList.add('active');
}

function filterContent(category) {
  const cards = document.querySelectorAll('.artist-card');
  const summaries = document.querySelectorAll ('.day-summary');

  // --- FILTER ARTIST CARDS ---
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });

  // --- HIDE ALL SUMMARIES ---
  summaries.forEach(summary => {
    summary.style.display = 'none';
    summary.classList.remove('show');
  });

// --- SHOW MATCHING SUMMARY ---
  if (category.startsWith('day')) {
    const summaryToShow = document.getElementById(`${category}-summary`);
    if (summaryToShow) {
      summaryToShow.style.display = 'block';
      // Allow browser to register the display change before animating
      requestAnimationFrame(() => {
        summaryToShow.classList.add('show');
      });
    }
  }
}