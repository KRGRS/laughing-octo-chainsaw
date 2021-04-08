var submitButton; 

window.onload = function(){
    submitButton = document.getElementById("submit");
    submitButton.addEventListener('click', perfomPostRequest); 
}

function perfomPostRequest(){
    $.ajax({
        url: "../../app.js",
        data:{
            username: document.getElementById("username").value,
            password: document.getElementById("password").value 
        },
        type: "POST" ,
        dataType: "json" 
    }).fail(function(err){
        console.log("There was an error"); 
    })
}
