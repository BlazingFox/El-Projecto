
 window.addEventListener("load",function script () {

     let baseUrl = "https://baas.kinvey.com";
     let appKey = "kid_SkXP3R-j";
     let appSecret = "932a8e7e37174f4582d205c94f8ff8df";
     let _guestCredentials = "eb648e60-ce1f-46ad-afb3-604511fd4a1a.xJyA08JQqoMQeanhLih9R3GagvOPbqOctB3plHti7b4=";
     let baseServiceUrl = baseUrl + "/user/" + appKey + "/";


    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);

    authService.initAuthorizationType("Kinvey");

    let requester = new Requester(authService);

     // var regButton = document.getElementById("myButton");
     // btn.onclick = register;

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

                 alert("success");
                 //sessionStorage['_authToken'] = data._kmd._authToken;
                 //sessionStorage['username'] = data.username;
                 //sessionStorage['password'] = data.password;

                 sessionStorage.setItem('username', response.username);
                 sessionStorage.setItem('_authToken', response._kmd.authToken);
                 sessionStorage.setItem('password', response.password);

                 redirectUrl("#/");
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
                }, 4000);
            },
            function error(data) {
                showPopup('error', "Something went 'bzzt' while trying to register.");
            });
    }
});

