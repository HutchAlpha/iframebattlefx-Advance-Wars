import { Agent } from "./iframebattlefx";

function onLoaded(event);
console.log("script chargé");

//Connecting to pytactx and subscribe to agent events
var agent = new Agent("toto","demo", "demo", "demo", 8080, "mqtt.jusdeliens.com", 3, true);
agent.connect();

document.addEventListener("DOMContentLoaded", onLoaded);