document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');

    if (!galleryGrid) {
        return;
    }

    const videoEntries = [
        'assets/videos/lv_7267507699435179269_20260326025731.mp4',
        'assets/videos/lv_7466821341375712573_20260326025230.mp4',
        'assets/videos/lv_7528575583660281141_20260326025052.mp4',
        'assets/videos/lv_7530604850082581821_20260326025403.mp4',
        'assets/videos/lv_7533633356865522997_20260227230714.mp4'
    ];

    let activeVideo = null;

    videoEntries.forEach((src, index) => {
        const card = document.createElement('article');
        card.className = 'gallery-card gallery-video-card';

        const video = document.createElement('video');
        video.className = 'gallery-video';
        video.src = src;
        video.controls = true;
        video.playsInline = true;
        video.preload = index === 0 ? 'metadata' : 'none';
        video.setAttribute('controlsList', 'nodownload');
        video.setAttribute('aria-label', `Memory video ${index + 1}`);

        video.addEventListener('play', () => {
            if (activeVideo && activeVideo !== video) {
                activeVideo.pause();
            }
            activeVideo = video;
        });

        video.addEventListener('ended', () => {
            if (activeVideo === video) {
                activeVideo = null;
            }
        });

        card.appendChild(video);
        galleryGrid.appendChild(card);
    });
});
