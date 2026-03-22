document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    const loginOverlay = document.getElementById('login-overlay');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    const mainContent = document.getElementById('main-content');
    const viewMemoriesBtn = document.getElementById('view-memories-btn');
    const memoriesPanel = document.getElementById('memories-panel');
    const memoriesGrid = document.getElementById('memories-grid');
    const closeMemoriesBtn = document.getElementById('close-memories-btn');

    const MEMORY_COUNT = 5;
    const MEMORY_STORAGE_KEY = 'bonko-view-memories';

    const buildMemoryUrls = () => {
        const stamp = Date.now();

        return Array.from({ length: MEMORY_COUNT }, (_, index) => {
            const seed = `${stamp}-${Math.random().toString(36).slice(2)}-${index}`;
            return `https://picsum.photos/seed/${seed}/900/1200`;
        });
    };

    const getStoredMemories = () => {
        try {
            const storedMemories = JSON.parse(localStorage.getItem(MEMORY_STORAGE_KEY) || '[]');
            return Array.isArray(storedMemories) ? storedMemories.slice(0, MEMORY_COUNT) : [];
        } catch (error) {
            return [];
        }
    };

    const storeMemories = (memoryUrls) => {
        localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(memoryUrls));
    };

    const renderMemories = (memoryUrls) => {
        if (!memoriesGrid) {
            return;
        }

        memoriesGrid.innerHTML = '';

        memoryUrls.forEach((url, index) => {
            const memoryCard = document.createElement('article');
            memoryCard.className = 'memory-card';

            const memoryImage = document.createElement('img');
            memoryImage.className = 'memory-image';
            memoryImage.src = url;
            memoryImage.alt = `Memory photo ${index + 1}`;
            memoryImage.loading = 'lazy';
            memoryImage.referrerPolicy = 'no-referrer';

            memoryCard.appendChild(memoryImage);
            memoriesGrid.appendChild(memoryCard);
        });
    };

    const ensureMemories = () => {
        const storedMemories = getStoredMemories();

        if (storedMemories.length === MEMORY_COUNT) {
            renderMemories(storedMemories);
            return storedMemories;
        }

        const newMemories = buildMemoryUrls();
        storeMemories(newMemories);
        renderMemories(newMemories);
        return newMemories;
    };

    const openMemories = () => {
        ensureMemories();
        memoriesPanel.classList.remove('hidden');
        memoriesPanel.setAttribute('aria-hidden', 'false');
        memoriesPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const closeMemories = () => {
        memoriesPanel.classList.add('hidden');
        memoriesPanel.setAttribute('aria-hidden', 'true');
    };

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

    if (viewMemoriesBtn) {
        viewMemoriesBtn.addEventListener('click', openMemories);
    }

    if (closeMemoriesBtn) {
        closeMemoriesBtn.addEventListener('click', closeMemories);
    }

    // --- Quote Generator Logic ---
    const quoteBtn = document.getElementById('quote-btn');
    const quoteDisplay = document.getElementById('quote-display');
    const quoteText = document.getElementById('quote-text');

    const LOVE_QUOTES = [
        "Your beauty takes my breath away, every single day.",
        "In your eyes, I see a reflection of God's perfect grace.",
        "I am sorry for the times I fail you; my love for you remains unshaken.",
        "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. — 1 Corinthians 13:4",
        "To love you is to see the face of God.",
        "I promise to hold your hand through every storm until eternity.",
        "We love because he first loved us. — 1 John 4:19",
        "Forgive my shortcomings, for my heart belongs only to you.",
        "Love is not just a feeling, it's a choice I make every morning with you.",
        "Our love is a sacred bond that will never be broken.",
        "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God. — 1 John 4:7",
        "You are my greatest blessing and my most beautiful dream.",
        "I'm sorry for being imperfect, but my love for you is perfect.",
        "Whoever does not love does not know God, because God is love. — 1 John 4:8",
        "Eternity wouldn't be long enough to show you how much I care.",
        "Your smile is the light that guides me home.",
        "And over all these virtues put on love, which binds them all together in perfect unity. — Colossians 3:14",
        "Please forgive me; life is empty without your warmth.",
        "You are the rhythm of my heart and the peace in my soul.",
        "Above all, love each other deeply, because love covers over a multitude of sins. — 1 Peter 4:8",
        "Beauty is not in the face; beauty is a light in the heart, and you are glowing.",
        "Be completely humble and gentle; be patient, bearing with one another in love. — Ephesians 4:2",
        "I am forever yours, in this life and the next.",
        "My love for you grows deeper with every prayer we share.",
        "Dear children, let us not love with words or speech but with actions and in truth. — 1 John 3:18",
        "You are more precious than anything this world can offer.",
        "In your arms, I have found my forever home.",
        "Hatred stirs up conflict, but love covers over all wrongs. — Proverbs 10:12",
        "Every day with you is a gift I never want to stop opening.",
        "Love must be sincere. Hate what is evil; cling to what is good. — Romans 12:9",
        "Your heart is a masterpiece of kindness and beauty.",
        "I'm sorry for my mistakes; let my love be my apology.",
        "No one has ever seen God; but if we love one another, God lives in us and his love is made complete in us. — 1 John 4:12",
        "Love is the bridge that leads us to eternity together.",
        "You are the answer to every prayer I've ever whispered.",
        "Your inner beauty far outshines the morning sun.",
        "I promise to cherish you today, tomorrow, and forever.",
        "Forgiveness is the flower of love; please let it bloom between us.",
        "In Christ, our love finds its strength and its purpose.",
        "I am captivated by your spirit and your beautiful soul.",
        "To the world you are one person, but to me you are the world.",
        "I'm sorry for letting you down; you are my everything.",
        "Our love was written in the stars and sealed by the heavens.",
        "You are the most beautiful chapter in my book of life.",
        "I will choose you over and over again, without a pause.",
        "Peace, love, and you—that is all I truly need.",
        "I'm sorry for the words unspoken; I love you more than I can say.",
        "May God bless our path as we walk toward eternity hand in hand.",
        "You are a reflection of all that is good and beautiful.",
        "I love you beyond the stars and past the end of time."
    ];

    // Shuffle quotes on load
    let shuffledQuotes = [...LOVE_QUOTES].sort(() => Math.random() - 0.5);
    let currentQuoteIndex = 0;

    if (quoteBtn) {
        quoteBtn.addEventListener('click', () => {
            if (currentQuoteIndex >= shuffledQuotes.length) {
                shuffledQuotes = [...LOVE_QUOTES].sort(() => Math.random() - 0.5);
                currentQuoteIndex = 0;
            }

            quoteText.style.opacity = 0;
            setTimeout(() => {
                quoteText.textContent = shuffledQuotes[currentQuoteIndex++];
                quoteDisplay.classList.remove('hidden');
                quoteText.style.opacity = 1;
            }, 200);
        });
    }
});
