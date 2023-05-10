

function register(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/user/register',true);
    xhr.setRequestHeader('Content-Type','application/json');
    if(document.getElementById("comprador").checked){
        console.log("Comprador");
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let description = document.getElementById("description").value;
        let date = document.getElementById("date").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let country = document.getElementById("country").value;
        let phone = document.getElementById("phone").value;
        let data = "{\"name\":\""+name+"\",\"email\":\""+email+"\",\"password\":\""+password+"\",\"description\":\""+description+"\",\"birthdate\":\""+date+"\",\"city\":\""+city+"\",\"state\":\""+state+"\",\"country\":\""+country+"\",\"phone\":\""+phone+"\",\"UserType\":\"comprador\"}";
        console.table(JSON.parse(data));
        xhr.send(data);
    }
    else if(document.getElementById("vendedor").checked){
        console.log("Vendedor");
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let description = document.getElementById("description").value;
        let date = document.getElementById("date").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let country = document.getElementById("country").value;
        let phone = document.getElementById("phone").value;
        let data = "{\"name\":\""+name+"\",\"email\":\""+email+"\",\"password\":\""+password+"\",\"description\":\""+description+"\",\"birthdate\":\""+date+"\",\"city\":\""+city+"\",\"state\":\""+state+"\",\"country\":\""+country+"\",\"phone\":\""+phone+"\",\"UserType\":\"vendedor\"}";
        console.table(JSON.parse(data));
        xhr.send(data);
    }

    xhr.onload = function(){
        if(xhr.status == 200){
            alert("Usuario registrado correctamente");
            window.location.href = "http://localhost:3000/home";
        }
        else{
            alert("Error al registrar usuario");
        }
    }


};