var contextMenuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(val){
    return !isNaN(val) && parseInt(Number(val)) == val && !isNaN(parseInt(val, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == 'spendMoney' && clickData.selectionText){
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                if(budget.limit){
                    limit = parseInt(budget.limit);
                    if(newTotal <= limit){
                        chrome.storage.sync.set({'total': newTotal});
                    }
                    else{
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon48.png',
                            title: 'More than limit!',
                            message: "Uh oh! Looks like you are trying to exceed the limit."
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                }
            });
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});
