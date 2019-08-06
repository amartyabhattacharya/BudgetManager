$(function(){
    chrome.storage.sync.get(['total', 'limit'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });

    // chrome.storage.sync.get('limit', function(budget){
    //     $('#limit').text(budget.limit);
    // });

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            var newTotal = 0, limit = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }
            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }
            if(budget.limit){
                limit = parseInt(budget.limit);
                if(newTotal <= limit){
                    chrome.storage.sync.set({'total': newTotal});
                    $('#total').text(newTotal);
                    $('#amount').val('');
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
    });
});
