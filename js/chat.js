



Parse.$ = jQuery;
Parse.serverURL = "https://pg-app-87e2afuylh07dcx9yvl4lp0ludceiy.scalabl.cloud/1/";
Parse.initialize(
    "H0c8Nc9VB629EZp1hWypOUdISnpepF76kkiMCP9j",
    "jPsorL0c2TSoUXS65zE6ygO1ke7eaPpjFkCJUSpE"
);



function parseUrlQuery() {



    var data = {};
    if (location.search) {
        var pair = (location.search.substr(1)).split('&');
        for (var i = 0; i < pair.length; i++) {
            var param = pair[i].split('=');
            data[param[0]] = param[1];
        }
    }
    return data;
}

document.getElementById("recipient_input").oninput = function () {


    $("#search_advice_wrapper").html("").show();
    append_advice()
}

function append_advice() {

    entered_text = document.getElementById("recipient_input").value;
    if (entered_text.length > 0) {
        var reg = new RegExp(entered_text, "i")
        var Users = Parse.Object.extend("User");
        var dateQuery = new Parse.Query(Users);
        console.log("append_advice");
        dateQuery.find({
            success: function (usr) {
                console.log("append_advice searched sth usr.length - " + usr.length);
                for (let i = 0; i < usr.length; i++) {
                    console.log("usr[i] - " + usr[i]);
                    var uName = usr[i].get("username");
                    console.log("uName - " + uName);
                    if (uName.match(reg) != null) {
                        $('#search_advice_wrapper').append('<div class="advice_variant">' + uName + '</div>');
                    }
                }
                var elems = document.getElementsByClassName("advice_variant");
                console.log("elems - " + elems + " elems.length " + elems.length);
                for (i = 0; i < elems.length; i++) {
                    elems[i].onclick = function () {
                        text = this.innerText;
                        document.getElementById("recipient_input").value = text;
                        console.log("ckick" + text);
                        document.getElementById("search_advice_wrapper").style.visibility = 'hidden';
                        $("#search_advice_wrapper").html("").show();
                    }
                }
            }
        });
    }
}




var sender = Parse.User.current().get("username");
var recipient = parseUrlQuery()['Recipient'];
var msgBuffer = 0;


console.log("Current user: " + sender + "\nRecipient: " + recipient);




var query = new Parse.Query(Parse.User);
query.equalTo("username", recipient);  // find user
query.find({
    success: function (checked_usr) {

        if (checked_usr.length != 0) {
            //recipient = text;
            document.getElementById("recipient").innerText = recipient;
            //document.getElementById("recipient_input").value = "";
            //recipient = text;
            //document.getElementById("recipient").innerText = recipient;
        }
        else {
            alert("такого пользователя не существует");
        }
    },
    error: function (error) {

        console.log("Error: " + error.code + " " + error.message);
    }
});



document.getElementById("sender").innerText = sender;
//document.getElementById("recipient").innerText = recipient;


document.getElementById("to_main").onclick = function () {
    console.log("click working");
    window.location.href = "main.html"
}

var img = Parse.User.current().get("avatar");
console.log("img - " + img);
if (img != undefined) {
    document.getElementById("user_image").src = img.url();
}
document.getElementById("user_image").style.height = "68px";
document.getElementById("user_image").style.width = "68px";
document.getElementById("user_image").style.marginRight = "470px";
document.getElementById("user_image").style.marginTop = "1px";
document.getElementById("user_image").style.zIndex = 2;


document.getElementById("add_recipient").onclick = confirm_recipient;

function confirm_recipient() {
    var text = document.getElementById("recipient_input").value;
    if (text != "") {

        //var check_user = Parse.Object.extend("User");
        //console.log(check_user);

        //var dateQuery = new Parse.Query(check_user);
        //var dateQuery = new Parse.User.

        var query = new Parse.Query(Parse.User);
        query.equalTo("username", text);  // find all the women
        query.find({
            success: function (checked_usr) {
                //console.log("women.length" + women.length);
                if (checked_usr.length != 0) {
                    recipient = text;
                    document.getElementById("recipient").innerText = recipient;
                    document.getElementById("recipient_input").value = "";
                    recipient = text;
                    document.getElementById("recipient").innerText = recipient;
                }
                else {
                    alert("такого пользователя не существует");
                }
            },
            error: function (error) {

                console.log("Error: " + error.code + " " + error.message);
            }
        });


    }

}




//Отправка нового сообщения
document.getElementById("msg_send").onclick = function () {
    var text = document.getElementById("msg_text").value;
    if (text != "") {
        //Отправка
        var Chat = Parse.Object.extend("Chat");
        var new_message = new Chat();

        var fileUploadControl = $("#profilePhotoFileUpload")[0];
        if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
            var name = "photo.jpg";

            var parseFile = new Parse.File(name, file);
            new_message.set('file', parseFile);
            console.log('file loaded');
        }

        new_message.set('sender', sender);
        new_message.set('recipient', recipient);
        new_message.set('Messages', text);
        new_message.save();
        document.getElementById("profilePhotoFileUpload").value = "";


        document.getElementById("msg_text").value = "";
        


    }
    else {
        alert("Enter your message");
    }
}

function get_messages() {
    console.log('interval working')
    var Chat = Parse.Object.extend("Chat");
    var query = new Parse.Query(Chat);
    query.containedIn('sender', [sender, recipient]);
    query.containedIn('recipient', [sender, recipient]);
    //query.equalTo("UserName", sender);
    //query.equalTo("ToUser", toUser);

    var articleDiv = document.querySelector("ul.shoutbox-content");

    query.find({
        success: function (msg) {
            //var array = msg[0].get("Messages");
            //if (array.length != msgBuffer) {

            if (msg.length != msgBuffer) {
                console.log("msg.length" + msg.length)

                for (let i = msgBuffer; i < msg.length; i++) {
                    var text = msg[i].get('Messages');
                    var author = msg[i].get('sender');
                    var date = msg[i].get('createdAt');
                    var file = msg[i].get('file');

                    var p = document.createElement("p");
                    p.className = "shoutbox-comment";

                    var li = document.createElement("li");
                    var span = document.createElement("span")
                    span.className = "shoutbox-username";
                    li.className = "liClass";
                    li.onclick = function () {
                        console.log("clisdfck li");
                        //Доделать ответ по клику
                        //window.location.href = "chat.html?ToUser=" + msg[i].get("ToUser");
                    }
                    var liText = document.createTextNode(author);
                    span.appendChild(liText);
                    var pText = document.createTextNode(text);
                    p.appendChild(pText);

                    var spanDate = document.createElement("span");
                    spanDate.className = "shoutbox-comment-ago";

                    var options = {
                        year: "numeric", month: "short",
                        day: "numeric", hour: "2-digit", minute: "2-digit"
                    };

                    var dateText = document.createTextNode(date.toLocaleTimeString("en-us", options));
                    spanDate.appendChild(dateText);

                    
                    var br = document.createElement("br");



                    li.appendChild(span);
                    li.appendChild(p);
                    li.appendChild(spanDate);
                    li.appendChild(br);

                    var filePlace = document.createElement("img");
                    if (file != undefined){
                        filePlace.src = file.url();
                        filePlace.style.height = "68px";
                        filePlace.style.width = "68px";

                        li.appendChild(filePlace);
                        filePlace.onclick = function(){
                            var file = msg[i].get('file');
                            console.log(file);
                            document.getElementById('bigger_image').src = file.url();
                            document.getElementById('win').removeAttribute('style');
                        }

                    }

                    articleDiv.appendChild(li);
                }
                msgBuffer = msg.length;
            }
            //console.log(array.length);
        }
    })
}


//обновляем список сообщений раз в 5 секунд

function interval() {
    setInterval(get_messages, 1500);
}



get_messages()
interval();

// $('.msg_form').on('submit', function (e) {


//     console.log("форма работает");







//     var data = $(this).serializeArray(),
//         message = data[0].value;



// });




