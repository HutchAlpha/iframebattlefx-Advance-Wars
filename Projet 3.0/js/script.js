console.log("Chargement script.js");
var agent;
var body;

//!Récolter son
  function onAgentLifeChanged(event) {
    /*!Annimation Vie*/itvLife = setInterval(life, 100)/*!Annimation Vie*/
    fetch("http://localhost:8080/getshoot");
    if (life == 0) { fetch("http://localhost:8080/dead");
  }
  document.getElementById("myBtn").style.width = "100" + "%";
  }
//!Fin récolter son

//!Récolter Pseudo
  const url = new URL('http://adendevint2223.jusdeliens.com:8000/quentin_boisset');
  const pseudo = url.pathname.split('/')[1];
  console.log(pseudo); // "quentin_boisset"
  document.getElementById("h1Name").textContent = pseudo;
//!Fin récolte Pseudo
 
//!Connexion
  function onAgentConnected(event) {
    console.log(`Agent connected ${agent.id}`);
  }
//!Fin Connexion

//!Updated
  // Appeler en boucle
  function onAgentUpdated(event) {
    console.log(`Agent updated ${agent.id}`);
  // Fin Appeler en boucle 
  //changer de direction
    agent.lookTo((agent.dir + 1) % 4);
  //Fin changer de direction
  }
//!Fin Updated

/*if (agent.d > 0) {
  document.querySelector("body").style.color = "red";
  document.querySelector("body").innerHTML = "Enemie en Vue" + agent.d;
} else {
  agent.lookTo(agent.dir);
  document.querySelector("body").style.color = "green";
  document.querySelector("body").innerHTML = "Vous pouvez Avancez" + agent.dir;
}*/

//!Changer de Direction
  function onAgentDirChanged(event) {
    console.log(`Agent dir changed ${agent.dir}`);
    //Actualiser rotation du sprite
    let img = document.querySelector("#imgTank");
    img.style.transform = "rotate(" + agent.dir * 90 + "deg)";
  }
//!Fin Changer de Direction

//!Shoot
        //Shoot Alumée
          function onFireButtonDown(event){
            console.log("Mouse down, fire!!!");
            fetch("http://localhost:8080/shoot");
            agent.fire(true);
           /*! Ammination Ammu*/itvAmmu = setInterval(ammu, 1);/*! Annimation Ammu*/
          }
        //Fin Shoot Alumée

        //Shoot Eteint
          function onFireButtonUp(event){
            console.log("Mouse up, stop Fighting");
            agent.fire(false);
          }
        //Fin Shoot Eteint

//!Fin shoot

//!Barre de vie + Munition
  //*Vie
  var minprogress = 0;   // total à atteindre
  var actualprogressLife = 250;  // valeur courante
  var itvLife= 0;  // id pour setinterval
  var isLifeExecuted = false;
  var indicatorLife = "";
  function life() {

    if (actualprogressLife <= minprogress || isLifeExecuted) 
    {
    clearInterval(itvLife);
    }
    
      isLifeExecuted = true;
      indicatorLife = document.getElementById("lifeColors");
      actualprogressLife =  actualprogressLife - 25;
      console.log(actualprogressLife);
      indicatorLife.style.width = actualprogressLife + "px";
    
  }  
  //*Fin VIE
  //*Munitions
  var minprogress = 0;   // total à atteindre
  var actualprogressAmmu = 250;  // valeur courante
  var itvAmmu = 0;  // id pour setinterval
  var isAmmuExecuted = false;
  var indicatorAmmu = "";
  function ammu() {

    if (actualprogressAmmu <= minprogress || isAmmuExecuted) 
    {
    clearInterval(itvAmmu);
    }
    
      isAmmuExecuted = true;
      indicatorAmmu = document.getElementById("ammuColors");
      actualprogressAmmu =  actualprogressAmmu - 25;
      console.log(actualprogressAmmu);
      indicatorAmmu.style.width = actualprogressAmmu + "px";
    
  }    
  //*Fin Munitions
//!Fin barre de vie + Munition

//!Activation prioritére commandes quand pages Lancer
  function onPageLoaded(event) {
  fetch("http://localhost:8080/spawn");
  //S'abonner aux cliques
  let  fireButton = document.querySelector("#imgCible");
  fireButton.addEventListener("mousedown",onFireButtonDown);
  fireButton.addEventListener("mouseup",onFireButtonUp);

  // You can get url_string from window.location.href if you want to work with
  // the URL of the current page
  let url_string = window.location.href;
  let url = new URL(url_string);
  let readonly = url.searchParams.get("readonly");
  let verbosity = url.searchParams.get("verbosity");
  let isReadonly = (readonly === "true");
  readonly = parseInt(verbosity);
  
    if (readonly == null) {readonly = true;} 
    else {readonly = readonly === ("true");}
    
    if (verbosity == null) {verbosity = 1;} 
      else {verbosity = parseInt(verbosity);}

    /*readonly = (readonly == null) ? true : {readonly === 'true' };
    verbosity = (verbodity == null) ? 1 : parseInt(verbosity);*/
      
    console.log(readonly);
    console.log(verbosity);
        
    agent = new Agent("quentin_boisset","demo","demo","iframebattlefx",8080,"mqtt.jusdeliens.com",verbosity,readonly);
    agent.connect();

    //Agent Connexion
    agent.addEventListener("connected", onAgentConnected);
    //Fin Agent Connexion

    //Agent MAJ Servers
    agent.addEventListener("updated", onAgentUpdated);
    //Fin MAJ Servers

    //Agent Changer direction
    agent.addEventListener("dirChanged", onAgentDirChanged);
    //Fin Agent Changer direction

    //Vie changer
    agent.addEventListener("lifeChanged", onAgentLifeChanged);
    //Fin Vie changer
  }


  //Appeler la fonct onPageLoaded une fois la page html est chargé
  document.addEventListener("DOMContentLoaded", onPageLoaded);


//!Fin Activation prioritére commandes quand pages Lancer