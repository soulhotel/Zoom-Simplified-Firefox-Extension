// Simplified zoom level from 1.0 to 1.25, defaulting to 1.0 if any other zoom level is detected.

function toggleZoom(tab) {
  browser.storage.local.get("customZoomLevel").then((result) => {
    let customZoomLevel = result.customZoomLevel || 1.3;
    browser.tabs.getZoom(tab.id).then((zoomFactor) => {
      let newZoomFactor;
      if (zoomFactor === 1.0) {
        newZoomFactor = customZoomLevel;
      } else if (zoomFactor === customZoomLevel) {
        newZoomFactor = 1.0;
      } else {
        newZoomFactor = 1.0;
      }
      browser.tabs.setZoom(tab.id, newZoomFactor);
    });
  });
}

browser.action.onClicked.addListener((tab) => {
  toggleZoom(tab);
});

browser.tabs.onZoomChange.addListener((zoomChangeInfo) => {
  if (zoomChangeInfo.reason === "user" && zoomChangeInfo.tabId === undefined) {
    browser.action.setBadgeText({ text: (zoomChangeInfo.newZoomFactor * 100).toFixed() + "%" });
  }
});


// Icon Update

function updateIcon() {
  const theme = browser.theme.getCurrent();
  const iconPath = theme.colors.icons.dark ? "css&ico/icon-dark.png" : "css&ico/icon-light.png";
  browser.action.setIcon({ path: iconPath });
}

updateIcon();
browser.theme.onUpdated.addListener(updateIcon);
