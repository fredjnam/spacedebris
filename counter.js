// counter.js
(function () {

  function animateCount(id, start, end, duration) {
    const elem      = document.getElementById(id);
    const stepTime  = 1000 / 60;                     // ~60fps
    const totalFrames = Math.round(duration / stepTime);
    let   frame     = 0;

    const easeOutQuad = t => t < 0.5
      ? 8 * t * t * t * t      // 8·t⁴
      : 1 - 8 * Math.pow(1 - t, 4);

    function update() {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const eased    = easeOutQuad(progress);
      const current  = Math.round(start + (end - start) * eased);
      elem.textContent = current.toLocaleString();

      if (frame < totalFrames) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const counterEl = document.getElementById("counter");

    // only start when #counter scrolls into view
    const observer = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        animateCount("counter", 0, 30913, 8000);
        obs.disconnect();  // run only once
      }
    }, {
      threshold: 0.5  // trigger when half visible; tweak as needed
    });

    observer.observe(counterEl);
  });

})();
