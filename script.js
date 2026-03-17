document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginScreen = document.getElementById('loginScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const loadingLetters = document.querySelectorAll('.loading-letter');

    // Authentication Logic
    const handleLogin = () => {
        const password = passwordInput.value;
        if (password === 'BonKo') {
            errorMessage.textContent = '';
            showLoading();
        } else {
            errorMessage.textContent = 'Invalid Password';
            passwordInput.value = '';
            passwordInput.focus();
        }
    };

    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    // Sequential Loading Animation
    const showLoading = () => {
        loginScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            loadingScreen.classList.remove('hidden');
            
            // Animate letters one by one
            loadingLetters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('visible');
                    
                    // After the final "o", reveal the website
                    if (index === loadingLetters.length - 1) {
                        setTimeout(revealWebsite, 1000);
                    }
                }, index * 400); // 400ms delay between letters
            });
        }, 800);
    };

    const revealWebsite = () => {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Initialize animations after reveal
            initScrollAnimations();
        }, 800);
    };

    // Scroll Animations Initialization
    const initScrollAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
    };

    // Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Hidden Message Toggle
    const loveBtn = document.getElementById('loveBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const messageContainer = document.querySelector('.hidden-message p');

    const quotes = [
        "You are the most beautiful person I have ever known, inside and out. ✨",
        "I love you more than words could ever explain. 💕",
        "I am so sorry for every time I haven't been my best; you deserve the entire world. 🌎",
        "Your smile is my absolute favorite sight in the whole universe. 🌌",
        "My heart beats only for you, today and forever. 💓",
        "Please forgive me for my flaws; I'm always trying to be a better person for you. 🙏",
        "Every time I look at you, I fall in love all over again. 😍",
        "You have a breathtaking beauty that shines brighter than the stars. ⭐",
        "I'm sorry for any tears I've ever caused; my only goal is to bring you joy. 🥺",
        "You are my dream come true, the absolute love of my life. 💍",
        "I am completely captivated by your elegance and grace every single day. 🌸",
        "Thank you for loving me even when I'm hard to handle. I'm sorry for my mistakes. 🫂",
        "Life with you is the sweetest adventure I could ever ask for. 🎢",
        "Just seeing your face puts my heart completely at ease. 🥰",
        "I'm sorry whenever I let you down; you are my priority always. 💯",
        "I love you past the moon, beyond the stars, and back again. 🌙",
        "Your soul is just as breathtakingly beautiful as your physical appearance. 🦋",
        "I apologize for the times I'm stubborn; my love for you is bigger than that. ❤️",
        "You are my safe space, my home, and my greatest treasure. 🏡",
        "No matter what happens, my heart belongs completely to you. 🔐"
    ];
    let quoteIndex = 0;

    if (loveBtn && hiddenMessage && messageContainer) {
        loveBtn.addEventListener('click', () => {
            // Update the text to the current quote
            messageContainer.textContent = quotes[quoteIndex];
            
            // Move to the next quote, looping back to the start if needed
            quoteIndex = (quoteIndex + 1) % quotes.length;
            
            // Keep the message visible
            hiddenMessage.classList.add('show');
            
            // Update button text to encourage more clicks
            const btnTexts = ['Keep clicking... 💕', 'Another one? 😘', 'More love... ✨', 'Read more... 💌'];
            loveBtn.textContent = btnTexts[Math.floor(Math.random() * btnTexts.length)];
        });
    }
});
