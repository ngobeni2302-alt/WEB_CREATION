document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = 'bonko_authenticated';
    const loginOverlay = document.getElementById('login-overlay');
    const loadingOverlay = document.getElementById('loading-overlay');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password-input');
    const menuToggle = document.getElementById('menu-toggle');
    const menuPanel = document.getElementById('menu-panel');
    const logoutButtons = document.querySelectorAll('[data-logout]');
    const isAppPage = Boolean(loginOverlay && mainContent);

    const closeMenu = () => {
        if (!menuToggle || !menuPanel) {
            return;
        }

        menuPanel.classList.add('hidden');
        menuPanel.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        if (!menuToggle || !menuPanel) {
            return;
        }

        menuPanel.classList.remove('hidden');
        menuPanel.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
    };

    const showLoggedOutState = () => {
        if (!isAppPage) {
            window.location.href = 'app.html';
            return;
        }

        loginOverlay.classList.remove('hidden');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
        mainContent.style.display = 'none';
        document.body.style.overflow = 'hidden';

        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }

        closeMenu();
    };

    const showLoggedInState = () => {
        if (!isAppPage) {
            return;
        }

        loginOverlay.classList.add('hidden');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
        mainContent.style.display = 'block';
        document.body.style.overflow = 'auto';
    };

    const logout = () => {
        sessionStorage.removeItem(AUTH_KEY);
        showLoggedOutState();
    };

    /* Theme UI removed: DarkMood/LightMood buttons and handlers deleted */

    // Viewport mode detection: set data-mode on body as 'mobile' or 'desktop'
    const updateViewportMode = () => {
        const mode = window.innerWidth <= 420 ? 'mobile' : 'desktop';
        document.body.dataset.mode = mode;
    };

    window.addEventListener('resize', updateViewportMode);
    updateViewportMode();

    if (!isAppPage && sessionStorage.getItem(AUTH_KEY) !== 'true') {
        window.location.href = 'app.html';
        return;
    }

    if (isAppPage) {
        if (sessionStorage.getItem(AUTH_KEY) === 'true') {
            showLoggedInState();
        } else {
            showLoggedOutState();
        }
    }

    if (menuToggle && menuPanel) {
        menuToggle.addEventListener('click', () => {
            const isHidden = menuPanel.classList.contains('hidden');
            if (isHidden) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        document.addEventListener('click', (event) => {
            if (!menuToggle.closest('.menu-wrap')?.contains(event.target)) {
                closeMenu();
            }
        });
    }

    logoutButtons.forEach((button) => {
        button.addEventListener('click', logout);
    });

    window.BonKoAuth = {
        AUTH_KEY,
        showLoggedInState,
        showLoggedOutState,
        logout
    };
});
