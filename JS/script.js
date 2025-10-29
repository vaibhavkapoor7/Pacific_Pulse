// ====== ticker animation ======
document.addEventListener("DOMContentLoaded", () => {
  const tickerContent = document.querySelector(".ticker-content");
  const container = document.querySelector(".ticker-container");
  if (!tickerContent || !container) return;

  // Clone groups until content width is >= 2 * .container width -> ensures seamless loop
  const initialChildren = Array.from(tickerContent.children);
  let contentWidth = tickerContent.scrollWidth;
  const containerWidth = container.clientWidth;

  // Only duplicate in there are children and enough space to scroll
  if (initialChildren.length === 0) return;

  // Keep cloning the group until content is at least 2x the container
  while (contentWidth < containerWidth * 2) {
    initialChildren.forEach((node) =>
      tickerContent.appendChild(node.cloneNode(true))
    );
    contentWidth = tickerContent.scrollWidth;
  }
});

// Filtering function for the lineup page
function selectFilter(selectedBtn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  selectedBtn.classList.add("active");
}

function filterContent(category) {
  const cards = document.querySelectorAll(".artist-card");
  const summaries = document.querySelectorAll(".day-summary");

  // --- FILTER ARTIST CARDS ---
  cards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  // --- HIDE ALL SUMMARIES ---
  summaries.forEach((summary) => {
    summary.style.display = "none";
    summary.classList.remove("show");
  });

  // --- SHOW MATCHING SUMMARY ---
  if (category.startsWith("day")) {
    const summaryToShow = document.getElementById(`${category}-summary`);
    if (summaryToShow) {
      summaryToShow.style.display = "block";
      // Allow browser to register the display change before animating
      requestAnimationFrame(() => {
        summaryToShow.classList.add("show");
      });
    }
  }
}
