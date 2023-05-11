function registerHome(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/views/casa/user/AddHome',true);
    xhr.setRequestHeader('Content-Type','application/json');

    const owner = "Si";
    const size = document.querySelector('input[placeholder="Tamaño de la casa"]').value;
    const type = document.querySelector('input[placeholder="Tipo(Departamento/Casa)"]').value;
    const price = document.querySelector('input[placeholder="Precio en MXN"]').value;
    const description = document.querySelector('input[placeholder="Descripcion de la casa"]').value;
    const location = document.querySelector('input[placeholder="Ubicacion de la casa"]').value;
    const NRoom = document.querySelector('input[placeholder="Numero de habitaciones"]').value;
    const NBath = document.querySelector('input[placeholder="Numero de baños"]').value;
    const NFloor = document.querySelector('input[placeholder="Numero de pisos"]').value;
    const NPark = document.querySelector('input[placeholder="Numero de estacionamientos"]').value;
    const CYear = document.querySelector('input[placeholder="Año de construccion"]').value;


    if(owner == undefined || size == undefined || type == undefined || price == undefined || description == undefined || location == undefined || NRoom == undefined || NBath == undefined || NFloor == undefined || NPark == undefined || CYear == undefined){
        alert("Debe llenar todos los campos");
        return;
    }
    else if(owner == "" || size == "" || type == "" || price == "" || description == "" || location == "" || NRoom == "" || NBath == "" || NFloor == "" || NPark == "" || CYear == ""){
        alert("Debe llenar todos los campos");
        return;
    }
    else{
        let data = "{\"owner\":\""+owner+"\",\"size\":\""+size+"\",\"type\":\""+type+"\",\"price\":\""+price+"\",\"description\":\""+description+"\",\"location\":\""+location+"\",\"NRoom\":\""+NRoom+"\",\"NBath\":\""+NBath+"\",\"NFloor\":\""+NFloor+"\",\"NPark\":\""+NPark+"\",\"CYear\":\""+CYear+"\"}";
        console.table(JSON.parse(data));
        xhr.send(data);
        
        xhr.onload = function(){
            if(xhr.status == 200){
                alert("Casa agregada correctamente");
                window.location.href = "http://localhost:3000/home";
            }
        }
    }
};
