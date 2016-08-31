
 window.addEventListener("load",function script () {

     let baseUrl = "https://baas.kinvey.com";
     let appKey = "kid_SkXP3R-j";
     let appSecret = "932a8e7e37174f4582d205c94f8ff8df";
     let _guestCredentials = "eb648e60-ce1f-46ad-afb3-604511fd4a1a.xJyA08JQqoMQeanhLih9R3GagvOPbqOctB3plHti7b4=";
     let baseServiceUrl = baseUrl + "/user/" + appKey + "/";
     let ospry = new Ospry('pk-test-gzq682bcx6xgj1z5xnyp252z');
     let IMGmetadata={};


    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);

    authService.initAuthorizationType("Kinvey");


    let requester = new Requester(authService);
     if(authService.isLoggedIn()){

         if(window.location.href.indexOf("login") > -1 || window.location.href.indexOf("register") > -1){window.location.href = "../index.html";}
         $('#loginNav').replaceWith( "<li id='logoutClick' ><a href='#'>Log Out</a></li>" );
         $('#registerNav').replaceWith( "<li id='logoutClick' ><a href='pages/mygallery.html'>My uploads</a></li>" );
         console.log(sessionStorage.URLs);
     }



     // if(authService.isLoggedIn()){
     //
     //     Kinvey.init({
     //         appKey: appKey,
     //         appSecret: appSecret
     //     });
     //
     //
     //     let user = new Kinvey.User();
     //     let userData = user.data;
     //     var promise = new Kinvey.Promise(function(resolve) {
     //         resolve(Kinvey.User.getActiveUser());
     //     });
     //     promise = promise.then(function onSuccess(user) {
     //         if (user) {
     //             return user.update({
     //                 "age": 21
     //             });
     //         }
     //         return user;
     //     }).then(function onSuccess(user) {
     //         alert(user);
     //     }).catch(function onError(error) {
     //         alert("no");
     //     });
     // }



     $('#logoutClick').on('click',function(){
         sessionStorage.clear();
         window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
     });

     $('#registerButton').on('click',function(){

         let username = $('#username').val();
         let password = $('#password').val();
         let confirmPassword = $('#confirmPassword').val();
         let data = {
             username: username,
             password: password,
             confirmPassword: confirmPassword
         };

         register(data);
     });

     $('#loginButton').on('click',function(){
         let username = $('#username').val();
         let password = $('#password').val();

         let data = {
             username: username,
             password: password
         };
         login(data);
     });

     function login(data){
         let requestUrl = baseServiceUrl + "login";

         requester.post(requestUrl, data,
             function success(response) {
                 showPopup('success',"An error has occu- j/k, you're logged in. :V");

                 //sessionStorage['_authToken'] = data._kmd._authToken;
                 //sessionStorage['username'] = data.username;
                 //sessionStorage['password'] = data.password;

                 sessionStorage.setItem('username', response.username);
                 sessionStorage.setItem('_authToken', response._kmd.authtoken);
                 sessionStorage.setItem('password', response.password);
                 sessionStorage.setItem('URLs', response.URLs);

                 setTimeout(function () {
                     window.location.href = "../index.html"; //will redirect to your blog page (an ex: blog.html)
                 }, 2000);
             },
             function error(response){
                 showPopup('error', "Tried to log in. Got slapped in the face. I blame you.");
             });
     }

    function register(requestData) {
        if (requestData.username.length < 5) {
            showPopup('error', "Username must be at least 5 characters, Mr. Person.");
            return;
        }

        if (requestData.password.length < 6) {
            showPopup('error', "'And the Lord said: ...and the one whose password is under 6 symbols is a sinner!");
            return;
        }

        if (requestData.password !== requestData.confirmPassword) {
            showPopup('error', "Wow, did you just mess up the password you wrote 2 seconds ago?");
            return;
        }

        delete  requestData['confirmPassword'];


        requester.post(baseServiceUrl, requestData,
            function success(data) {
                showPopup('success', "You did it! You're like, super registered right now!");
                setTimeout(function () {
                    window.location.href = "login.html"; //will redirect to your blog page (an ex: blog.html)
                }, 3000);
            },
            function error(data) {
                showPopup('error', "Something went 'bzzt' while trying to register.");
            });
    }

     $('#up-form').submit(function(e) {
         e.preventDefault();
         ospry.up({
             form: this,
             imageReady: function(err, metadata, i) {
                 if (err === null) {
                     console.log('Image uploaded to: ' + metadata.url);
                     IMGmetadata = metadata;
                         let title = $('#title').val();
                         let imgURL = IMGmetadata.url;
                         let confirmPassword = $('#confirmPassword').val();
                         let IMGdata = {
                             title: title,
                             imgURL: imgURL
                         };
                         let baseServiceUrlIMG = baseUrl + "/appdata/" + appKey + "/" + "images";

                         requester.post(baseServiceUrlIMG, IMGdata,
                             function success(data) {
                                 showPopup('success', "uploaded");
                                 setTimeout(function () {
                                     window.location.href = "login.html"; //will redirect to your blog page (an ex: blog.html)
                                 }, 3000);
                             },
                             function error(data) {
                                 showPopup('error', "not uploaded");
                             });

                 }
             }
         });
     });



     $('#DL').on('click', function(){
         ospry.get({
             url: "http://crafty-emu.ospry.io/x38p6ypfrnu/5bTw11L.jpg",
             format: "png",
             maxHeight: 400,
             imageReady: function(err, domImage, index) {
                 if (err === null) {
                     $('body').append(domImage);
                 }
             },
         });
     });

});

