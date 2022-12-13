let scoreFinal = localStorage.getItem('scoreFinal');
scoreFinal = JSON.parse(scoreFinal)

let scores=[]
scoreFinal.forEach(player => {
    let total = 0
    player.cards.forEach(card =>{
        total+= parseInt(card.cardObj.score)
    })
    // scores.push({"ID" : player["playerID"], "Name" : player["PlayerName"], "score" : total})
    player["score"]= total
    // console.log(player)
});
scoreFinal.sort((a, b) => (a.score > b.score) ? 1 : -1)

//--------------------------------------------------------------

let place=1

scoreFinal.forEach(player =>{
    let PlayerBox = document.createElement('div')
    PlayerBox.classList.add('player')
    
    let number = document.createElement('p')
    number.innerText = place
    place++
    PlayerBox.appendChild(number)

    let name = document.createElement('p')
    name.innerText = player.PlayerName
    PlayerBox.appendChild(name)

    let scorePlayer = document.createElement('p')
    scorePlayer.innerText = "Score : "+player.score
    PlayerBox.appendChild(scorePlayer)

    document.querySelector(".podium").appendChild(PlayerBox)
})