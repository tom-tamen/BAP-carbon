const players = ["Marcus", "Dave", "Karl"]
const NbPlayers = players.length

const cardPlayer = 4
let cardId = 0

let exportCard = []

//let pName = "{player name} :"

for(let player=0; player<NbPlayers; player++){
    let cardBox = document.createElement('div')
    cardBox.classList.add('box')

    let allContent = document.createElement('div')
    let playerName = document.createElement('p')
    
    playerName.innerText = players[player] //pName
    allContent.classList.add('cpn')

    allContent.appendChild(playerName)
    allContent.appendChild(cardBox)

    exportCard.push({"Player" : players[player], "cards" : []})

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
            card.getElementsByTagName('img')[0].src = "img/cards/png/"
            card.getElementsByTagName('img')[0].classList.add('hide')
            card.dataset.already = "false"
            card.getElementsByTagName('div')[0].classList.remove('hide')

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
            document.querySelector(".selection").classList.remove('hide')//affiche la searchbar
        }
    })
})


document.querySelector('.SC').addEventListener('click',()=>{
    let value = document.querySelector('.searchBar').value
    if(value>=1 && value<=54){
        fetchCard(value).then(fetchedCard => {
            console.log(fetchedCard);
            if(!checkAll.includes(fetchedCard.ID)){
                
                checkAll.push(fetchedCard.ID)

                currentCard.getElementsByTagName('img')[0].classList.remove('hide')
                currentCard.getElementsByTagName('img')[0].src ="img/cards/png/"+fetchedCard.ID+'.png'
                currentCard.dataset.already = "true"
                currentCard.getElementsByTagName('div')[0].classList.add('hide')
    
                exportCard[currentCard.dataset.player].cards.push({"CID": currentCard.dataset.id,"cardObj": fetchedCard})
            }else{
                console.log("non")
            }
            console.log(exportCard, checkAll)
        });
    }
    document.querySelector('.selection').classList.add('hide')
})

// let obj = [
//     {"Player" : 1, 
//     "cards" : [
//         {"CID" : 1, "cardObj" : "obj"},
//         {"CID" : 2, "cardObj" : "obj"},
//         {"CID" : 3, "cardObj" : "obj"}
//     ]},
//     {"Player" : 2, 
//     "cards" : [
//         {"CID" : 4, "cardObj" : "obj"},
//         {"CID" : 5, "cardObj" : "obj"},
//         {"CID" : 6, "cardObj" : "obj"}
//     ]},
// ]

