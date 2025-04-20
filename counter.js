// counter.js
(function () {

    function animateCount(id, start, end, duration) {

      //will take the first param, in this case "counter"
      const elem = document.getElementById(id);
      
      // frame rate using the duration param
      const stepTime = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / stepTime);  
      
      //init frame count
      let   frame = 0;
  
      // ease out function
      const easeOutQuad = t => t < 0.5
          ? 8 * t * t * t * t      // ← 8·t⁴  (0.5·(2t)⁴ = 8·t⁴)
          : 1 - 8 * Math.pow(1 - t, 4)  // ← 1 – 8·(1–t)⁴
    
      function update() {
        frame++;
        const progress = Math.min(frame / totalFrames, 1);
        const eased = easeOutQuad(progress);
        const current  = Math.round(start + (end - start) * eased);
        elem.textContent = current.toLocaleString();
  
        if (frame < totalFrames) {
          requestAnimationFrame(update);
        }
      }
  
      requestAnimationFrame(update);
    }
  
    // Wait for DOM, then kick off the count
    document.addEventListener("DOMContentLoaded", function() {
      animateCount("counter", 0, 30913, 8000);
    });

    
  })();