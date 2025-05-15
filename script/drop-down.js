document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
    const selectBox = wrapper.querySelector('.custom-select-time');
    const optionsBox = wrapper.querySelector('.custom-options');
    const options = wrapper.querySelectorAll('.custom-option');

    // Toggle dropdown
    selectBox.addEventListener('click', () => {
      optionsBox.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
      option.addEventListener('click', () => {
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectBox.textContent = option.textContent;
        optionsBox.classList.remove('active');
      });
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        optionsBox.classList.remove('active');
      }
    });
  });
