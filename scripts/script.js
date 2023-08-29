//fetch("https://api.unsplash.com/search/photos?query=philippines&client_id=2BHRf_91BeuRTt7CDCE-_eA3l95wlZLWlyog-KQ2c2Y")
//    .then(
//        function(response){
//
//
//            if(response.status !== 200){
//                console.log("There was a problem. Status code: " + response.status);
//                return;
//            }
//
//            response.json().then(
//                function(data){
//                    document.getElementById("bg-image").style.background = 'url(' + data["results"][0]["urls"]["regular"]+')';
//                }
//            )
//        }
//    )
//    .catch(
//        function(err){
//            console.log(err+'404');
//        }
//        )
//fetch('/').then(response => response.json()).then(data => {
//            const photosContainer = document.getElementById('bg-image');
//            data.photo_urls.forEach(url => {
//                const img = document.createElement('img');
//                img.src = url;
//                photosContainer.appendChild(img);
//            });
//        });