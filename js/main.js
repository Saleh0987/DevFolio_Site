const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const btnTop = document.getElementById('btn-top');
const sections = document.querySelectorAll('section[id]')

// ========= Helper functions to toggle class ========= 
function toggleClass(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}
function arrayRemoveclass(arr, className) {
    arr.forEach(ele => {
        toggleClass(ele, className, false)
    });
}

// ========= Change Background ============
function scrollHeader() {
    toggleClass(navbar, 'nav-scrolled', this.scrollY >= 50)
}
window.addEventListener('scroll', scrollHeader);

// ========= Add Active class to Navbar Links ============
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        arrayRemoveclass(navLinks, 'active')
        toggleClass(link, 'active', true);
        toggleClass(document.querySelector('.navbar-collapse'), 'show', false);
        document.querySelector('.navbar-toggler').setAttribute('aria-expanded', 'false');
    });
})

// ========= BTN TOP ============
function showBtnTop() {
    toggleClass(btnTop, 'show', this.scrollY >= 100);
}
window.addEventListener('scroll', showBtnTop);


// ========= COUNTER ============
document.addEventListener('DOMContentLoaded', (event) => {
    const counters = document.querySelectorAll('.counter-num p.fs-2');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter(entry.target);
            } else {
                resetCounter(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counter.innerText = '0';
        observer.observe(counter);
    });

    function updateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const c = +counter.innerText;

        const increment = target / 400;

        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(() => updateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    }

    function resetCounter(counter) {
        counter.innerText = '0';
    }
});

