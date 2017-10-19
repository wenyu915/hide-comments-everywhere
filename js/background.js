chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, { event: 'pageload' });
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.event) {
        case 'scriptdone':
            if (message.hideComments) {
                showEnabledIcon(sender.tab.id);
            } else {
                showDisabledIcon(sender.tab.id);
            }
            break;
        default:
            console.error("Hide Comments Everywhere received an unexpected message: " + message.event);
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    toggleComments(tab.id);
});

chrome.windows.onCreated.addListener(function() {
    getDefinitionVersion(function(version) {
        chrome.storage.local.get('definition_version', function(result) {
            if (result === undefined || result.definition_version === undefined || result.definition_version < version) {
                getAndStoreSiteDefinitions(version);
            }
        });
    });
})

chrome.storage.local.get('definition_version', function(result) {
    if (result === undefined || result.definition_version === undefined) {
        getAndStoreSiteDefinitions();
    }
});
