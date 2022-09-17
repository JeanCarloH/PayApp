let cacheData = "appV1"
this.addEventListener("install", (event) =>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                'static/js/bundle.js',
                'static/js/0.chunk.js',
                'static/js/main.chunk.js',
                'index.html',
                '/boostrap.min.css',
                '/',
                "/Users"
            ])
        })
    )
})

// this.addEventListener('push', function(event) {
//     if (event.data) {
//       var data = event.data.json();
//       this.registration.showNotification(data.title,{
//         body: data.body,
//         icon: data.icon,
//         requireInteraction:true,
//         badge: data.badge
//       });
//       console.log('This push event has data: ', event.data.text());
//     } else {
//       console.log('This push event has no data.');
//     }
// })
this.addEventListener("fetch", (event) =>{

    event.waitUntil(
        this.registration.showNotification("Hello World",{
            body : "This is my first notification",
        })
    )
    
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then((result)=>{
                if(result){
                    return result
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
})

