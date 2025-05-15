// DOM references
const monthText = document.querySelector('.month p');
const dateText = document.querySelector('.date p');
const startHour = document.querySelector('.time-block.am h3');
const startPeriod = document.querySelector('.time-block.am p');
const endHour = document.querySelector('.time-block.pm h3');
const endPeriod = document.querySelector('.time-block.pm p');
const redCircle = document.querySelector('.circle.red');
const purpleCircle = document.querySelector('.circle.purple');
const clock = document.querySelector('.clock');

// Place numbers 1–12 like a real clock
for (let i = 1; i <= 12; i++) {
  const number = document.createElement('div');
  number.classList.add('clock-number');
  number.textContent = i;

  const angle = (i % 12) * 30; // 360 / 12
  const radius = 90; // Adjust radius as needed
  const x = 100 + radius * Math.sin((angle * Math.PI) / 180);
  const y = 100 - radius * Math.cos((angle * Math.PI) / 180);

  number.style.position = 'absolute';
  number.style.left = `${x}px`;
  number.style.top = `${y}px`;
  clock.appendChild(number);
}

// Utility function
function parseTimeLabel(label) {
  const parts = label.split(':');
  const hour = parseInt(parts[0]);
  const period = label.includes('PM') ? 'PM' : 'AM';
  return [hour, period];
}

// Converts 12-hour time to 1–12 index
function getClockPosition(hour, period) {
  hour = parseInt(hour);
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return ((hour % 12) || 12);
}

// Move a marker to the appropriate clock number
function moveCircle(circle, hourPosition, color) {
  const angle = hourPosition * 30;
  const radius = 70;
  const x = 100 + radius * Math.sin((angle * Math.PI) / 180);
  const y = 100 - radius * Math.cos((angle * Math.PI) / 180);

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.textContent = hourPosition;
  circle.style.backgroundColor = color;
}

// Listen to time picker
document.querySelectorAll('.custom-select-wrapper').forEach((wrapper, index) => {
  const optionsBox = wrapper.querySelector('.custom-options');

  optionsBox.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', () => {
      const [hour, period] = parseTimeLabel(option.textContent.trim());
      const hourPos = getClockPosition(hour, period);

      if (index === 0) {
        startHour.textContent = hour;
        startPeriod.textContent = period;
        moveCircle(purpleCircle, hourPos, 'yellow');
      } else {
        endHour.textContent = hour;
        endPeriod.textContent = period;
        moveCircle(redCircle, hourPos, 'red');
      }
    });
  });
});

// Calendar day select
calendarDays.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('day') && !target.classList.contains('disabled')) {
    const selectedMonthIndex = parseInt(monthSelect.value);
    const selectedDay = target.textContent;
    const selectedMonthName = months[selectedMonthIndex];
    monthText.textContent = selectedMonthName.slice(0, 3).toUpperCase();
    dateText.textContent = selectedDay;
  }
});