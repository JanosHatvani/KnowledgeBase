document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const textarea = document.getElementById('editor');
    const toggleImage = document.getElementById('toggleImage');
    const linkName = document.getElementById('editorOnOFF');
    
    toggleButton.addEventListener('click', function(event) {
        event.preventDefault(); // Megakadályozza az alapértelmezett link viselkedést
        textarea.classList.toggle('collapsed');

        if (textarea.classList.contains('collapsed')) {
            toggleImage.src = 'Icons/icons8-toggle-40-off.png'; // Összecsukott állapot ikonja
            linkName.textContent = 'Editor OFF';
        } else {
            toggleImage.src = 'Icons/icons8-toggle-on-40.png'; // Kinyitott állapot ikonja
            linkName.textContent = 'Editor ON';
        }
    });
});
