 function borrar_dropdown(){
  var dropdown=document.getElementById("vivienda")
 dropdown.innerHTML=" "
}
 

function selectOption(option){
 var dropdown=document.getElementById("vivienda")
 borrar_dropdown();
 dropdown.innerHTML=option.innerHTML


}