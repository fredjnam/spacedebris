const vid = document.getElementById('vid');

window.addEventListener('scroll', () => {
    const rect = vid.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (inView) {
        vid.play();
    } else {
        vid.pause();
    }
}
);