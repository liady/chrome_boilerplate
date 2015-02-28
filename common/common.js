function getBg(){
        return chrome.extension.getBackgroundPage();
}
function $$(id){return document.getElementById(id);}

var Cache = (function(){
    var _cache = {};
    return {
        set : function(k,v){_cache[k]=v;return v;},
        get : function(k){return _cache[k];}
    };
}());

// BG communication handling
;(function(global){
    "use strict";

    global.Messages=global.Messages||{};

    var _listeners={};

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        request = request || {};
        var handler = request.event || "_global";
        (_listeners[handler]||[]).forEach(function(listener){
            listener(request, sendResponse);
        });
        return true;
    });

    function listen(event, listener){
        event = event || "_global";
        var list = _listeners[event] || [];
        list.push(listener);
        _listeners[event] = list;
    }

    function send(message, sendResponse){
        chrome.runtime.sendMessage(message,sendResponse);
    }

    function sendToInject(event, context){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            console.log(tabs[0].id);
            chrome.tabs.sendMessage(tabs[0].id, {
                event : event,
                context : context
            });
        });
    }

    global.Messages.send = send;
    global.Messages.sendToInject = sendToInject;
    global.Messages.listen = listen;

}(window));

function doGet(url, options) {
   options = options || {};
   var request, resp;
   request = new XMLHttpRequest();
   request.open('GET', url, true);
   request.onreadystatechange = function() {
       if (this.readyState === 4) {
           if (this.status >= 200 && this.status < 400) {
               resp = this.responseText;
               if(options.success) options.success(resp);
           } else {
               if(options.error) options.error(this.status);
           }
       }
   };
   request.send();
   request = null;
}