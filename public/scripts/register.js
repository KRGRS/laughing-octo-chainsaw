var usernameField, emailField, passwordField, passwordreField, button; 

window.onload = function(){
    usernameField = document.getElementById("username");
    emailField = document.getElementById("email");  
    passwordField = document.getElementsByName("password")[0]; 
    passwordreField = document.getElementsByName("passwordre")[0]; 
    button = document.querySelector('[type="submit"]'); 

    usernameField.addEventListener('input', checkUsername);
    emailField.addEventListener('input', checkEmail); 
    passwordField.addEventListener('input', checkPassword); 
    button.addEventListener('click', checkAllStates); 
}

function checkUsername() {
    var Ausername = usernameField.value;

    if(Ausername !== null){

    $.ajax({
        url: "/usernameCheck",

        data: {
            username: Ausername
        },

        type: "POST",

        dataType: "json"
    }).done(function (json) {
        if (json) {
            usernameField.style.borderColor = "green";
        } else {
            usernameField.style.borderColor = "red";
        }
    }).fail(function (xhr, status, error) {
        console.log("Sorry, there was a problem!");
        console.log(error);
    }).always(function (xhr, status) {
        console.log("the request is complete!");
    });
    }; 
}

function checkEmail(){
    var value = emailField.value; 

    if(value.match(/(\d|[a-zA-Z])+@[a-zA-Z]+\.[a-zA-Z]{2,3}/gi)){
        emailField.style.borderColor = "green"; 
    }else{
        emailField.style.borderColor = "red"; 
    }
}

function checkPassword(){
    if(passwordField.value !== passwordreField.value){
        passwordField.style.borderColor = "red"; 
        passwordreField.style.borderColor = "red"; 
    }else{
        passwordField.style.borderColor = "green"; 
        passwordreField.style.borderColor = "green"; 
    }
}

function checkAllStates(){
    if(usernameField.style.borderColor == "green" && passwordField.style.borderColor == "green" && emailField.style.borderColor == "green"){
        $.ajax({
            url:"/registerUser",
            data:{
                username: usernameField.value,
                password: passwordField.value,
                passwordre: passwordreField.value,
                email: emailField.value
            }, 
            type:"POST",
            dataType:"json"
        }).fail(function(xhr, status){
            console.log("There was a problem sorry...."); 
        }); 
    }
}

