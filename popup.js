// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
let statusLabel = document.getElementById('statusLabel');
let isEnabled = false;

console.log('test');
changeColor.style.background = "#0000FF";

chrome.storage.sync.get('extensionEnabled', function (data) {
    isEnabled = data.extensionEnabled;
    statusLabel.innerText = `This extension is ${isEnabled ? 'enabled' : 'disabled'}`
});


changeColor.onclick = function (element) {
    chrome.storage.sync.set({extensionEnabled: !isEnabled}, function() {
        console.log('Value is set to ' + value);
    });
};


chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (const key in changes) {
        const storageChange = changes[key];
        if(key === 'extensionEnabled') {
            isEnabled = storageChange.newValue
        }
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});
