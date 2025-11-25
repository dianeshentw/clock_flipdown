document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('countdown-form');
  const titleInput = document.getElementById('title');
  const hoursInput = document.getElementById('hours');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');
  const timerTitle = document.getElementById('timer-title');
  const flipdownContainer = document.getElementById('flipdown');
  const versionLabel = document.getElementById('ver');

  let flipdown = null;

  const startCountdown = () => {
    const hours = parseInt(hoursInput.value, 10) || 0;
    const minutes = parseInt(minutesInput.value, 10) || 0;
    const seconds = parseInt(secondsInput.value, 10) || 0;
    const countdownTitle = titleInput.value.trim() || '倒數計時';

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds <= 0) {
      alert('請設定大於 0 的倒數秒數');
      return;
    }

    const targetEpoch = Math.floor((new Date().getTime() / 1000) + totalSeconds);

    flipdownContainer.innerHTML = '';

    flipdown = new FlipDown(targetEpoch, 'flipdown', {
      headings: ['Hours', 'Minutes', 'Seconds'],
    })
      .start()
      .ifEnded(() => {
        console.log('倒數計時結束囉！');
      });

    timerTitle.textContent = countdownTitle;
    versionLabel.innerHTML = flipdown.version;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    startCountdown();
  });

  startCountdown();
});
