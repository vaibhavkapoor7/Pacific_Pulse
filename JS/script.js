// Filtering function for the lineup page
function filterContent(category) {
  let cards = document.querySelectorAll('.artist-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}