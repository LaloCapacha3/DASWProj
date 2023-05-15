
function SearchLoad(){
    xhr = new XMLHttpRequest();
    let results_search = document.getElementById("results_search");
    let WishList = sessionStorage.getItem("WishList");
    if(WishList == "true"){
        xhr.open('GET','/views/casa/findbywishlist',true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.setRequestHeader('my-user',sessionStorage.getItem("UserValidation"));
        xhr.send();
        xhr.onload = function(){
            let MisWishCasas = JSON.parse(xhr.responseText);
            let Wishcasas = " ";
            for(const Wcasa of MisWishCasas){
                const WcasasHTML =  `<div class="col-3 ">
                <img class="card-img-top fotos" src="${Wcasa.image}"  alt="Hola insertado">
                <div class="card-body" style="text-align: center;">
                    <h4 class="card-title">Casa en venta</h4> 
                    <p class="card-text">Ubicacion: ${Wcasa.location}</p> 
                    <p class="card-text"></p>
                    <a href="../views/casa/?id=${Wcasa.ID}" onclick="saveID('${Wcasa.ID}')" class="btn btn-warning">Visitar Casa</a>  
                </div>
            </div>';
                `;
                Wishcasas = Wishcasas + WcasasHTML;
                console.log(Wishcasas);
            }
            document.getElementById("results_search").innerHTML = Wishcasas;
            console.log(MisWishCasas);
            NavBar();
            sessionStorage.removeItem("WishList");
        }
    }
    else{
        xhr.open('GET','/views/casa/findAll',true);
            xhr.send();
            xhr.onload = function(){
                results_search.innerHTML = "";
                let MisCasas = JSON.parse(xhr.responseText);
                for( const casa of MisCasas){
                    const casasHTML = `<div class="col-3 ">
                    <img class="card-img-top fotos" src="${casa.image}"  alt="Hola insertado">
                    <div class="card-body" style="text-align: center;">
                        <h4 class="card-title">Casa en venta</h4> 
                        <p class="card-text">Ubicacion: ${casa.location}</p> 
                        <p class="card-text"></p>
                        <a href="../views/casa/?id=${casa.ID}" onclick="saveID('${casa.ID}')" class="btn btn-warning">Visitar Casa</a>  
                    </div>
                </div>';
                    `;
                    results_search.innerHTML = results_search.innerHTML + casasHTML;
                }
                NavBar();
                sessionStorage.removeItem("WishList");
        }
    
    }


}





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
            const LcasasHTML = `<div class="col-3">
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

function SearchByType(type){
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/casa/findbytype',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('my-type',type);
    xhr.send();
    xhr.onload = function(){
        let MisTypeCasas = JSON.parse(xhr.responseText);
        let Typecasas = " ";
        if(MisTypeCasas == null){
            alert("No hay casas de este tipo");
            return;
        }
        else{
        for(const Tcasa of MisTypeCasas){
            TcasasHTML = `<div class="col-3">
                                    <img class="card-img-top fotos" src="${Tcasa.image}"  alt="Hola insertado">
                                    <div class="card-body" style="text-align: center;">
                                        <h4 class="card-title">Casa en venta</h4> 
                                        <p class="card-text">Ubicacion: ${Tcasa.location}</p> 
                                        <p class="card-text"></p>
                                        <a href="../views/casa/?id=${Tcasa.ID}" onclick="saveID('${Tcasa.ID}')" class="btn btn-warning">Visitar Casa</a>  
                                    </div>
                                </div>`;
            Typecasas = Typecasas + TcasasHTML;
            console.log(Typecasas);
        }
        document.getElementById("results_search").innerHTML = Typecasas;
        console.log(MisTypeCasas);
        }
    }
};

function SearchByLevels(numberoflevels){
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/casa/findbyfloors',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('my-floors',numberoflevels);
    xhr.send();
    xhr.onload = function(){
        let MisFloorsCasas = JSON.parse(xhr.responseText);
        let Floorscasas = " ";
        if(MisFloorsCasas == null){
            alert("No hay casas con este numero de pisos");
            return;
        }
        else{
            for(const LeCasas of MisFloorsCasas){
                LeCasasHTML = `<div class="col-3">
                <img class="card-img-top fotos" src="${LeCasas.image}"  alt="Hola insertado">
                <div class="card-body" style="text-align: center;">
                    <h4 class="card-title">Casa en venta</h4> 
                    <p class="card-text">Ubicacion: ${LeCasas.location}</p> 
                    <p class="card-text"></p>
                    <a href="../views/casa/?id=${LeCasas.ID}" onclick="saveID('${LeCasas.ID}')" class="btn btn-warning">Visitar Casa</a>  
                </div>
            </div>`;
                Floorscasas = Floorscasas + LeCasasHTML;
                console.log(Floorscasas);
            }
            document.getElementById("results_search").innerHTML = Floorscasas;
            console.log(MisFloorsCasas);
        }
        
    }
};



