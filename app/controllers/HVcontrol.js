function ViewFunc(){
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/casa/getinfo',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('x-token',sessionStorage.getItem("IDCasa"));
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){       
            let home = JSON.parse(xhr.responseText)[0]
            let user = JSON.parse(xhr.responseText)[1]
            sessionStorage.setItem("IDUser",user.ID);
            let FillInfo = home;
            const InfoHTML = `
            <div class="row">
                <div class="col-md-9">
                <h1>CASA EN VENTA</h1>
                </div>
                <div class="col-md-3">
                    <button type="button" class="btn btn-success btn-block" onclick="AddWishList()">Agregar a lista de deseos</button>
                </div>
            </div>
            <br>
            <div class="row">
            <div class="tab-content col-md-3 p-3 rounded" >
                <table class="table table-bordered table-hover">
                    <tbody>
                    <tr>
                    <td><i class="fa fa-user icon">Owner:</i> <a href="/views/user/?id=${user.ID}">${user.name}</a> </td>
                    </tr>
                    <tr>
                    <td><i class="fa fa-map-marker icon"> Ubicacion: </i> <td class="house_data" id="location">${FillInfo.location}</td></td>
                    </tr>
                    <tr>
                    <td><i class="fa fa-bath icon"> Numero de banos: </i> <td class="house_data" id="NBath">${FillInfo.NBath}</td></td>
                    </tr>
                    <tr>
                    <td><i class="fa fa-bed icon"> Numero de cuartos: </i> <td class="house_data" id="NRoom">${FillInfo.NRoom}</td></td>
                    </tr>
                    <tr>
                    <td><i class="fa fa-car icon"> Numero de carros que caben en la cochera: </i> <td class="house_data" id="NPark">${FillInfo.NPark}</td></td>
                    </tr>
                    <tr>
                    <td><i class="fa fa-dollar icon"> Precio: </i> <td class="house_data" id="price">${FillInfo.price}</td></td>
                    </tr>
                    <tr>
                    <td><i class="fa fa-home icon"> Numero de pisos: </i> <td class="house_data" id="NFloor">${FillInfo.NFloor}</td></td>
                    </tr>
                    <tr>
                    <td><h3>Descripcion</h3></td><td class="house_data" id="description">${FillInfo.description}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            
            
            <div id="edit_options">

            </div>
            <br>
            <br>`;
            document.getElementById("info_casita").innerHTML = InfoHTML;  
            document.getElementById("image").innerHTML = `<img src="${FillInfo.image}" class="w-100 d-block" alt="First slide">`;
        }
        NavBar();
        EditingHouse();
    }
    
};

function EditingHouse(){
    //console.log("estoy editando");
    if(sessionStorage.getItem("Editing") == "true"){
        //alert("Modo edicion activado");
        let mycasita = sessionStorage.getItem("IDCasa");
        let house_data = document.getElementsByClassName("house_data");
        for(let i = 0; i < house_data.length; i++){
            house_data[i].setAttribute("contenteditable","true");
        }
        document.getElementById("edit_options").innerHTML = `
        <button type="button" class="btn btn-primary btn-block" onclick="SaveEdit()">Guardar edicion</button>
        <br>
        <button type="button" class="btn btn-danger btn-block" onclick="CancelEdit()">Cancelar edicion</button>
        `;
        sessionStorage.setItem("Editing", "false");
    }
};

function SaveEdit(){
    console.log("Intento guardar cambio");
    let xhr = new XMLHttpRequest();
    xhr.open('PUT','/views/casa/user/updateHome',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('my-casita',sessionStorage.getItem("IDCasa"));
    let location = document.getElementById("location").innerText;
    let NBath = document.getElementById("NBath").innerText;
    let NRoom = document.getElementById("NRoom").innerText;
    let NPark = document.getElementById("NPark").innerText;
    let price = document.getElementById("price").innerText;
    let NFloor = document.getElementById("NFloor").innerText;
    let description = document.getElementById("description").innerText;

    let data = "{\"location\":\""+location+"\",\"NBath\":\""+NBath+"\",\"NRoom\":\""+NRoom+"\",\"NPark\":\""+NPark+"\",\"price\":\""+price+"\",\"NFloor\":\""+NFloor+"\",\"description\":\""+description+"\"}";
    //console.table(JSON.parse(data));
    xhr.send(data);
    
    alert("Informacion actualizada correctamente");
    CancelEdit();
    ViewFunc();
};

function CancelEdit(){
    let house_data = document.getElementsByClassName("house_data");
    for(let i = 0; i < house_data.length; i++){
        house_data[i].setAttribute("contenteditable","false");
    }
    document.getElementById("edit_options").innerHTML = ``;
    ViewFunc();
}

function AddWishList(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/user/addtowishlist',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('my-casita',sessionStorage.getItem("IDCasa"));
    xhr.setRequestHeader('my-user',sessionStorage.getItem("UserValidation"));
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){
            alert("Casa agregada a lista de deseos");
        }
        else{
            alert("Error al agregar a lista de deseos");
        }
    }
    ViewFunc();
}