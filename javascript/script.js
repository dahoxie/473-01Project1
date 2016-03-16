$(document).ready(function(){
    $.ajax({
        url: "http://localhost:3000/posts",
        dataType: "json",
        type: "GET",
        cache: false,
        success: function(data){
            $(data).each(function(index, value){
                if(value.approved == false) {
                    displayName(index,value.content,value.user,value.date,value.votes);
                }
            });
        }
    });
});
$(".tweetPost").on("click", function(){
    var tweet = $("#userTweet").val().toString();
    var data = {
        content: tweet,
        user: getUser(),
        date: getDate(),
        votes: 0,
        approved: false,
    };
    $.ajax({
        url: "http://localhost:3000/posts",
        type: "POST",
        data: data,
        success: function(newData){
            displayName(newData.id,newData.content,newData.user, newData.date, newData.votes);
        },
        error: function(){
            console.log("Error posting data");
        }
    });

});

function displayName(id, tweet, user, date, votes){
    var post = "<div class=\"post-preview\"> <h2 class=\"post-title\">"+tweet+" </h2> <p class=\"post-meta\">" +
        "Posted by <a href=\"#\">"+user+"</a> on "+date+"</p> <div class=\"btn-group btn-group-sm upDown\" " +
        "data-toggle=\"buttons\"> <label class=\"btn btn-default\"> <input type=\"radio\" autocomplete=\"off\"> " +
    "<span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span>"+votes+" </label> <label class=\"btn btn-default\"> " +
    "<input type=\"radio\" autocomplete=\"off\"><span class=\"glyphicon glyphicon-thumbs-down\" aria-hidden=\"true\"></span>" +
    "21 </label> </div> </div> <hr>";
    console.log(post);
    $("#posts").append(post);
}

function getUser(){
    var user = "demo";
    return user;
}
function getDate(){
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = GetMonthName(month)+ " "+day+", "+ d.getFullYear();
    return output;
}

function GetMonthName(monthNumber) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1];
}

