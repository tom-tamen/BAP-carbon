window.reload = localStorage.clear()

let playersCounter = 0
let vu = []
let num = Math.floor(Math.random() * 53)
vu.push(num)
let mainAVT = document.getElementById('avatar')
mainAVT.src = "https://xsgames.co/randomusers/assets/avatars/pixel/"+num+".jpg"

let players = []

let playerList = document.getElementById("player-list")
document.getElementById("submit-player").addEventListener('click', ()=>{
    num = Math.floor(Math.random() * 53)
    while(vu.includes(num)){
        num = Math.floor(Math.random() * 53)
    }
    vu.push(num)
    if (playersCounter<8) {
        playersCounter++
        let PlayerName = document.getElementById('name')
        let p = document.createElement("p")
        let playerDiv = document.createElement('div')
        let img = document.createElement("img")
        playerDiv.setAttribute("id", "view-player")
        img.src = mainAVT.src
        playerDiv.appendChild(img)
        playerDiv.appendChild(p)

        let fname = PlayerName.value != '' && [...PlayerName.value].length <= 10 ? PlayerName.value : 'Player '+playersCounter
        p.innerHTML = fname
        playerList.appendChild(playerDiv)

        players.push({'name': fname, 'pp': mainAVT.src})

        mainAVT.src = "https://xsgames.co/randomusers/assets/avatars/pixel/"+num+".jpg"
        PlayerName.value = ""

    } else {
        console.log("2 many players")
    }
})


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


document.querySelector('#submit-setup').addEventListener('click', ()=>{
    localStorage.setItem('players', JSON.stringify(players))
    window.location.href = 'jeu-en-cours.html'
})