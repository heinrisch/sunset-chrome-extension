function save_options_disable() {
    save_options(false);
}

function save_options_enable() {
    save_options(true);
}

function save_options(enabled) {
    chrome.storage.sync.set({
        enabled: enabled,
        colorTemperature: temperatureRange.value,
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
        colorTemperature: 3000,
    }, function (items) {
        setColorTemperature(items.colorTemperature);
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save-and-enable').addEventListener('click', save_options_enable);
document.getElementById('disable').addEventListener('click', save_options_disable);
const temperatureRange = document.getElementById('temperature-range');
const temperatureRangeLabel = document.getElementById('temperature-range-label');
const colorPreview = document.getElementById('color-preview');
temperatureRange.addEventListener('input', () => {
    setColorTemperature(temperatureRange.value);
});

function setColorTemperature(value) {
    temperatureRange.value = value;
    temperatureRangeLabel.innerText = `Overlay color temperature (${value} K)`;
    colorPreview.style.backgroundColor = chroma.temperature(value);
}
