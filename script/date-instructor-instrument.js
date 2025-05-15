// Dropdown logic
function setupDropdown(wrapperId, selectedId, optionsId) {
  const wrapper = document.getElementById(wrapperId);
  const selected = document.getElementById(selectedId);
  const options = document.getElementById(optionsId);

  selected.addEventListener("click", () => {
    options.style.display = options.style.display === "flex" ? "none" : "flex";
  });

  options.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      options.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      selected.textContent = opt.textContent + ' ▾';
      options.style.display = "none";
    });
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      options.style.display = "none";
    }
  });
}

setupDropdown("instrument-dropdown", "instrument-selected", "instrument-options");
setupDropdown("instructor-dropdown", "instructor-selected", "instructor-options");

// Calendar
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarDays = document.getElementById("calendar-days");

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentDate = now.getDate();

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

// Populate year dropdown
for (let y = currentYear; y <= currentYear + 3; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.text = y;
  yearSelect.appendChild(option);
}

// Populate month dropdown
function populateMonths(selectedYear) {
  monthSelect.innerHTML = "";
  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = month;
    if (selectedYear == currentYear && index < currentMonth) {
      option.disabled = true;
    }
    monthSelect.appendChild(option);
  });
  monthSelect.value = selectedYear == currentYear ? currentMonth : 0;
}

populateMonths(currentYear);
yearSelect.value = currentYear;

// Render calendar days
function renderCalendar(month, year) {
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon...
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  dayLabels.forEach(label => {
    const div = document.createElement("div");
    div.textContent = label;
    div.className = "day-header";
    calendarDays.appendChild(div);
  });

  const startOffset = (firstDay + 6) % 7; // Adjust Sunday start to Monday
  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    calendarDays.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement("div");
    day.textContent = d;
    day.className = "day";

    const isPast =
      (year < currentYear) ||
      (year === currentYear && month < currentMonth) ||
      (year === currentYear && month === currentMonth && d < currentDate);

    if (isPast) {
      day.classList.add("disabled");
    } else if (d === currentDate && month === currentMonth && year === currentYear) {
      day.classList.add("today");
    }

    // Click to highlight selected day
    if (!isPast) {
    day.addEventListener("click", () => {
        const allDays = calendarDays.querySelectorAll(".day");
        allDays.forEach(el => el.classList.remove("selected"));
        day.classList.add("selected");
    });
    }

    calendarDays.appendChild(day);
  }
}

monthSelect.addEventListener("change", () => {
  renderCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
});

yearSelect.addEventListener("change", () => {
  populateMonths(parseInt(yearSelect.value));
  renderCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
});

renderCalendar(currentMonth, currentYear);