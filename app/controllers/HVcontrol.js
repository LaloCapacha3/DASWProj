function ViewFunc(){
    console.log("Entro a la funcion");
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/casa/getinfo',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('x-token',sessionStorage.getItem("IDCasa"));
    console.log("Enviando")
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){       
            let home = JSON.parse(xhr.responseText)[0]
            let user = JSON.parse(xhr.responseText)[1]
            console.log("user" + user);
            sessionStorage.setItem("IDUser",user.ID);
            let FillInfo = home;
            const InfoHTML = `
            <div class="row">
                <h1>CASA EN VENTA</h1>
            </div>
            <br>
            <div class="row">
                <div class="col">
                    <i class="fa fa-user icon"></i> <a href="/views/user/?id=${user.ID}">${user.name}</a> 
                </div>
                <div class="col">
                    <i class="fa fa-map-marker icon"></i> <td class="house_data" id="location">Ubicacion: ${FillInfo.location}</td>
                </div>
                <div class="col">
                    <i class="fa fa-bath icon"></i> <td class="house_data" id="NBath">${FillInfo.NBath}</td>
                </div>
                <div class="col">
                    <i class="fa fa-bed icon"></i> <td class="house_data" id="NRoom">${FillInfo.NRoom}</td>
                </div>
                <div class="col">
                    <i class="fa fa-car icon"></i> <td class="house_data" id="NPark">${FillInfo.NPark}</td>
                </div>
                <div class="col">
                    <i class="fa fa-dollar icon"></i> <td class="house_data" id="price">${FillInfo.price}</td>
                </div>
                <div class="col">
                    <i class="fa fa-home icon"></i> <td class="house_data" id="NFloor">${FillInfo.NFloor}pisos</td>
                </div>
            </div>
            <br><br>
            <div class="row">
                <h3>Descripcion</h3>
                <p><td class="house_data" id="description">${FillInfo.description}</td></p>
            </div>
            <div id="edit_options">
            </div>
            <br>
            <br>`;
            console.log("Termine la funcion");
            document.getElementById("info_casita").innerHTML = InfoHTML;  
            document.getElementById("image").innerHTML = `<img src="${FillInfo.image}" class="w-100 d-block" alt="First slide">`;
        }
        NavBar();
    }
    
};