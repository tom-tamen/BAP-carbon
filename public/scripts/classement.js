let scoreFinal = localStorage.getItem('scoreFinal');
scoreFinal = JSON.parse(scoreFinal)

let scores=[]
scoreFinal.forEach(player => {
    let total = 0
    player.cards.forEach(card =>{
        total+= parseInt(card.cardObj.score)
    })
    player["score"]= total
});
scoreFinal.sort((a, b) => (a.score > b.score) ? 1 : -1)

//--------------------------------------------------------------

let place=1

scoreFinal.forEach((player,counter) =>{
    let PlayerBox = document.createElement('div')
    PlayerBox.classList.add('player')
    
    let number = document.createElement('p')
    number.classList.add('position')
    number.innerText = place
    place++
    PlayerBox.appendChild(number)

    let playerSubBox = document.createElement('div')
    playerSubBox.classList.add('info-player')
    PlayerBox.appendChild(playerSubBox)

    if(counter<=2){
        let picture = document.createElement('img')
        picture.src = player.picture
        picture.alt = "image de profile"
        playerSubBox.appendChild(picture)
        console.log(counter)
    }

    let name = document.createElement('p')
    name.innerText = player.PlayerName
    playerSubBox.appendChild(name)

    let scorePlayer = document.createElement('p')
    scorePlayer.innerText = "Score : "+player.score
    playerSubBox.appendChild(scorePlayer)

    document.querySelector(".podium").appendChild(PlayerBox)
})