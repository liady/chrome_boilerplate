Messages.listen(null, function(request, sendResponse){
    if(request.init) {
        sendResponse();
    }
});