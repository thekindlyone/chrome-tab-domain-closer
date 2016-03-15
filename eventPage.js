function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

chrome.browserAction.onClicked.addListener(function(tab) {
    // chrome.tabs.getCurrent(function(tab){
    var curr_domain=extractDomain(tab.url);
    console.log("current domain is "+curr_domain);
    chrome.tabs.query({currentWindow: true, active: false, pinned: false}, function(tabs){
        for (var i = 0; i < tabs.length; i++) {
            if (extractDomain(tabs[i].url)==curr_domain){
                // url=tabs[i].url;
                chrome.tabs.remove(tabs[i].id,function(i)
                    {
                        return function()
                        {
                            console.log(tabs[i].url+" closed...");
                        };
                    }(i)
                );
            }
        }
    });
});
