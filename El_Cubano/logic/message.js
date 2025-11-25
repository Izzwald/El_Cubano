// Creates a custom message banner on the page
// @param {string} message - The text to display in the banner
// @param {object} options - Optional settings for customization
// options.type: 'info' | 'success' | 'warning' | 'error' (default: 'info')
// options.duration: number (milliseconds before auto-dismiss, default: null for persistent)
// options.position: 'top' | 'bottom' (default: 'top')
 
function showBanner(message, options = {}) {
    const { type = 'info', duration = null, position = 'top' } = options;

    // Create banner element
    const banner = document.createElement('div');
    banner.className = `custom-banner ${type} ${position}`;
    banner.textContent = message;

    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.className = 'banner-close';
    closeBtn.onclick = () => banner.remove();
    banner.appendChild(closeBtn);

    // Append to body
    document.body.appendChild(banner);

    // Auto-dismiss if duration is set
    if (duration) {
        setTimeout(() => banner.remove(), duration);
    }
}

export {showBanner}