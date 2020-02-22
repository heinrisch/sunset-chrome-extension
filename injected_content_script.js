let settings = null;
let elementQueue = [];

chrome.runtime.sendMessage({hello: 'world'}, function (response) {
    settings = response;
    handleAllElements();
});

const queueElement = (e) => {
    elementQueue.push(e);
    handleAllElements();
};

const handleAllElements = () => {
    if (settings !== null) {
        if (settings.enabled) {
            elementQueue.forEach((e) => handleElement(e));
        }
        elementQueue = [];
    }
};

const setAttr = 'sunset-edited-item';
const handleElement = (e) => {
    try {
        if (e.nodeType === 3 || e.nodeType === 8) return;
        if (e.getAttribute(setAttr) === null) {
            if (e.tagName.toLowerCase() === 'body') {
                const shadowDiv = document.createElement('div');
                shadowDiv.classList.add('other-filter');
                shadowDiv.style.backgroundColor = chroma.temperature(settings.overlayColorTemperature);
                shadowDiv.style.opacity = settings.overlayAlpha;
                e.append(shadowDiv);
            }

            const computedColor = window.getComputedStyle(e, null).color;
            if (computedColor) {
                let c = chroma(computedColor);
                if (c.luminance() > 0.2) {
                    e.style.color = c.darken(0.5)
                }
            }
            e.setAttribute(setAttr, 'true')
        }
    } catch (exception) {
        console.log('handleElement', exception, e)
    }
};


const observer = new MutationObserver(function (mutationList) {
    for (const mutation of mutationList) {
        for (const e of mutation.addedNodes) {
            queueElement(e);
        }
        queueElement(mutation.target);
    }
});

observer.observe(document, {
    childList: true,
    subtree: true,
});

