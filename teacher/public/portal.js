document.addEventListener('DOMContentLoaded', function() {
    const marksButton = document.getElementById('marksButton');
    const attendanceButton = document.getElementById('attendanceButton');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const closeButton = document.querySelector('.close-button');

    function openModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    marksButton.addEventListener('click', function() {
        location.href = "/marks"
        // openModal('Marks details will be shown here.');
    });

    attendanceButton.addEventListener('click', function() {
        location.href = "/attendance"
    });


    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});
