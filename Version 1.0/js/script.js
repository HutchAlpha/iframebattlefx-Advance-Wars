console.log("Chargement script.js");
var agent;
var body;

//Récolter Pseudo
const url = new URL('http://adendevint2223.jusdeliens.com:8000/quentin_boisset');
const pseudo = url.pathname.split('/')[1];
console.log(pseudo); // "quentin_boisset"


function onAgentConnected(event) {
  console.log(`Agent connected ${agent.id}`);
}

// Appeler en boucle
function onAgentUpdated(event) {
  console.log(`Agent updated ${agent.id}`);
  //changer de direction
  agent.lookTo((agent.dir + 1) % 4);

  /*if (agent.d > 0) {
    document.querySelector("body").style.color = "red";
    document.querySelector("body").innerHTML = "Enemie en Vue" + agent.d;
  } else {
    agent.lookTo(agent.dir);
    document.querySelector("body").style.color = "green";
    document.querySelector("body").innerHTML = "Vous pouvez Avancez" + agent.dir;
  }*/
}

//Changer de Direction
function onAgentDirChanged(event) {
  console.log(`Agent dir changed ${agent.dir}`);
  //Actualiser rotation du sprite
  let img = document.querySelector("#imgTank");
  img.style.transform = "rotate(" + agent.dir * 90 + "deg)";
}
//Shoot Alumée
function onFireButtonDown(event){
	console.log("Mouse down, fire!!!");
	agent.fire(true);
}
//Shoot Eteint
function onFireButtonUp(event){
	console.log("Mouse up, stop Fighting");
	agent.fire(false);
}

function onPageLoaded(event) {
	
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

		/*
		//ou (version ternaire)
			
		readonly = (readonly == null) ? true : {readonly === 'true' };
			
		verbosity = (verbodity == null) ? 1 : parseInt(verbosity);*/
			
		console.log(readonly);
		console.log(verbosity);
			
	agent = new Agent("quentin_boisset","demo","demo","iframebattlefx",8080,"mqtt.jusdeliens.com",verbosity,readonly);
	agent.connect();

   //Agent Connexion
  agent.addEventListener("connected", onAgentConnected);

  //Agent Updated Servers
  agent.addEventListener("updated", onAgentUpdated);

  //Agent Changer direction
  agent.addEventListener("dirChanged", onAgentDirChanged);

  
}


//Appeler la fonct onPageLoaded une fois la page html est chargé
document.addEventListener("DOMContentLoaded", onPageLoaded);

//console.log("Chargement script.js");

//function onLoaded() {
////Recuperer l'événemet body de mon html et l'afficher dans la console du navigateur
//var body = document.querySelector("body");
//console.log(body);

////Modifier le texte du body est le remplacer par un autre
//document.querySelector("body").innerHTML = "Coucou les dev int" ;
//}

////S'abonne à l'évenement chargement page et appele la fonction onLoaded une fois l'évenement géneré
//document.addEventListener("DOMContentLoaded", onLoaded);
