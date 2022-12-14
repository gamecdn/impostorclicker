// CONFIG #################################################
var dev = true;
var spc = 1;
var sps = 0;
var clicks = 0;
var sussies = dev ? 1000000000 : 0;
// STORE ##################################################
var imponames = ["Coral", "Tan", "Gray", "Banana", "Rose", "Maroon", "Lime", "Cyan", "Brown", "Purple", "White", "Black", "Yellow", "Orange", "Pink", "Green", "Blue", "Red", "Secret", "Ancient"];
var impocolors = ["#EC7578", "#928776", "#8397A7", "#FFFEBE", "#ECC0D3", "#6B2B3C", "#50F039", "#38E2DD", "#71491E", "#6B2FBC", "#D7E1F1", "#3F474E", "#F6F657", "#F07D0D", "#EE54BB", "#11802D", "#132ED2", "#C61111", "#1D9853", "#617218"];
var impounlocked = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var impoprices = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600, 819200, 1638400, 3276800, 6553600, 13107200, 26214400, 52428800];
var impooutput = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4069, 8192, 16384, 32768, 65546, 131072, 262144, 524288];
var impoamounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// UPGRADES ###############################################
var upgradenames = ["Better Clicks", 
                    "First Sus", "More Sus", "Sus V3", "Fruit", "Flower", "Maroon 5", "Sour", "Bluish-Greenish Color", "Doo Doo Fard", "\"Girly\"", "Not Black", "Not White", "Orange - Red", "Red + Yellow", "\"Girlier\"", "Grass", "Sky", "IMPOSTOR", "___ has joined the game", "CoRaL Is BeTtEr"];
var upgradedesc = ["Clicks x2", 
                   "Coral Impostors Better", "Tan Impostors Better", "Gray Impostors Better", "Banana Impostors Better", "Rose Impostors Better", "Maroon Impostors Better", "Lime Impostors Better", "Cyan Impostors Better", "Brown Impostors Better", "Purple Impostors Better", "White Impostors Better", "Black Impostors Better", "Yellow Impostors Better", "Orange Impostors Better", "Pink Impostors Better", "Green Impostors Better", "Blue Impostors Better", "Red Impostors Better", "Secret Impostors Better", "Ancient Impostors Better"];
var upgraderequisites = [[0, 10], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [17, 1], [18, 1], [19, 1], [20, 1]];
var upgradeprices = [10, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600, 819200, 1638400, 3276800, 6553600, 13107200, 26214400, 52428800];
var upgradereward = [[0, 2], [1, 1.5], [2, 1.5], [3, 1.5], [4, 1.5], [5, 1.5], [6, 1.5], [7, 1.5], [8, 1.5], [9, 1.5], [10, 1.5], [11, 1.5], [12, 1.5], [13, 1.5], [14, 1.5], [15, 1.5], [16, 1.5], [17, 1.5], [18, 1.5], [19, 1.5], [20, 1.5]];
// MAIN ###################################################
function init() {
  for (var i = 0; i < imponames.length; i++) {
    var div = document.createElement("div");
    var div2 = document.createElement("div");
    var image = document.createElement("img");
    var title = document.createElement("h1");
    var price = document.createElement("p");
    //div.id = "i" + i;
    div.classList.add("impostore2");
    if (impounlocked[i] || dev) {
      div.classList.add("impostore");
      div.style.background = impocolors[i];
      image.src = imponames[i] + ".png";
      image.height = "100";
      title.innerText = imponames[i] + " Impostor";
      price.innerText = impoprices[i];
      (function(index) {
        div.onclick = function() {
          if (sussies >= impoprices[index]) {
            sussies -= impoprices[index];
            impoprices[index] = Math.round(impoprices[index] * 1.1);
            impoamounts[index]++;
            impounlocked[index+1] = true;
            updateStuff();
          }
        }
      })(i);
    } else {
      div.style.background = "#808080";
      image.src = "Unknown.png";
      image.height = "100";
      title.innerText = "Unknown Impostor";
      price.innerText = "???";
      i = imponames.length;
    }
    div2.appendChild(title);
    div2.appendChild(price);
    div.appendChild(image);
    div.appendChild(div2);
    document.querySelector("#impo").appendChild(div);
  }
  for (var i = 0; i < upgradenames.length; i++) {
    if ((upgraderequisites[i][0] === 0 && upgraderequisites[i][1] <= clicks) || impoamounts[upgraderequisites[i][0]-1] >= upgraderequisites[i][1] || dev) {
      var div = document.createElement("div");
      var title = document.createElement("h1");
      var price = document.createElement("p");
      var desc = document.createElement("p");
      div.classList.add("upgradestore");
      title.innerText = upgradenames[i];
      price.innerText = upgradeprices[i];
      desc.innerText = upgradedesc[i];
      (function(index) {
        div.onclick = function() {
          if (sussies >= upgradeprices[index]) {
            sussies -= upgradeprices[index];
            if(upgradereward[index][0] === 0){
              spc *= upgradereward[index][1];
            }else{
              impooutput[upgradereward[index][0]-1] *= upgradereward[index][1];
            }
            upgradenames.splice(index, 1);
            upgraderequisites.splice(index, 1);
            upgradeprices.splice(index, 1);
            upgradereward.splice(index, 1);
            upgradedesc.splice(index, 1);
            updateStuff();
          }
        }
      })(i);
      div.appendChild(title);
      div.appendChild(desc);
      div.appendChild(price);
      document.querySelector("#upgrades").appendChild(div);
    }
  }
}
function updateStuff() {
  var toRemoveA = document.querySelectorAll(".impostore2");
  for (var i = 0; i < toRemoveA.length; i++) {
    toRemoveA[i].remove();
  }
  var toRemoveB = document.querySelectorAll(".upgradestore");
  for (var i = 0; i < toRemoveB.length; i++) {
    toRemoveB[i].remove();
  }
  document.querySelector("#sussies").innerText = sussies;
  sps = 0;
  for(var i = 0; i < imponames.length; i++){
    sps += impooutput[i] * impoamounts[i];
  }
  init();
}
function everySecond() {
  sussies += sps;
  updateStuff();
}
function everyClick() {
  sussies += spc;
  clicks++;
  updateStuff();
}
updateStuff();
setInterval(everySecond, 1000);
