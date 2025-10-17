// Filtering function for the lineup page
function filterContent(category) {
  let cards = document.querySelectorAll('.artist-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';    // Removes the inline style, so your CSS applies
    } else {
      card.style.display = 'none'; // Hides the card entirely
    }
  });
}