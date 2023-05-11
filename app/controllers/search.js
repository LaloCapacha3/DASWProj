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
}

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

