
function selectOption1(option){ 
    var dropdown=document.getElementById("vivienda") 
    dropdown.innerHTML=" " 
     dropdown.innerHTML=option.innerHTML 
}
function selectOption2(option){ 
    var dropdown=document.getElementById("Precio") 
    dropdown.innerHTML=" " 
     dropdown.innerHTML=option.innerHTML 
}
function selectOption3(option){ 
    var dropdown=document.getElementById("N_pisos") 
    dropdown.innerHTML=" " 
     dropdown.innerHTML=option.innerHTML 
}

function query(){
    var dropdown=document.getElementById("vivienda");
    var search=document.getElementById("SearchBar").value;
    sessionStorage.setItem("SearchQuery",dropdown.innerHTML);
    sessionStorage.setItem("my-location-SS",search)
    
}
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

function busqueda_session(){
    xhr = new XMLHttpRequest();
    xhr.open('GET','/views/Barra',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('my-location',sessionStorage.getItem("my-location-SS"));
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){ 
            let MisLocaCasas = JSON.parse(xhr.responseText);
            console.log(MisLocaCasas);
        }
    }
}
  function dropdown_session(){
    const dropdown =sessionStorage.getItem("SearchQuery")
    return dropdown
}



function prueba(){
    busqueda_session();
};





