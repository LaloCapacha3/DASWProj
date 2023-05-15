function SelectVivienda(option){ 
    var dropdown=document.getElementById("vivienda");
    dropdown.innerHTML=option.innerHTML
    sessionStorage.setItem("TipoViv",option.innerHTML);
}

function SelectPrecio(option){ 
    var dropdown=document.getElementById("Precio") 
    dropdown.innerHTML=option.innerHTML;
    if(option.innerHTML == 2000000){
        sessionStorage.setItem("PrecioFil",0);
    }else if(option.innerHTML == 2000001){
        sessionStorage.setItem("PrecioFil",1);
    }
    //sessionStorage.setItem("PrecioFil",option.innerHTML);
}

function SelectPisos(option){ 
    var dropdown=document.getElementById("NPisos") 
    dropdown.innerHTML=option.innerHTML;
    sessionStorage.setItem("PisoFil",option.innerHTML);
}


function busqueda_session(){
    //console.log("entro busq ss")
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/casa/findbyloc',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('my-location',document.querySelector('input[placeholder="Buscar Casas"]').value);
    xhr.setRequestHeader('my-vivienda',sessionStorage.getItem("TipoViv"));
    xhr.setRequestHeader('my-precio',sessionStorage.getItem("PrecioFil"));
    xhr.setRequestHeader('my-pisos',sessionStorage.getItem("PisoFil"));
    xhr.send();
    xhr.onload = function(){
        let MisLocaCasas = JSON.parse(xhr.responseText);
        let Locasas = " ";
        for(const Lcasa of MisLocaCasas){            
            const LcasasHTML = `<div class="d-block col-lg-3 d-block col-md-4 d-block col-sm-6 col-8">
                                    <img class="card-img-top fotos" src="${Lcasa.image}"  alt="Hola insertado">
                                    <div class="card-body" style="text-align: center;">
                                        <h4 class="card-title">Casa en venta</h4> 
                                        <p class="card-text">Ubicacion: ${Lcasa.location}</p> 
                                        <p class="card-text"></p>
                                        <a href="../views/casa/?id=${Lcasa.ID}" onclick="saveID('${Lcasa.ID}')" class="btn btn-warning">Visitar Casa</a>  
                                    </div>
                                </div>`;
            Locasas = Locasas + LcasasHTML;
            console.log(Locasas);
            
        } 
        document.getElementById("results_search").innerHTML = Locasas; 
        console.log(MisLocaCasas);
        /*sessionStorage.removeItem("TipoViv");
        sessionStorage.removeItem("PrecioFil");
        sessionStorage.removeItem("PisoFil");*/
    }
};
