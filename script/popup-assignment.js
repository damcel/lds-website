// === modal.js ===
(function () {
    const modalOverlay = document.getElementById('modal-overlay');
    const assignmentModal = document.getElementById('assignment-modal');
    const assignmentText = document.getElementById('assignment-text');
  
    window.openModal = function(session) {
      document.getElementById('modal-session-info').textContent =
        `Session ${session.session} - ${session.date} - ${session.instrument}`;
      modalOverlay.classList.add('active');
      assignmentModal.dataset.session = JSON.stringify(session);
    };
  
    window.closeModal = function() {
      modalOverlay.classList.remove('active');
      assignmentText.value = '';
    };
  
    window.submitAssignment = function() {
      const session = JSON.parse(assignmentModal.dataset.session);
      console.log("Submitted Assignment:", {
        session,
        assignment: assignmentText.value
      });
      closeModal();
    };
  
    modalOverlay.addEventListener('click', function (e) {
      if (!assignmentModal.contains(e.target)) closeModal();
    });
  })();


  // === autosize.js ===
  document.getElementById('assignment-text').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });