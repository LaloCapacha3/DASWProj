function UPDUP(){
  console.log("Entro a la funcion");
  xhr = new XMLHttpRequest();
  xhr.open('GET','/views/user/getinfo',true);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('x-token',sessionStorage.getItem("IDUser"));
  console.log("Enviando")
  xhr.send();
  xhr.onload = function(){
      if(xhr.status == 200){       
          let user = JSON.parse(xhr.responseText)
          console.table(user);
          const BigInfo = `
          <br><br>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <h1>${user.name}</h1>
                  <img src="${user.image}" style="width: 200px; height: 200px;" alt="Title" >
                </div>
                <div class="col">
                  <h2>Información</h2>
                  <p>Nombre: ${user.name}</p>
                  <p>Correo:
                    <a href="mailto:${user.email}">${user.email}</a>
                  </p>
                  <p>Teléfono: ${user.phone}</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <br><br>
                  <h2>Calificación</h2>
                  <p>Calificación: 4.5</p>
                  <p>Publicaciones: ${user.NoOfHomes}</p>
                </div>
                <div class="col">
                  <button class="btn" id="green"><i class="fa fa-thumbs-up fa-lg" aria-hidden="true" style="color: green;"></i></button>
                  <button class="btn" id="red"><i class="fa fa-thumbs-down fa-lg" aria-hidden="true" style="color: red;"></i></button>
                </div>
              </div>
            </div>
            <div class="col" id="fill_mini_houses">
              <H1>Publicaciones</H1>
            </div>
          </div>  
        </div>`;
        let NoOfHomes = user.NoOfHomes;
        for(let i = 0; i < NoOfHomes; i++){
          let home = user.homes[i];
          let houseHTML = `
            <div class="card" style="flex-direction: row;">
              <img class="card-img-left" src="${home.image}" style="width: 200px; height: 200px;" alt="Title" >
              <div class="card-body">
                <h4 class="card-title">${home.type} de ${user.name}</h4>
                <p class="card-text">${home.description}</p>
                <a href="../views/casa" class="btn btn-warning">Visitar Casa</a>     
              </div>
            </div>
            <br><br>
          `;
          console.log("Termine la funcion");
          document.getElementById("fill_with_info").innerHTML = BigInfo;
          document.getElementById("fill_mini_houses").innerHTML += houseHTML;
      }
  }
  NavBar();}
};