//observer to add and remove class .show
const observer =  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

//giving elements with classes .slide-right, .slide-down and .slide-up .show when they are seen on screen
const hiddenElements = document.querySelectorAll('.slide-right');
hiddenElements.forEach((el) => observer.observe(el));

const hiddenElements2 = document.querySelectorAll('.slide-down');
hiddenElements2.forEach((el) => observer.observe(el));

const hiddenElements3 = document.querySelectorAll('.slide-up');
hiddenElements3.forEach((el) => observer.observe(el));