export const loadFonts = () => {
    // Don't run on server.
    // Don't add class if fonts are already loaded
    if (
        'undefined' === typeof window ||
        window.IM.fontsLoaded
    ) {
        return;
    }

    document.documentElement.classList.add('fonts-loaded');

    try {
        localStorage.setItem('fontVersion', window.IM.fontVersion);
    } catch (e) { }
};
