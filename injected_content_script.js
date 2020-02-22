chrome.storage.sync.get({
    enabled: true,
    overlayColorTemperature: 3000,
    overlayAlpha: 0.2,
}, function (items) {
    if (items.enabled) {
        const shadowDiv = document.createElement('div');
        shadowDiv.classList.add('sunset-overlay-filter');
        shadowDiv.style.backgroundColor = chroma.temperature(items.overlayColorTemperature);
        shadowDiv.style.opacity = items.overlayAlpha;
        document.children[0].append(shadowDiv);
    }
});
