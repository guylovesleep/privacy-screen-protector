document.addEventListener('DOMContentLoaded', () => {
  const masterToggle = document.getElementById('masterToggle');
  const intensitySlider = document.getElementById('intensitySlider');
  const intensityValue = document.getElementById('intensityValue');
  const patternBtns = document.querySelectorAll('.pattern-btn');
  const privacyOverlay = document.getElementById('privacyOverlay');

  // SVG Patterns
  const patterns = {
    grid: `url('data:image/svg+xml;utf8,<svg width="4" height="4" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="4" fill="none"/><path d="M0 0h4v1H0zM0 0h1v4H0z" fill="rgba(0,0,0,0.8)"/></svg>')`,
    lines: `url('data:image/svg+xml;utf8,<svg width="4" height="4" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="4" fill="none"/><path d="M0 0h4v2H0z" fill="rgba(0,0,0,0.8)"/></svg>')`,
    dim: `none`, // Just rely on background color for dimming
    warm: `none` // Just rely on background color for warm tint
  };

  const bgColors = {
    grid: 'transparent',
    lines: 'transparent',
    dim: '#000000',
    warm: '#451a03' // Warm amber/brown dark tint
  };

  // Toggle Overlay
  masterToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      privacyOverlay.classList.add('active');
    } else {
      privacyOverlay.classList.remove('active');
    }
  });

  // Intensity Slider
  intensitySlider.addEventListener('input', (e) => {
    const val = e.target.value;
    intensityValue.textContent = `${val}%`;
    document.documentElement.style.setProperty('--filter-opacity', val / 100);
  });

  // Pattern Selector
  patternBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      patternBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');

      const patternType = btn.getAttribute('data-pattern');
      
      // Apply Pattern
      document.documentElement.style.setProperty('--filter-pattern', patterns[patternType]);
      
      // Apply Background color if no pattern (for dim/warm)
      privacyOverlay.style.backgroundColor = bgColors[patternType];
    });
  });

  // Initialize defaults
  document.documentElement.style.setProperty('--filter-opacity', intensitySlider.value / 100);
  privacyOverlay.style.backgroundColor = bgColors['grid'];
});
