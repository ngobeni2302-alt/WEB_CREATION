document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    const loginOverlay = document.getElementById('login-overlay');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    const mainContent = document.getElementById('main-content');

    const handleLogin = () => {
        const password = passwordInput.value;
        if (password === 'BonKo') {
            errorMsg.textContent = '';
            startLoading();
        } else {
            errorMsg.textContent = 'Invalid Password';
            passwordInput.value = '';
            passwordInput.focus();
        }
    };

    const startLoading = () => {
        loginOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('hidden');

        const letters = loadingText.querySelectorAll('span');
        letters.forEach((letter, index) => {
            letter.style.animation = `fadeInLetter 0.5s ease forwards ${index * 0.4}s`;
        });

        // After all letters have appeared (5 letters * 0.4s + 0.5s fade)
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            mainContent.style.display = 'block';
            document.body.style.overflow = 'auto';
        }, (letters.length * 400) + 1000);
    };

    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
});
