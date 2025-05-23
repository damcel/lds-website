let activeDateElement = null;

function updateCalendar() {
  const year = parseInt(yearSelect.value);
  const month = parseInt(monthSelect.value);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;

  // Hide all session boxes by default
  document.querySelectorAll(".session-box").forEach(box => {
    box.style.display = 'none';
  });

  [...calendarDays.querySelectorAll('.date')].forEach(el => el.remove());

  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const cell = document.createElement("div");
    cell.className = "date";
    cell.textContent = d;

    const thisDate = new Date(year, month, d);
    const isToday = (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );

    if (isToday) cell.classList.add("today");

    if (thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      cell.classList.add("past-date");
      cell.style.pointerEvents = "none";
      cell.style.opacity = "0.4";
    } else {
      cell.onclick = () => {
        if (activeDateElement) activeDateElement.classList.remove("active");
        cell.classList.add("active");
        activeDateElement = cell;

        const dateText = `${monthNames[month]} ${d}, ${year}`;
        selectedDateLabel.innerHTML = `${dateText}`;

        const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        document.querySelectorAll(".session-box").forEach(box => {
          const boxDate = box.getAttribute('data-date');
          box.style.display = (boxDate === selectedDate) ? 'block' : 'none';
        });
      };

      if (isToday) {
        const todayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const hasSessions = [...document.querySelectorAll(".session-box")].some(
          box => box.getAttribute("data-date") === todayStr
        );

        if (hasSessions) {
          activeDateElement = cell;
          cell.classList.add("active");

          selectedDateLabel.innerHTML = `${monthNames[month]} ${d}, ${year}`;

          document.querySelectorAll(".session-box").forEach(box => {
            const boxDate = box.getAttribute('data-date');
            box.style.display = (boxDate === todayStr) ? 'block' : 'none';
          });
        }
      }
    }
    calendarDays.appendChild(cell);
  }
}

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  updateCalendar();
}

updateCalendar();
