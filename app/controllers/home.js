function SearchByFilter(option){
    let searchmenu = document.getElementById("searchmenu");
    console.log("Option: " + option);
    if(option == 1){
        searchmenu.innerText = "Casa"
    }
    else if(option == 2){
        searchmenu.innerText = "Departamento"
    }
}