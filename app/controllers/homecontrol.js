function FillHouses(){
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/houseinfo',true);
    xhr.send();
    xhr.onload = function(){
        let casas = document.getElementById("llenar_de_casas");
    
        if(xhr.status == 200){
            let casasInfo = JSON.parse(xhr.responseText);
            let allCasas = "";
            for(const casa of casasInfo){
                const casasHTML = `<div class="d-block col-lg-3 d-block col-md-4 d-block col-sm-6 col-8">
                                        <img class="card-img-top fotos" src="${casa.image}"  alt="Hola insertado">
                                        <div class="card-body" style="text-align: center;">
                                            <h4 class="card-title">Casa en venta</h4> 
                                            <p class="card-text">Ubicacion: ${casa.location}</p> 
                                            <p class="card-text"></p>
                                            <a href="../views/casa/?id=${casa.ID}" onclick="saveID('${casa.ID}')" class="btn btn-warning">Visitar Casa</a>  
                                        </div>
                                    </div>`;
                allCasas = allCasas + casasHTML;
                console.log("Lleno html")
                console.log(allCasas);
                casas.innerHTML=allCasas; 
            } 
        }
        NavBar();
    }
};

function saveID(ID){
    sessionStorage.setItem("IDCasa",ID);
    console.log("subo id");
}