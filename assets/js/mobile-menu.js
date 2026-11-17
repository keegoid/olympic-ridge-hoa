document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const nav = document.querySelector('.nav');

    if (!menuToggle || !menu || !nav) {
        return;
    }

    const setMenuOpen = function (isOpen) {
        menu.classList.toggle('show-menu', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };

    menuToggle.addEventListener('click', function () {
        setMenuOpen(!menu.classList.contains('show-menu'));
    });

    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            setMenuOpen(false);
        });
    });

    document.addEventListener('click', function (event) {
        if (!menu.classList.contains('show-menu')) {
            return;
        }

        if (!nav.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    const compactLayout = window.matchMedia('(max-width: 1400px)');
    compactLayout.addEventListener('change', function () {
        const focusedInMenu = menu.contains(document.activeElement);
        setMenuOpen(false);
        if (compactLayout.matches && focusedInMenu) menuToggle.focus();
    });

    window.addEventListener('pageshow', function () { setMenuOpen(false); });

    nav.addEventListener('focusout', function () {
        requestAnimationFrame(function () {
            if (!nav.contains(document.activeElement)) setMenuOpen(false);
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menu.classList.contains('show-menu')) {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });
});
