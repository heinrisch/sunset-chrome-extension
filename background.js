let settings = null;

const syncSettings = () => {
    chrome.storage.sync.get({
        enabled: true,
        colorTemperature: 3000,
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
