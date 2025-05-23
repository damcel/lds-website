(function() {
    const students = [
      "Alice Johnson",
      "Bob Smith",
      "Charlie Davis",
      "Diana Prince",
      "Ethan Hunt",
      "Fiona Apple",
      "George Clooney",
      "Hannah Montana",
      "Ian McKellen",
      "Jane Austen"
    ];

    // Sample schedules per student
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
      // Default for others (example)
      "default": [
        { session: 1, date: "2025-06-01", instrument: "Violin" }
      ]
    };

    const input = document.getElementById('student-combo');
    const list = document.getElementById('student-options');
    const assignmentPanel = document.getElementById('assignment-panel');
    const availableTimeHeading = assignmentPanel.querySelector('h2');
    const sessionBox = assignmentPanel.querySelector('.session-box');
    const tbody = sessionBox.querySelector('tbody');

    let filtered = [];
    let highlightedIndex = -1;

    function renderList(items) {
      list.innerHTML = '';
      if (items.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No results found';
        li.classList.add('no-results');
        list.appendChild(li);
        highlightedIndex = -1;
        return;
      }
      items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.setAttribute('data-index', idx);
        li.onclick = () => {
          selectStudent(item);
          hideList();
        };
        list.appendChild(li);
      });
      highlightedIndex = -1;
    }

    function filterItems(query) {
      filtered = students.filter(s => s.toLowerCase().includes(query.toLowerCase()));
      renderList(filtered);
      showList();
    }

    function showList() {
      list.style.display = 'block';
    }
    function hideList() {
      list.style.display = 'none';
      highlightedIndex = -1;
    }

    function updateHighlight(items) {
      items.forEach(li => li.classList.remove('highlighted'));
      if (highlightedIndex >= 0) {
        items[highlightedIndex].classList.add('highlighted');
        items[highlightedIndex].scrollIntoView({block: 'nearest'});
      }
    }

    function selectStudent(name) {
      input.value = name;
      updateSchedule(name);
      showSchedule();
    }

    function updateSchedule(name) {
        availableTimeHeading.textContent = name;
        tbody.innerHTML = '';
      
        const schedule = schedules[name] || schedules["default"];
      
        schedule.forEach(session => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${session.session}</td>
            <td>${session.date}</td>
            <td>${session.instrument} ${getInstrumentIcon(session.instrument)}</td>
          `;
          tr.addEventListener('click', () => {
            openModal(session);
          });
          tbody.appendChild(tr);
        });
      }

    function getInstrumentIcon(instrument) {
      // Just some examples; adjust as needed
      switch(instrument.toLowerCase()) {
        case 'drum': return '<i class="fa-solid fa-drum"></i>';
        case 'guitar': return '<i class="fa-solid fa-guitar"></i>';
        case 'piano': return '<i class="fa-solid fa-music"></i>';
        case 'violin': return '<i class="fa-solid fa-violin"></i>';
        default: return '';
      }
    }

    function showSchedule() {
      sessionBox.style.display = 'block';
    }

    input.addEventListener('input', e => {
      const val = e.target.value;
      if (!val) {
        hideList();
        // Also hide schedule if input cleared
        sessionBox.style.display = 'none';
        availableTimeHeading.textContent = '';
        tbody.innerHTML = '';
        return;
      }
      filterItems(val);
    });

    input.addEventListener('keydown', e => {
      if (list.style.display === 'none') return;
      const items = list.querySelectorAll('li:not(.no-results)');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (highlightedIndex < items.length -1) {
          highlightedIndex++;
          updateHighlight(items);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (highlightedIndex > 0) {
          highlightedIndex--;
          updateHighlight(items);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < items.length) {
          selectStudent(items[highlightedIndex].textContent);
          hideList();
        }
      } else if (e.key === 'Escape') {
        hideList();
      }
    });

    input.addEventListener('focus', () => {
      if (!input.value) {
          filtered = students.slice();
          renderList(filtered);
          showList();
      } else {
          filterItems(input.value);
      }
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.combo-box')) {
        hideList();
      }
    });
  })();

  function openModal(session) {
    document.getElementById('modal-session-info').textContent =
      `Session ${session.session} - ${session.date} - ${session.instrument}`;
  
    // Add .active class to show and center modal
    document.getElementById('modal-overlay').classList.add('active');
  
    // Store session data
    document.getElementById('assignment-modal').dataset.session = JSON.stringify(session);
  }
  
  function closeModal() {
    // Remove .active class to hide modal
    document.getElementById('modal-overlay').classList.remove('active');
  
    document.getElementById('assignment-text').value = '';
  }
  
  function submitAssignment() {
    const assignmentText = document.getElementById('assignment-text').value;
    const session = JSON.parse(document.getElementById('assignment-modal').dataset.session);
  
    console.log("Submitted Assignment:", {
      session,
      assignment: assignmentText
    });
  
    // Send data to backend here if needed
  
    closeModal();
  }
  
  // Close modal if user clicks outside the modal content
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    const modal = document.getElementById('assignment-modal');
    if (!modal.contains(e.target)) {
      closeModal();
    }
  });

  const textarea = document.getElementById('assignment-text');

textarea.addEventListener('input', function () {
  this.style.height = 'auto';      // Reset height
  this.style.height = this.scrollHeight + 'px'; // Set to scroll height
});

  
  