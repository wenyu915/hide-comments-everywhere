chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    toggleElements(document.getElementsByClassName('comments-container-container'), (message.enabled ? "none" : "initial"));
    toggleElements(document.getElementsByClassName('comments-count'), (message.enabled ? "none" : "initial"));
});
