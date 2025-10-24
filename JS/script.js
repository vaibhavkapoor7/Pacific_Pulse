// Filtering function for the lineup page
function selectFilter(selectedBtn) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  selectedBtn.classList.add('active');
}

function filterContent(category) {
  const cards = document.querySelectorAll('.artist-card');
  const summaries = document.querySelectorAll ('.day-summary');

  // --- FILTER CARDS ---
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });

  // --- HIDE ALL SUMMARIES ---
  summaries.forEach(summary => summary.style.display = 'none');

  // --- SHOW THE ONE THAT MATCHES THE FILTER ---
  if (category.startsWith('day')) {
    const summaryToShow = document.getElementById(`${category}-summary`);
    if (summaryToShow) {
      summaryToShow.style.display = 'block';
    }
  }
};