$(function () {
    //alert("shf,jnftn");
    Parse.$ = jQuery;
    Parse.serverURL = "https://pg-app-87e2afuylh07dcx9yvl4lp0ludceiy.scalabl.cloud/1/";
    Parse.initialize(
        "H0c8Nc9VB629EZp1hWypOUdISnpepF76kkiMCP9j",
        "jPsorL0c2TSoUXS65zE6ygO1ke7eaPpjFkCJUSpE"
    );


    document.getElementById("registration").onclick = function () {
        var username = document.getElementById("usr").value;
        var pass = document.getElementById("pass").value;

        var Users = Parse.Object.extend("User");
        var user = new Users();
        user.set("username", username);
        user.set("password", pass);
        user.save(null, {
            success: function (user) {
                alert("Успешная регистрация");
            },
            error: function (user, error) {
                alert("Такой пользователь уже существует");
            }
        });
    }




    $('.form-signin').on('submit', function (e) {

        // Prevent Default Submit Event
        e.preventDefault();

        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;

        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function (user) {
                window.location.href = "main.html";
                alert('Вы зашли как: ' + username);
            },
            // If there is an error
            error: function (user, error) {
                console.log(error);
            }
        });
    });

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            testAPI();
        } else {
            // The person is not logged into your app or we are unable to tell.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '207240640081660',
            cookie: true,  // enable cookies to allow the server to access 
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.8
        });

        // Now that we've initialized the JavaScript SDK, we call 
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });

    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!' + response;
            if (response.name != undefined) {
                document.getElementById('usr').value = response.name;
                alert("Enter your password");
            }

        });
    }


});