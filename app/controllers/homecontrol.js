function FillHouses(){
    console.log("Entro fillhouse");
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/houseinfo',true);
    xhr.send();
    xhr.onload = function(){
        //let casas = document.getElementById("llenar_de_casas");
        if(xhr.status == 200){
            let casasInfo = JSON.parse(xhr.responseText);
            let N_botones=Math.ceil(casasInfo.length/4)
            console.log("Tenemos que hacer"+N_botones+"botones")
            CreateBotones(N_botones);         
        }
        NavBar();
    }
};

function saveID(ID){
    sessionStorage.setItem("IDCasa",ID);
    console.log("subo id");
    setTimeout(() => {   
        }, 3000);
}

function crear_casa (casas){
    let allCasas=" ";
    for(const casa of casas){            
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
        console.log("Lleno html pagina 1")
        console.log(allCasas);
        document.getElementById("llenar_de_casas").innerHTML=allCasas; 
    } 
}

function UpdateBoton (N_boton){
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/houseinfo',true);
    xhr.send();
    xhr.onload = function(){
        let MisCasas = JSON.parse(xhr.responseText);
        //let n = Math.ceil(MisCasas/4),x=1;

        /*while(x <= n){
            document.getElementById("Boton"+x).className.remove("active");
            x++;
        }*/
        const startIndex = (N_boton - 1) * 4;
        const endIndex = startIndex + 4;
        MisCasas=MisCasas.slice(startIndex,endIndex);
        //document.getElementById("Boton"+N_boton).className = "btn btn-outline-warning active";
        crear_casa(MisCasas);
    };
}


function CreateBotones(NBot){
    let allBotones = "";
    let ButtonNumber = 1;
    while(ButtonNumber<NBot){
        const botonN = `
        <li class="page-item"><button type="button" class="btn btn-outline-warning"  id="Boton${ButtonNumber}" onclick="UpdateBoton('${ButtonNumber}')">${ButtonNumber}</button></li>
        `;
        allBotones = allBotones + botonN;
        ButtonNumber++;
    }
    document.getElementById("mis_botones").innerHTML = allBotones;
}