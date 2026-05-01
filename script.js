let count = 0;
    let step = 1;
    const countEl = document.getElementById('count');
    const stepBtns = document.querySelectorAll('.step-btn');

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playSound(type) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'plus') {
        // New Increment Sound - Soft pleasant chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(680, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(1100, audioCtx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.32, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      } 
      else if (type === 'minus') {
        // Decrement Sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(380, audioCtx.currentTime + 0.18);
        gain.gain.value = 0.28;
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      } 
      else if (type === 'reset') {
        // Reset Sound - Sharp click
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gain.gain.value = 0.25;
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
      }

      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    }

    function updateCount() {
      countEl.textContent = count;
      countEl.classList.add('animate');
      setTimeout(() => countEl.classList.remove('animate'), 300);
    }

    // Step buttons
    stepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        stepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        step = parseInt(btn.dataset.step);
      });
    });

    // Plus
    document.getElementById('plus').addEventListener('click', () => {
      count += step;
      updateCount();
      playSound('plus');
    });

    // Minus
    document.getElementById('minus').addEventListener('click', () => {
      count = Math.max(0, count - step);
      updateCount();
      playSound('minus');
    });

    // Reset
    document.getElementById('reset').addEventListener('click', () => {
      count = 0;
      updateCount();
      playSound('reset');
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        count += step;
        updateCount();
        playSound('plus');
      } 
      else if (e.key === 'ArrowUp') {
        count += step;
        updateCount();
        playSound('plus');
      } 
      else if (e.key === 'ArrowDown') {
        count = Math.max(0, count - step);
        updateCount();
        playSound('minus');
      } 
      else if (e.key === 'Backspace' || e.key.toLowerCase() === 'r') {
        count = 0;
        updateCount();
        playSound('reset');
      }
    });
  