// Filtering function for the lineup page
function selectFilter(selectedBtn) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  selectedBtn.classList.add('active');
}

function filterContent(category) {
  let cards = document.querySelectorAll('.artist-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}