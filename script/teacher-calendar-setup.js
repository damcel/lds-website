const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarDays = document.getElementById("calendar-days");
const selectedDateLabel = document.getElementById("selected-date-label");

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Fill month dropdown
monthNames.forEach((month, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = month;
  monthSelect?.appendChild(option);
});

// Fill year dropdown and disable all except current year
for (let y = currentYear - 5; y <= currentYear + 5; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  if (y !== currentYear) option.disabled = true;
  yearSelect?.appendChild(option);
}

if (monthSelect) monthSelect.value = currentMonth;
if (yearSelect) yearSelect.value = currentYear;

function updateMonthOptions() {
  const selectedYear = parseInt(yearSelect.value);
  const currentYearNow = today.getFullYear();
  const currentMonthNow = today.getMonth();

  [...monthSelect.options].forEach(opt => { opt.disabled = false; });

  if (selectedYear === currentYearNow) {
    for (let i = 0; i < currentMonthNow; i++) {
      monthSelect.options[i].disabled = true;
    }
    if (parseInt(monthSelect.value) < currentMonthNow) {
      monthSelect.value = currentMonthNow;
    }
  }
}

yearSelect.addEventListener('change', () => {
  updateMonthOptions();
  updateCalendar();
});

monthSelect.addEventListener('change', () => {
  updateCalendar();
});

updateMonthOptions();
