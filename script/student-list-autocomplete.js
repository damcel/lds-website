// === autocomplete.js ===
(function () {
    const students = [
      "Alice Johnson", "Bob Smith", "Charlie Davis",
      "Diana Prince", "Ethan Hunt", "Fiona Apple",
      "George Clooney", "Hannah Montana", "Ian McKellen", "Jane Austen"
    ];
  
    const input = document.getElementById('student-combo');
    const list = document.getElementById('student-options');
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
        li.dataset.index = idx;
        li.onclick = () => {
          window.selectStudent(item);
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
  
    function showList() { list.style.display = 'block'; }
    function hideList() { list.style.display = 'none'; highlightedIndex = -1; }
  
    function updateHighlight(items) {
      items.forEach(li => li.classList.remove('highlighted'));
      if (highlightedIndex >= 0) {
        items[highlightedIndex].classList.add('highlighted');
        items[highlightedIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  
    input.addEventListener('input', e => {
      const val = e.target.value;
      if (!val) {
        hideList();
        window.clearSchedule();
        return;
      }
      filterItems(val);
    });
  
    input.addEventListener('keydown', e => {
      const items = list.querySelectorAll('li:not(.no-results)');
      if (list.style.display === 'none' || items.length === 0) return;
  
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (highlightedIndex < items.length - 1) highlightedIndex++;
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (highlightedIndex > 0) highlightedIndex--;
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            window.selectStudent(items[highlightedIndex].textContent);
            hideList();
          }
          break;
        case 'Escape':
          hideList();
          break;
      }
      updateHighlight(items);
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
      if (!e.target.closest('.combo-box')) hideList();
    });
  })();
  