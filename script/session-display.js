// === schedule.js ===
(function () {
    const schedules = {
      "Alice Johnson": [
        { session: 1, date: "2025-06-01", instrument: "Piano" },
        { session: 2, date: "2025-06-08", instrument: "Piano" },
      ],
      "Bob Smith": [
        { session: 1, date: "2025-06-02", instrument: "Guitar" },
      ],
      "Charlie Davis": [
        { session: 1, date: "2025-06-05", instrument: "Drum" },
        { session: 2, date: "2025-06-12", instrument: "Drum" },
        { session: 3, date: "2025-06-19", instrument: "Drum" },
      ],
      "default": [
        { session: 1, date: "2025-06-01", instrument: "Violin" }
      ]
    };
  
    const assignmentPanel = document.getElementById('assignment-panel');
    const availableTimeHeading = assignmentPanel.querySelector('h2');
    const sessionBox = assignmentPanel.querySelector('.session-box');
    const tbody = sessionBox.querySelector('tbody');
  
    window.selectStudent = function(name) {
      document.getElementById('student-combo').value = name;
      availableTimeHeading.textContent = name;
      tbody.innerHTML = '';
  
      const schedule = schedules[name] || schedules['default'];
      schedule.forEach(session => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${session.session}</td>
          <td>${session.date}</td>
          <td>${session.instrument} ${getInstrumentIcon(session.instrument)}</td>
        `;
        tr.addEventListener('click', () => window.openModal(session));
        tbody.appendChild(tr);
      });
  
      sessionBox.style.display = 'block';
    };
  
    window.clearSchedule = function() {
      availableTimeHeading.textContent = '';
      tbody.innerHTML = '';
      sessionBox.style.display = 'none';
    };
  
    function getInstrumentIcon(instrument) {
      switch (instrument.toLowerCase()) {
        case 'drum': return '<i class="fa-solid fa-drum"></i>';
        case 'guitar': return '<i class="fa-solid fa-guitar"></i>';
        case 'piano': return '<i class="fa-solid fa-music"></i>';
        case 'violin': return '<i class="fa-solid fa-violin"></i>';
        default: return '';
      }
    }
  })();