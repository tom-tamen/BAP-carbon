window.reload = localStorage.clear()

let players = []

function test(){
    if (players.length<8) {
        let playerList = document.getElementById("player-list")
        let a = document.getElementById('name').value
        players.push(a)
        while (playerList.firstChild) {
        playerList.removeChild(playerList.firstChild)
        localStorage.setItem('Players', players)
        }
        for (let i = 0; i < players.length; i++) {
            let p = document.createElement("p")
            let playerDiv = document.createElement('div')
            let img = document.createElement("img")
            playerDiv.setAttribute("id", "view-player")
            img.src = "img/homepage/Avatar.png"
            playerDiv.appendChild(img)
            playerDiv.appendChild(p)
            p.innerHTML=players[i]
            playerList.appendChild(playerDiv)
        }
        
    } else {
        console.log("2 many players")
    }
}

let lap = null
let frequency = null

let lapsBtn = document.querySelectorAll('.lap-btn')

lapsBtn.forEach(lapBtn => {
    lapBtn.addEventListener('click', function() {
        lapsBtn.forEach(btn => {
            btn.style.backgroundColor = ''
        })
        lapBtn.style.backgroundColor = `rgb(30, 225, 139)`
    })
})

document.querySelectorAll('.lap-btn').forEach(e =>{
    e.addEventListener( 'click', ()=>{
        localStorage.setItem('nbTour', e.value)
        console.log(localStorage)

        let input = document.getElementById("client-value")
        input.addEventListener("keyup", function(event) {
            event.preventDefault()
            document.getElementById("client-value").click()
        })
    })  
})

let freqBtn = document.querySelectorAll('.frequency')

freqBtn.forEach(freqBtns => {
    freqBtns.addEventListener('click', function() {
        freqBtn.forEach(btn => {
            btn.style.backgroundColor = ''
        })
        freqBtns.style.backgroundColor = `rgb(30, 225, 139)`
    })
})

document.querySelectorAll('.frequency').forEach(e =>{
    e.addEventListener( 'click', ()=>{
        localStorage.setItem('frequency', e.value)
        console.log(localStorage)
    })
})
