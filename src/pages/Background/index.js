chrome.identity.getAuthToken({'interactive': true}, function(token) {
    chrome.identity.getProfileUserInfo(
        function(info){
            if(info.email !== null && info.email !== ''){
                console.log("Setting user email...");
                //getUserData(info.email);
                //userEmail = info.email;
                chrome.storage.sync.set({userEmail: info.email}, function(){
                });
                chrome.storage.sync.set({userAuth: true}, function(){
                });
            }
        
        }
    );
 })

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
if(changeInfo && changeInfo.status == "complete"){
    console.log("Tab updated: " + tab.url);
    chrome.storage.sync.get(['userEmail'], function(data){
        const userEmail = data.userEmail;
        const currentTime = (new Date()).toJSON();
        const url=new URL(tab.url)
        console.log(url.hostname)
        const request = {email: userEmail, time: currentTime, url: url}
        fetch("http://127.0.0.1:5000/singleurl", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(request)
        })
        // console.log(JSON.stringify(request))
            .then(response => response.json())
            // .then(response => sendResponse(response))
            // .then(response => console.log(response))
            .catch(error => console.log('Error:', error));
        // console.log(request)
    })

}
});
//  chrome.idle.queryState(
//     5 * 60, // seconds
//     function(state) {
//       if (state === "idle") {
//         console.log("inactive")
//       } 
//     }
//   );
 // chrome.idle.setDetectionInterval(15);
// chrome.idle.onStateChanged.addListener(
//     chrome.storage.local.get(['userEmail'], function(result){
//         const currentTime = (new Date()).toJSON();
//             fetch("http://127.0.0.1:5000/singleurl", {
//                   method: 'POST',
//                   headers: {
//                       'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//                       'Content-Type': 'application/json; charset=utf-8'
//                   },
//                   body: JSON.stringify({email: result.userEmail, time: currentTime, url: "https://debank.com/projects", host: "debank"})
//               })
              
//                   .catch(error => console.log('Error:', error));
   
//             return true; 
//     })
// );



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
            // .then(response => console.log(response))
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
        chrome.storage.sync.get(['userEmail'], function(options){
            resolve(options.userEmail);
        })
        return p
    });

    const email = await p;
    return email;
};


