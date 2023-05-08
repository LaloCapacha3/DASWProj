

function registro(TipoDeUsuario){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/users/register',true);
    xhr.setRequestHeader('Content-Type','application/json');
    if(TipoDeUsuario == 'Vendedor'){
        console.log("Vendedor");
        let name = document.getElementById("NombreVendedor").value;
        let email = document.getElementById("CorreoVendedor").value;
        let password = document.getElementById("PasswordVendedor").value;
        let Descripcion = document.getElementById("DescripcionVendedor").value;
        let Fecha = document.getElementById("FechaVendedor").value;
        let Imagen = document.getElementById("ImagenVendedor").value;
        let Ciudad = document.getElementById("CiudadVendedor").value;
        let Estado = document.getElementById("EstadoVendedor").value;
        let Pais = document.getElementById("PaisVendedor").value;
        let Telefono = document.getElementById("TelefonoVendedor").value;
        let data = "{\"name\":\""+name+"\",\"email\":\""+email+"\",\"password\":\""+password+"\",\"description\":\""+Descripcion+"\",\"birthdate\":\""+Fecha+"\",\"image\":\""+Imagen+"\",\"city\":\""+Ciudad+"\",\"state\":\""+Estado+"\",\"country\":\""+Pais+"\",\"phone\":\""+Telefono+"\"}";
        console.table(JSON.parse(data));
        xhr.send(data);
    }
    else if(TipoDeUsuario == 'Comprador'){
        console.log("Comprador");
        let name = document.getElementById("NombreComprador").value;
        let email = document.getElementById("CorreoComprador").value;
        let password = document.getElementById("PasswordComprador").value;
        let Fecha = document.getElementById("FechaComprador").value;
        let Imagen = document.getElementById("ImagenComprador").value;
        let Ciudad = document.getElementById("CiudadComprador").value;
        let Estado = document.getElementById("EstadoComprador").value;
        let Pais = document.getElementById("PaisComprador").value;
        let Telefono = document.getElementById("TelefonoComprador").value;
        let data = "{\"name\":\""+name+"\",\"email\":\""+email+"\",\"password\":\""+password+"\",\"birthdate\":\""+Fecha+"\",\"image\":\""+Imagen+"\",\"city\":\""+Ciudad+"\",\"state\":\""+Estado+"\",\"country\":\""+Pais+"\",\"phone\":\""+Telefono+"\"}";
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