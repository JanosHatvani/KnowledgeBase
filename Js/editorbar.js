document.addEventListener('DOMContentLoaded', function() {
    const submenus = document.querySelectorAll('.submenu > a');

    submenus.forEach(submenu => {
        submenu.addEventListener('click', function(event) {
            event.preventDefault();
            const submenuItems = submenu.nextElementSibling;
            if (submenuItems.style.display === 'block') {
                submenuItems.style.display = 'none';
            } else {
                document.querySelectorAll('.submenu-items').forEach(item => {
                    item.style.display = 'none';
                });
                submenuItems.style.display = 'block';
            }
        });
    });
});

