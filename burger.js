const burger = document.getElementById('burgerBtn');
const menu   = document.getElementById('mobileMenu');
const body   = document.body;

let startX = 0;
let currentX = 0;
let isDragging = false;
let savedScrollPosition = 0;

function openMenu() {
    savedScrollPosition = window.pageYOffset;
    body.style.top = `-${savedScrollPosition}px`;
    body.classList.add('menu-open');
    menu.classList.add('active');
    burger.classList.add('active');
}

function closeMenu() {
    body.style.top = '';
    body.classList.remove('menu-open');
    menu.classList.remove('active');
    burger.classList.remove('active');
    window.scrollTo(0, savedScrollPosition);
    menu.style.transition = '';
    menu.style.transform = '';
}

function toggleMenu() {
    if (menu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
}

burger.addEventListener('click', toggleMenu);

// --- TOUCH HANDLERS ---

menu.addEventListener('touchstart', e => {
    if (!menu.classList.contains('active')) return;
    startX = e.touches[0].clientX;
    isDragging = true;
    menu.style.transition = 'none';
}, { passive: true });

menu.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    // Свайп вправо → меню двигается вправо
    if (diffX > 0) {
        menu.style.transform = `translateX(${diffX}px)`;
    }
}, { passive: true });

menu.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    menu.style.transition = 'transform 0.35s cubic-bezier(0.32, 0, 0.18, 1)';

    const diffX = currentX - startX;

    if (diffX > 90) {
        closeMenu();
    } else {
        menu.style.transform = 'translateX(0)';
    }
});

document.addEventListener('click', e => {
    if (menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        e.target !== burger &&
        !burger.contains(e.target)) {
        closeMenu();
    }
});

