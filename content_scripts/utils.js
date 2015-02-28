// inject js functions into document
function injectFunction(func, params) {
    var actualCode = '(' + func + ')('+JSON.stringify(params)+');';
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}

// inject a script
function injectScript(src, successFn){
    var s=document.createElement('script');
    s.onload=successFn;
    s.src=src;
    document.getElementsByTagName('body')[0].appendChild(s);
}

// handle init
Messages.send({init:true}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        // ----------------------------------------------------------
        // This part of the script triggers when page is done loading
        console.log("DOM is loaded.");
        // ----------------------------------------------------------

        if(window.onDOMLoaded)
            window.onDOMLoaded();
     
    }
    }, 10);
});