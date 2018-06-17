$(function () {

    Parse.$ = jQuery;
    Parse.serverURL = "https://pg-app-87e2afuylh07dcx9yvl4lp0ludceiy.scalabl.cloud/1/";
    Parse.initialize(
        "H0c8Nc9VB629EZp1hWypOUdISnpepF76kkiMCP9j",
        "jPsorL0c2TSoUXS65zE6ygO1ke7eaPpjFkCJUSpE"
      );
    Parse.User.enableUnsafeCurrentUser()
    var currentUser = Parse.User.current();
    if (currentUser) {
        console.log('current');
    } else {
        console.log('not');
    }
    username = Parse.User.current().get("username");
    document.getElementById("username").innerText = username;

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
    document.getElementById("logout").style.marginRight = "50px";
    document.getElementById("search").style.marginRight = "60px";

    // document.getElementById("search").addEventListener("change", function() {
    //     console.log("search changed");
    // });
    // function alert(){
    //     alert("gggggg");
    // }


    // $('html').click(function(){
    // 	$('#search_advice_wrapper').hide();
    // });

    // $('.advice_variant').live('click',function(){
    // 	// ставим текст в input поиска
    // 	$('#search_box').val($(this).text());
    // 	// прячем слой подсказки
    // 	$('#search_advice_wrapper').fadeOut(350).html('');
    // });

    // если кликаем в любом месте сайта, нужно спрятать подсказку

    document.getElementById("search").onclick = function () {
        //console.log("click");
        document.getElementById("search_advice_wrapper").style.visibility = 'visible';
    }

    document.getElementById("search").oninput = function () {

        $("#search_advice_wrapper").html("").show();
        append_advice()
    }


    function append_advice() {
        //document.getElementById("search_advice_wrapper").style.visibility = 'visible'; 
        entered_text = document.getElementById("search").value;
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
                            document.getElementById("search").value = text;
                            console.log("ckick" + text);
                            //reg = null;

                            document.getElementById("search_advice_wrapper").style.visibility = 'hidden';
                            $("#search_advice_wrapper").html("").show();


                        }


                    }

                }

            });

        }



        // for (i=0;i< tst_arr.length;i++){
        //     if (tst_arr[i].match( reg ) != null){
        //         $('#search_advice_wrapper').append('<div class="">'+tst_arr[i]+'</div>');
        //     }

        // }

    }


    // starts new chat with recipient entered in "search" input
    document.getElementById("new_dialog").onclick = function (params) {
        var usr = document.getElementById("search").value;
        if (usr != "") {

            //console.log("usr - " + usr);
            window.location.href = "chat.html?Recipient=" + usr;
        }
    }


    // document.getElementById("new_dialog").onclick = function () {
    //     //console.log("click working");
    //     window.location.href = "chat.html";
    // }
    // var anotherQuery = new Parse.Query(img);
    // anotherQuery.equalTo("username", username);
    // anotherQuery.find({
    //     success: function (msg) {
    //         var file = msg[0].get("avatar");
    //         document.getElementById("user_image").src = file.url();
    //     }
    // });

    //document.getElementById("user_image").src = img;



    function logout() {
        //alert("logout working");
        window.location.href = "login.html";
        console.log("logout");

        Parse.User.logOut().then(() => {
            var currentUser = Parse.User.current();  // this will now be null

        });

    }

    document.getElementById('logout').onclick = logout;


    // var btn = document.createElement("BUTTON");        // Create a <button> element
    // var t = document.createTextNode("CLICK ME");       // Create a text node
    // btn.appendChild(t);        
    // btn.onclick = function(){
    //     console.log("logout");
    // }                       // Append the text to <button>
    // document.body.appendChild(btn); 

    function create_dialogs(final_dict) {
        var iterator = Object.keys(final_dict);
        var articleDiv = document.querySelector("ul.shoutbox-content");
        articleDiv.innerHTML = "";
        for (let k = 0; k < iterator.length; k++) {

            var p = document.createElement("p");
            p.className = "shoutbox-comment";
            //Здесь будет цикл, но его пока нету:)
            var li = document.createElement("li");
            var span = document.createElement("span")
            span.className = "shoutbox-username";
            li.className = "liClass";
            li.onclick = function () {
                window.location.href = "chat.html?Recipient=" + iterator[k];
            }
            var liText = document.createTextNode('Dialog with:    ' + iterator[k]);
            span.appendChild(liText);
            var br = document.createElement("br");
            span.appendChild(br);
            var fromUserText = document.createTextNode(final_dict[iterator[k]][2] + ': ');
            p.appendChild(fromUserText);
            var pText = document.createTextNode(final_dict[iterator[k]][0]);
            p.appendChild(pText);
            var spanDate = document.createElement("span");
            spanDate.className = "shoutbox-comment-ago";
            var options = {
                year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };
            var tme = final_dict[iterator[k]][1]
            var dateText = document.createTextNode(tme.toLocaleTimeString("en-us", options));
            spanDate.appendChild(dateText);
            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(spanDate);
            articleDiv.appendChild(li);
        }

    }

    function getAllChats() {
        console.log("getAllChats started");
        var final_dict = {};
        var UserName_dict = new Object();
        var ToUser_dict = new Object();

        var Chat = Parse.Object.extend("Chat");
        var dateQuery = new Parse.Query(Chat);
        dateQuery.equalTo("sender", username);

        dateQuery.find({

            success: function (UserName1) {

                UserName_dict = new Object();
                for (let i = 0; i < UserName1.length; i++) {
                    var arr = [UserName1[i].get('Messages'), UserName1[i].get('createdAt'), UserName1[i].get('sender')];
                    UserName_dict[UserName1[i].get('recipient')] = arr;
                }
                dateQuery = new Parse.Query(Chat);
                dateQuery.equalTo("recipient", username);
                dateQuery.find({
                    success: function (ToUser) {
                        for (let i = 0; i < ToUser.length; i++) {
                            var arr = [ToUser[i].get('Messages'), ToUser[i].get('createdAt'), ToUser[i].get('sender')];
                            ToUser_dict[ToUser[i].get('sender')] = arr;
                        }
                        
                        keys1 = Object.keys(UserName_dict);
                        keys2 = Object.keys(ToUser_dict);
                        
                        if (keys1.length > keys2.length) {
                            
                            for (let i = 0; i < keys1.length; i++) {

                                var check = false
                                if (ToUser_dict[keys1[i]] == undefined) {
                                    final_dict[keys1[i]] = UserName_dict[keys1[i]];
                                    check = true;
                                }
                                if (check == false && UserName_dict[keys1[i]][1] > ToUser_dict[keys1[i]][1]) {
                                    final_dict[keys1[i]] = UserName_dict[keys1[i]];
                                }
                                else if (check == false) {
                                    final_dict[keys1[i]] = ToUser_dict[keys1[i]];
                                }
                            }
                            create_dialogs(final_dict);
                        }
                        else {
                            for (let i = 0; i < keys2.length; i++) {
                                var check = false
                                if (UserName_dict[keys2[i]] == undefined) {

                                    final_dict[keys2[i]] = ToUser_dict[keys2[i]];                                  
                                    check = true;
                                }

                                if (check == false && UserName_dict[keys2[i]][1] > ToUser_dict[keys2[i]][1]) {

                                    final_dict[keys2[i]] = UserName_dict[keys2[i]];
                                }
                                else if (check == false) {
                                    final_dict[keys2[i]] = ToUser_dict[keys2[i]];
                                }
                            }
                            create_dialogs(final_dict);
                        }
                    }
                })
            }
        })
    }
// выставляем обновление диалогов раз в минуту
    function interval() {
        setInterval(
            getAllChats
            , 60000);






        // var mod = document.querySelectorAll('.liClass');
        // for (let index = 0; index < mod.length; index++) {
        //     mod[index].addEventListener('click', function () {
        //         console.log("dfsdf");
        //         //window.location.href = "chat.html?User=" + msgArray[index].get("ToUser");
        //     });
        // }

        //var ul = document.getElementById("chat-container");
        // var li = document.createElement("li");
        // li.innerText = "Created element by js";
        // ul.appendChild(li);

        // ul.append('<li>' +
        //     '<span class="shoutbox-username">' + Parse.User.current().get("username") + '</span>' +
        //     '<p class="shoutbox-comment">' + "comment to add" + '</p>' +
        //     '<div class="shoutbox-comment-details"><span class="shoutbox-comment-reply" data-name="' + "Another Name " + '">REPLY</span>' +
        //     '<span class="shoutbox-comment-ago">' + "Date here" + '</span></div>' +
        //     '</li>');
    }
    getAllChats();

    interval();

    //Пример добавления и получения данных
    // var Chat = Parse.Object.extend("Chat");
    // var chat = new Chat();
    // chat.set("LastMessage", "Some message here");
    // chat.set("UserID", currentUser.id);
    // console.log(currentUser.id);
    // chat.set("UserName", currentUser.get("username"));
    // chat.save(null,{
    //     success: function(chat){
    //         var query = new Parse.Query(Chat);
    //         query.equalTo("UserID", currentUser.id);
    //         query.find({
    //             success:function (usersChat) {
    //                console.log(usersChat);
    //             }
    //         });
    //     }
    // });
});