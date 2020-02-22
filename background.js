let settings = null;

const syncSettings = () => {
    chrome.storage.sync.get({
        enabled: true,
        overlayColorTemperature: 3000,
        overlayAlpha: 0.2,
    }, function (items) {
        console.log('Settings retrieved', items);
        settings = items;
    });
};

chrome.storage.onChanged.addListener(function () {
    syncSettings();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(settings);
});

syncSettings();
