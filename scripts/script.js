window.addEventListener("load", function script() {

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_SkXP3R-j";
    let appSecret = "932a8e7e37174f4582d205c94f8ff8df";
    let _guestCredentials = "eb648e60-ce1f-46ad-afb3-604511fd4a1a.xJyA08JQqoMQeanhLih9R3GagvOPbqOctB3plHti7b4=";
    let baseServiceUrl = baseUrl + "/user/" + appKey + "/";
    let baseServiceUrlIMG = baseUrl + "/appdata/" + appKey + "/" + "images";
    let ospry = new Ospry('pk-test-gzq682bcx6xgj1z5xnyp252z');
    let IMGmetadata = {};
    let galleryCounter = 0;


    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);

    authService.initAuthorizationType("Kinvey");


    let requester = new Requester(authService);

    if (window.location.href.indexOf("index") > -1) {
        latest5()
    }

    if (window.location.href.indexOf("images") > -1) {
        gallery()
    }
    if (window.location.href.indexOf("mygallery") > -1) {
        myGallery()
    }


    if (authService.isLoggedIn()) {

        if (window.location.href.indexOf("login") > -1 || window.location.href.indexOf("register") > -1) {
            window.location.href = "../index.html";
        }
        if (window.location.href.indexOf("mygallery") > -1) {
            $('#registerNav').replaceWith("<li id='myGall' ><a href='mygallery.html'>My uploads</a></li>");
            $('#loginNav').replaceWith("<li id='logoutClick' ><a href='../index.html'>Log Out</a></li>");
        } else if (window.location.href.indexOf("images") > -1) {
            $('#registerNav').replaceWith("<li id='myGall' ><a href='mygallery.html'>My uploads</a></li>");
            $('#loginNav').replaceWith("<li id='logoutClick' ><a href='../index.html'>Log Out</a></li>");
        } else {
            $('#registerNav').replaceWith("<li id='myGall' ><a href='pages/mygallery.html'>My uploads</a></li>");
            $('#loginNav').replaceWith("<li id='logoutClick' ><a href='#'>Log Out</a></li>");
        }
    }

    if (!authService.isLoggedIn()) {
        if (window.location.href.indexOf("mygallery") > -1) {
            window.location.href = "login.html";
        }
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
    //     console.log(userData);
    // }


    $('#logoutClick').on('click', function () {
        sessionStorage.clear();
        window.location.href = "index.html";
    });

    $('#registerButton').on('click', function () {

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

    $('#loginButton').on('click', function () {
        let username = $('#username').val();
        let password = $('#password').val();

        let data = {
            username: username,
            password: password
        };
        login(data);
    });

    function latest5() {
        let recentIMGs = [];
        requester.get(baseServiceUrlIMG,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                let currentId = 1;

                for (let i = 0; i < data.length && i < 5; i++) {
                    data[i].postId = currentId;
                    currentId++;
                    recentIMGs.push(data[i]);
                }

                $('.firstURL').on('click', function () {
                    $("#homeTitle").text(recentIMGs[0].title);
                });
                $('.secondURL').on('click', function () {
                    $("#homeTitle").text(recentIMGs[1].title);
                });
                $('.thirdURL').on('click', function () {
                    $("#homeTitle").text(recentIMGs[2].title);
                });
                $('.fourthURL').on('click', function () {
                    $("#homeTitle").text(recentIMGs[3].title);
                });
                $('.fifthURL').on('click', function () {
                    $("#homeTitle").text(recentIMGs[4].title);
                });
                $(".firstURL").attr("src", recentIMGs[0].imgURL);
                $(".secondURL").attr("src", recentIMGs[1].imgURL);
                $(".thirdURL").attr("src", recentIMGs[2].imgURL);
                $(".fourthURL").attr("src", recentIMGs[3].imgURL);
                $(".fifthURL").attr("src", recentIMGs[4].imgURL);

            },
            function error(data) {
                showPopup('error', "Error loading images!");
            }
        );
    }

    function gallery() {
        let galleryIMGs = [];
        requester.get(baseServiceUrlIMG,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                let currentId = 1;

                for (let i = 0; i < data.length && i < 10; i++) {
                    data[i].postId = currentId;
                    currentId++;
                    galleryIMGs.push(data[i]);
                }

                $('#one').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[0].title);
                });
                $('#two').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[1].title);
                });
                $('#three').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[2].title);
                });
                $('#four').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[3].title);
                });
                $('#five').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[4].title);
                });
                $('#six').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[5].title);
                });
                $('#seven').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[6].title);
                });
                $('#eight').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[7].title);
                });
                $('#nine').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[8].title);
                });
                $('#ten').on('click', function () {
                    $("#homeTitle").text(galleryIMGs[9].title);
                });

                $(".one").attr("src", galleryIMGs[0].imgURL);
                $(".two").attr("src", galleryIMGs[1].imgURL);
                $(".three").attr("src", galleryIMGs[2].imgURL);
                $(".four").attr("src", galleryIMGs[3].imgURL);
                $(".five").attr("src", galleryIMGs[4].imgURL);
                $(".six").attr("src", galleryIMGs[5].imgURL);
                $(".seven").attr("src", galleryIMGs[6].imgURL);
                $(".eight").attr("src", galleryIMGs[7].imgURL);
                $(".nine").attr("src", galleryIMGs[8].imgURL);
                $(".ten").attr("src", galleryIMGs[9].imgURL);


                $("#one").attr("href", galleryIMGs[0].imgURL);
                $("#two").attr("href", galleryIMGs[1].imgURL);
                $("#three").attr("href", galleryIMGs[2].imgURL);
                $("#four").attr("href", galleryIMGs[3].imgURL);
                $("#five").attr("href", galleryIMGs[4].imgURL);
                $("#six").attr("href", galleryIMGs[5].imgURL);
                $("#seven").attr("href", galleryIMGs[6].imgURL);
                $("#eight").attr("href", galleryIMGs[7].imgURL);
                $("#nine").attr("href", galleryIMGs[8].imgURL);
                $("#ten").attr("href", galleryIMGs[9].imgURL);

                galleryCounter = galleryCounter + 10;
            },
            function error(data) {
                showPopup('error', "Error loading images!");
            }
        );
    }


    $('#loadButton').on('click', function () {

        let galleryAdd = [];
        requester.get(baseServiceUrlIMG,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                let currentId = 1;

                for (let i = galleryCounter; i < data.length && i < galleryCounter + 5; i++) {
                    data[i].postId = currentId;
                    currentId++;
                    galleryAdd.push(data[i]);
                }
                for (let i = 0; i < 5; i++) {
                    if (galleryAdd[i] == undefined) {
                        break
                    }
                    if (i == 4) {
                        $("#imgList").append('<li class="last"><a class="swap" href="' + galleryAdd[i].imgURL + '"><img class="bonus' + galleryCounter + i + ' " src="" alt="" /></a></li>');
                        let idHelper = "bonus" + galleryCounter + i;
                        $("." + idHelper).attr("src", galleryAdd[i].imgURL);
                    } else {

                        $("#imgList").append('<li><a class="swap" href="' + galleryAdd[i].imgURL + '"><img class="bonus' + galleryCounter + i + ' " src="" alt="" /></a></li>');
                        let idHelper = "bonus" + galleryCounter + i;
                        $("." + idHelper).attr("src", galleryAdd[i].imgURL);
                    }
                }
                galleryCounter = galleryCounter + 5;
            });

    });

    function myGallery() {
        let galleryIMGs = [];
        requester.get(baseServiceUrlIMG,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                let currentId = 1;

                for (let i = 0; i < data.length || i < 5; i++) {
                    if (data[i].uploader == sessionStorage.username) {
                        data[i].postId = currentId;
                        currentId++;
                        galleryIMGs.push(data[i]);
                    }
                }

                for (let i = 0; i < 5 || i < galleryIMGs.length; i++) {
                    if (galleryIMGs[i] == undefined) {
                        break
                    }
                    if ((i - 4) % 5 == 0) {
                        $("#imgList").append('<li class="last"><a class="swap" href="' + galleryIMGs[i].imgURL + '"><img class="bonus' + galleryCounter + i + ' " src="" alt="" /></a></li>');
                        let idHelper = "bonus" + galleryCounter + i;
                        $("." + idHelper).attr("src", galleryIMGs[i].imgURL);
                    } else {
                        let objHelper = JSON.stringify(galleryIMGs[i]);
                        $("#imgList").append('<li><a class="galls" href="' + galleryIMGs[i].imgURL + '"><img  class="bonus' + galleryCounter + i + ' " src="" alt="" /></a></li>');
                        let idHelper = "bonus" + galleryCounter + i;
                        // $("." + idHelper).attr("onclick","bigger(galleryIMGs[i])");
                        // $("." + idHelper).on('click', function() {
                        //     bigger(galleryIMGs[i])
                        // });
                        $("." + idHelper).attr("src", galleryIMGs[i].imgURL);
                    }
                }
            },
            function error(data) {
                showPopup('error', "Error loading images!");
            }
        );
    }

    // function bigger(data) {
    //     sessionStorage.URLs = data.imgURL;
    //     one();
    //     function one (){
    //         window.location.href = "bigger.html"
    //         two();
    //         function two (){
    //             alert(sessionStorage.URLs);
    //         }
    //     }
    //
    //         $("#biggerIMG").attr("src", sessionStorage.URLs);
    //
    // }

    function login(data) {
        let requestUrl = baseServiceUrl + "login";

        requester.post(requestUrl, data,
            function success(response) {
                showPopup('success', "You logged in super hard.");

                sessionStorage.setItem('username', response.username);
                sessionStorage.setItem('_authToken', response._kmd.authtoken);
                sessionStorage.setItem('password', response.password);
                sessionStorage.setItem('URLs', response.URLs);

                setTimeout(function () {
                    window.location.href = "../index.html";
                }, 2000);
            },
            function error(response) {
                showPopup('error', "Login Error: Bears attacked the server!");
            });
    }


    function register(requestData) {
        if (requestData.username.length < 5) {
            showPopup('error', "Username must be at least 5 characters.");
            return;
        }

        if (requestData.password.length < 6) {
            showPopup('error', "Password must be at least 6 letters.");
            return;
        }

        if (requestData.password !== requestData.confirmPassword) {
            showPopup('error', "Retype the same password please, gosh.");
            return;
        }

        delete  requestData['confirmPassword'];


        requester.post(baseServiceUrl, requestData,
            function success(data) {
                showPopup('success', "You registered like a boss.");
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 3000);
            },
            function error(data) {
                showPopup('error', "Something went 'bzzt' while trying to register.");
            });
    }

    $('#up-form').submit(function (e) {
        e.preventDefault();
        ospry.up({
            form: this,
            imageReady: function (err, metadata, i) {
                if (err === null) {
                    console.log('Image uploaded to: ' + metadata.url);
                    IMGmetadata = metadata;
                    let title = $('#title').val();
                    let imgURL = IMGmetadata.url;
                    let IMGdata = {
                        title: title,
                        imgURL: imgURL,
                        uploader: sessionStorage.username
                    };
                    requester.post(baseServiceUrlIMG, IMGdata,
                        function success(data) {
                            showPopup('success', "uploaded");
                            setTimeout(function () {
                                window.location.href = "login.html";
                            }, 3000);
                        },
                        function error(data) {
                            showPopup('error', "not uploaded");
                        });
                }
            }
        });
    });


    $('#DL').on('click', function () {
        ospry.get({
            url: "http://crafty-emu.ospry.io/x38p6ypfrnu/5bTw11L.jpg",
            format: "png",
            maxHeight: 400,
            imageReady: function (err, domImage, index) {
                if (err === null) {
                    $('body').append(domImage);
                }
            },
        });

    });

});

