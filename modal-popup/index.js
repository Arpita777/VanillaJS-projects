// Open Modal
function openModal() {
    document.querySelector('.modal-overlay').style.display = 'flex';
  }
  
  // Close Modal
  function closeModal() {
    document.querySelector('.modal-overlay').style.display = 'none';
  }
  
  // Event Listener for Close Button
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  
  // Event Listener for Open Modal Button
  document.querySelector('.modal-open').addEventListener('click', openModal);
  
  
  