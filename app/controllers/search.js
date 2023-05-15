function borrar_dropdown(){ 
    var dropdown=document.getElementById("vivienda")
    dropdown.innerHTML=" " 
} 
function selectOption(option){ 
    var dropdown=document.getElementById("vivienda") 
    borrar_dropdown();
     dropdown.innerHTML=option.innerHTML 
}

function query(){
    var dropdown=document.getElementById("vivienda");
    console.log(dropdown.innerHTML);
    sessionStorage.setItem("SearchQuery",dropdown.innerHTML);
};

function busqueda_session(){
    console.log("entro busq ss")
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/casa/findbyloc',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('my-location',document.querySelector('input[placeholder="Buscar Casas"]').value);
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
    }
};
/*
function ShowSearchResults(){
    xhr = new XMLHttpRequest();
    var query = sessionStorage.getItem("SearchQuery");
    var SearchBar = document.getElementById("SearchBar");
    xhr.open('GET','/results',true);
    xhr.setRequestHeader('Content-Type','application/json');
    let data = "{\"tipo\":\"" + query + "\"" + ",\"Lugar\":\"" + SearchBar.value + "\"}";
    xhr.send(data);
    console.log(data);
    xhr.onload = function(){
        console.log("Response: " + xhr.responseText);
        var results = document.getElementById("results");
        results.innerHTML = xhr.responseText;
    }
}
*/
