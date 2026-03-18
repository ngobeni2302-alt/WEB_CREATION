document.addEventListener('DOMContentLoaded', () => {
    const reloadBtn = document.getElementById('reload-btn');
    const mobileFrame = document.getElementById('mobile-frame');

    if (reloadBtn && mobileFrame) {
        reloadBtn.addEventListener('click', () => {
            mobileFrame.src = 'app.html';
        });
    }
});
