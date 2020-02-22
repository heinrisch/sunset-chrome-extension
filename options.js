function save_options_disable() {
    save_options(false);
}

function save_options_enable() {
    save_options(true);
}

function save_options(enabled) {
    chrome.storage.sync.set({
        enabled: enabled,
        overlayColorTemperature: temperatureOverlayRange.value,
        overlayAlpha: alphaOverlayRange.value,
    }, function () {
        const status = document.getElementById('status');
        status.textContent = `Saved and ${enabled ? 'enabled' : 'disabled'}. Refresh page to see changes.`;
        setTimeout(function () {
            status.textContent = '';
        }, 2000);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        enabled: true,
        overlayColorTemperature: 3000,
        overlayAlpha: 0.5,
    }, function (items) {
        setOverlayColorTemperature(items.overlayColorTemperature);
        setOverlayAlpha(items.overlayAlpha)
    });
}

const colorPreview = document.getElementById('color-preview');

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save-and-enable').addEventListener('click', save_options_enable);
document.getElementById('disable').addEventListener('click', save_options_disable);

// Overlay temperature
const temperatureOverlayRange = document.getElementById('temperature-range');
temperatureOverlayRange.addEventListener('input', () => {
    setOverlayColorTemperature(temperatureOverlayRange.value);
});

function setOverlayColorTemperature(value) {
    temperatureOverlayRange.value = value;
    colorPreview.style.backgroundColor = chroma.temperature(value);
}

// Overlay alpha
const alphaOverlayRange = document.getElementById('alpha-range');
alphaOverlayRange.addEventListener('input', () => {
    setOverlayAlpha(alphaOverlayRange.value);
});

function setOverlayAlpha(value) {
    alphaOverlayRange.value = value;
    colorPreview.style.opacity = value;
}
