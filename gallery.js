document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');

    if (!galleryGrid) {
        return;
    }

    const IMAGE_COUNT = 5;
    const pageSeed = `${window.location.pathname}-${Date.now()}`;

    const imageUrls = Array.from({ length: IMAGE_COUNT }, (_, index) => {
        const seed = `${pageSeed}-${index}-${Math.random().toString(36).slice(2)}`;
        return `https://picsum.photos/seed/${seed}/900/1200`;
    });

    imageUrls.forEach((url, index) => {
        const card = document.createElement('article');
        card.className = 'gallery-card';

        const image = document.createElement('img');
        image.className = 'gallery-image';
        image.src = url;
        image.alt = `Random picture ${index + 1}`;
        image.loading = index === 0 ? 'eager' : 'lazy';
        image.referrerPolicy = 'no-referrer';

        card.appendChild(image);
        galleryGrid.appendChild(card);
    });
});
