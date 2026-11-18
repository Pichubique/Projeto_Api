self.addEventListener('install' , (e) =>  {
    e.waitUntil(
        cathes.images.open('pwa-cache').them((cache) =>{
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/app.jsx'
            ])
        })
    )    
})

    self.addEventListener('fetch', (e) =>{
        e.respondWith(
         cathes.match(e.request).them((response)  => {
            return response || fetch(e.request);
         })       
        
    )    
    
    })

    if('ServiceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
            .them(() => console.log('service worker registrado com sucesso!'))
            .catch((err) => console.log('falha ao registrar service worker:', err))
        })
    }