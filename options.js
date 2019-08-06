$(function(){
    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
        // document.getElementByName('limit')[0].placeholder=budget.limit;
        // This doesn't work
    });

    $('#resetTotal').click(function(){
        // chrome.storage.sync.set({'total': 0});
        // var notifOptions = {
        //     type: 'basic',
        //     iconUrl: 'icon48.png',
        //     title: 'Total reset!',
        //     message: "Total has been resetted to 0 successfully."
        // };
        // chrome.notifications.create('resetNotif', notifOptions);

        // Or use a callback function
        chrome.storage.sync.set({'total': 0}, function(){
            var notifOptions = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Total reset!',
                message: "Total has been resetted to 0 successfully."
            };
            chrome.notifications.create('resetNotif', notifOptions);
        });


    });

    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit': parseInt(limit)}, function(){
                // close();
                var notifOptions = {
                    type: 'basic',
                    iconUrl: 'icon48.png',
                    title: 'Limit set successfully!',
                    message: "Limit has been set successfully to " + limit.toString()
                };
                chrome.notifications.create('limitNotif', notifOptions);
            });
            // $('#limit').val('');
        }
    });
});
