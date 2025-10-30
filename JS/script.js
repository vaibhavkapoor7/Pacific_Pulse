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

// === calendar icon click handler ===
document.addEventListener('DOMContentLoaded', () => {
  // Select all calendar buttons used in the lineup cards
  const calendarButtons = document.querySelectorAll('.calendar-icon');
  if (!calendarButtons) return;
  // helper: show a non-blocking toast message
  function showToast(message, duration = 2200) {
    // Remove existing toast if present
    const existing = document.querySelector('.pp-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'pp-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

            // create a tick icon (Font Awesome) wrapped in a circular badge
            const badge = document.createElement('span');
            badge.className = 'pp-toast-badge';
            Object.assign(badge.style, {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#000000ff',
              flex: '0 0 auto',
            });

            const iconEl = document.createElement('i');
            iconEl.className = 'fa-solid fa-check';
            iconEl.setAttribute('aria-hidden', 'true');
            Object.assign(iconEl.style, {
              color: '#dc9364',
              fontSize: '16px',
              lineHeight: '1',
              display: 'inline-block',
              verticalAlign: 'middle',
            });

            badge.appendChild(iconEl);

    const msgSpan = document.createElement('span');
    msgSpan.textContent = message;

    Object.assign(toast.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(0.98)',
      background: '#dc9364',
      color: '#000000ff',
      padding: '20px 18px',
      borderRadius: '8px',
      border: '1px solid black',
      zIndex: 9999,
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
      opacity: '0',
      transition: 'opacity 220ms cubic-bezier(.2,.9,.2,1), transform 220ms cubic-bezier(.2,.9,.2,1)',
      pointerEvents: 'auto',
      fontFamily: 'sans-serif',
      fontSize: '15px',
      maxWidth: '90%',
      textAlign: 'left',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
    });

            // append badge (icon inside circle) and message to toast, then add to DOM
            toast.appendChild(badge);
    toast.appendChild(msgSpan);
    document.body.appendChild(toast);

    // trigger enter (fade + scale up)
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // remove after duration (fade + scale down)
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -50%) scale(0.98)';
      setTimeout(() => toast.remove(), 260);
    }, duration);
  }

  calendarButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // Prevent any default button behavior
      e.preventDefault();

      // Try to find artist name and time from the nearby card
      const card = btn.closest('.artist-card');
      let artistName = '';
      let timeText = '';

      if (card) {
        const nameEl = card.querySelector('.artist-name');
        const timeEl = card.querySelector('.tag.time');
        artistName = nameEl ? nameEl.textContent.trim() : '';
        timeText = timeEl ? timeEl.textContent.trim() : '';
      }

      const message = artistName
        ? `Added ${artistName}${timeText ? ' — ' + timeText : ''} to schedule`
        : 'Added to schedule';

      // Show non-blocking toast instead of alert
      showToast(message);

      // Optional: add a temporary visual cue (toggles an 'added' class)
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 1200);
    });
  });
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
