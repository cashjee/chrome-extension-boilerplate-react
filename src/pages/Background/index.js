chrome.identity.getAuthToken({'interactive': true}, function(token) {
    chrome.identity.getProfileUserInfo(
        function(info){
            if(info.email !== null && info.email !== ''){
                console.log("Setting user email...");
                //getUserData(info.email);
                //userEmail = info.email;
                chrome.storage.local.set({userEmail: info.email}, function(){
                });
                chrome.storage.local.set({userAuth: true}, function(){
                });
            }
        
        }
    );
 })






chrome.runtime.onMessage.addListener(        
    function(request, sender, sendResponse) {
       
      fetch("http://127.0.0.1:5000/singleurl", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify( request)
        })
        // console.log(JSON.stringify(request))
            .then(response => response.json())
            // .then(response => sendResponse(response))
            .then(response => console.log(response))
            .catch(error => console.log('Error:', error));
        // console.log(request)

      
      return true; 
    });

export async function getUserData(){
    var userEmail = await getEmail()
    return fetch("http://127.0.0.1:5000/history", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({email: userEmail})
    });
}


async function getEmail() {
    var p = new Promise(function(resolve, reject){
        chrome.storage.local.get(['userEmail'], function(options){
            resolve(options.userEmail);
        })
        return p
    });

    const email = await p;
    return email;
};


