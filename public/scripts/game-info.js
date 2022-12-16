window.reload = localStorage.clear();

let players = [];

function test(){
    if (players.length<8) {
        let playerList = document.getElementById("player-list")
        let a = document.getElementById('name').value
        players.push(a)
        while (playerList.firstChild) {
        playerList.removeChild(playerList.firstChild);
        localStorage.setItem('Players', players)
        }
        for (let i = 0; i < players.length; i++) {
            let p = document.createElement("p")
            let playerDiv = document.createElement('div')
            let img = document.createElement("img")
            playerDiv.setAttribute("id", "view-player");
            img.src = "img/homepage/Avatar.png";
            playerDiv.appendChild(img)
            playerDiv.appendChild(p)
            p.innerHTML=players[i]
            playerList.appendChild(playerDiv)
        }
        
    } else {
        console.log("2 many players")
    }
}

let lap = null;
let frequency = null;

document.querySelectorAll('.lap').forEach(e =>{
    e.addEventListener( 'click', ()=>{
        localStorage.setItem('nbTour', e.value)
        console.log(localStorage);

        let input = document.getElementById("client-value");
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            document.getElementById("client-value").click();
        });
    })  
})

document.querySelectorAll('.frequency').forEach(e =>{
    e.addEventListener( 'click', ()=>{
        localStorage.setItem('frequency', e.value)
        console.log(localStorage);
    })
})
  