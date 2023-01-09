const players = JSON.parse(localStorage.getItem('players'))
const NbPlayers = players.length

const cardPlayer = 4
let cardId = 0

let exportCard = []

//let pName = "{player name} :"

for(let player=0; player<NbPlayers; player++){
    let cardBox = document.createElement('div')
    cardBox.classList.add('box')

    let cache = document.createElement('div')
    cache.classList.add("cache")

    cardBox.appendChild(cache)

    let allContent = document.createElement('div')
    let playerName = document.createElement('p')
    playerName.innerText = players[player].name //pName

    let picture = document.createElement('img')
    picture.src = players[player].pp
    picture.alt = "image de profile"
    

    let playerInfos = document.createElement('div')
    playerInfos.classList.add('box-player')
    playerInfos.appendChild(picture)
    playerInfos.appendChild(playerName)

    allContent.classList.add('cpn')
    if(player === 0){
        allContent.classList.add('content-visible')
    }

    allContent.appendChild(playerInfos)
    allContent.appendChild(cardBox)

    exportCard.push({"playerID" : player ,"PlayerName" : players[player], "picture": "https://xsgames.co/randomusers/avatar.php?g=pixel","cards" : []})

    for(let cardI=0; cardI<cardPlayer; cardI++){
        let card=document.createElement('div')
        card.classList.add('card')
        card.dataset.already = "false"
        card.dataset.id =cardId
        card.dataset.player = player

        let plus=document.createElement('div')
        plus.classList.add('plus')

        let img=document.createElement('img')
        img.classList.add('imgcard')
        img.classList.add('hide')
        img.src="img/cards/png/"
        img.alt="Card"

        card.appendChild(plus)
        card.appendChild(img)

        cardBox.appendChild(card)

        cardId++
    }
    document.querySelector('#cards').appendChild(allContent)
}


let checkAll = []

async function fetchCard(value) {
    const response = await fetch("/card/"+value);
    const card = await response.json();
    return card;
}

let currentCard;

document.querySelectorAll('.card').forEach(card=>{
    
    card.addEventListener('click', ()=>{
        currentCard = card
        if(card.dataset.already === "true"){ //check si la carte affiche un truc
            card.getElementsByTagName('img')[0].src = "img/cards/png/nothing.png"
            card.getElementsByTagName('img')[0].classList.add('hide')
            card.dataset.already = "false"
            card.getElementsByTagName('div')[0].classList.remove('hide')
            card.classList.remove('hide-card')

            let OCID;
            exportCard[card.dataset.player].cards.forEach(obj=>{console.log(obj.cardObj)})
            exportCard[card.dataset.player].cards.forEach(obj=>{
                if(obj.CID == card.dataset.id){
                    let index = exportCard[card.dataset.player].cards.indexOf(obj)
                    exportCard[card.dataset.player].cards.splice(index,1)
                    OCID=obj.cardObj.ID
                }
            })
            // console.log("-------------------------------------------")
            exportCard[card.dataset.player].cards.forEach(obj=>{console.log(obj.cardObj)})
            // console.log("+++++++++++++++++++++++++++++++++++++++++++")
            // console.log("cid : "+OCID+" index : "+checkAll.indexOf(OCID)+" list : "+checkAll)
            checkAll.splice(checkAll.indexOf(OCID), 1)
            // console.log("+++++++++++++++++++++++++++++++++++++++++++")
            // console.log("cid : "+OCID+" index : "+checkAll.indexOf(OCID)+" list : "+checkAll)
            console.log(exportCard, checkAll)

        }else{
            document.querySelector(".SC").classList.remove('disabled')
            document.querySelector(".SC").disabled = false
            document.querySelectorAll('.card').forEach(card=>card.classList.add("cardOff"))
            document.querySelectorAll('.cache').forEach(box=>box.classList.add("show-cache"))
        }
    })
})


document.querySelector('.SC').addEventListener('click',()=>{
    let value = document.querySelector('.searchBar').value
    document.querySelector('.searchBar').value = ""
    if(value>=1 && value<=54){
        fetchCard(value).then(fetchedCard => {
            console.log(fetchedCard);
            if(!checkAll.includes(fetchedCard.ID)){
                
                checkAll.push(fetchedCard.ID)

                currentCard.getElementsByTagName('img')[0].classList.remove('hide')
                currentCard.getElementsByTagName('img')[0].src ="img/cards/png/"+fetchedCard.ID+'.png'
                currentCard.dataset.already = "true"
                currentCard.getElementsByTagName('div')[0].classList.add('hide')
                currentCard.classList.add('hide-card')
    
                exportCard[currentCard.dataset.player].cards.push({"CID": currentCard.dataset.id,"cardObj": fetchedCard})
            }else{
                console.log("non")
            }
            console.log(exportCard, checkAll)
        });
    }
    document.querySelector(".SC").classList.add('disabled')
    document.querySelector(".SC").disabled = true
    document.querySelectorAll('.card').forEach(card=>card.classList.remove("cardOff"))
    document.querySelectorAll('.cache').forEach(box=>box.classList.remove("show-cache"))
})

document.querySelector('.bouton-retour').addEventListener('click', ()=>{
    localStorage.setItem('scoreFinal', JSON.stringify(exportCard))
    window.location.href = "../classement.html";
})



function getCurrent(list){
    list.forEach((player, index)=>{
        if(player.classList.contains("content-visible")){
            return index
        }
    })
}


document.querySelector(".chevron-previous").addEventListener("click",()=>{
    let cpn = document.querySelectorAll(".cpn");
    let current
    cpn.forEach((player, index)=>{
        if(player.classList.contains("content-visible")){
            current=index
        }
    })
    cpn[current].classList.remove('content-visible')
    if(current-1<=-1){
        cpn[cpn.length-1].classList.add('content-visible')
    }else{
        cpn[current-1].classList.add('content-visible')
    }
})
document.querySelector(".chevron-next").addEventListener("click",()=>{
    let cpn = document.querySelectorAll(".cpn");
    let current
    cpn.forEach((player, index)=>{
        if(player.classList.contains("content-visible")){
            current=index
        }
    })
    cpn[current].classList.remove('content-visible')
    if(current+1>=cpn.length){
        cpn[0].classList.add('content-visible')
    }else{
        cpn[current+1].classList.add('content-visible')
    }
})