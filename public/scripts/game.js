let nbTours = 10
let frequency = 0.5
let compteTours = 1

let tourPrint = document.querySelectorAll('.tour')
tourPrint.forEach(tour=>{
    tour.innerHTML = "Tour "+compteTours+"<span>/"+nbTours+"</span>"
})

let eventName = document.querySelector('.eventName')
let eventDesc = document.querySelector('.eventDesc')



function hasEvent(freq){
    if(Math.random()<= freq){
        return true
    }
    return false
}

async function fetchEvent(value) {
    const response = await fetch("/event/"+value);
    const eventObj = await response.json();
    return eventObj;
}

function resetEvent(){
    eventName.innerText = "Pas d'evenement"
    eventDesc.innerText = "Vous pouvez continuer la partie"
}

document.querySelectorAll('.next').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        if(nbTours === compteTours){
            //do things in localstorage
            window.location.href = "../select-cards.html";
        }else{
            compteTours++
            tourPrint.forEach(tour=>{
                tour.innerHTML = "Tour "+compteTours+"<span>/"+nbTours+"</span>"
            })
    
            if(hasEvent(frequency)){
                if(GameEvent.classList.contains('hide')){
                    changeState(GameEvent, GameTour)
                }
                fetchEvent(Math.floor(Math.random() * 18) + 1).then(fetchedEvent => {
                    // console.log(fetchedEvent)
                    eventName.innerText = fetchedEvent.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    eventDesc.innerText = fetchedEvent.effect
                })
            }else{
                resetEvent()
            }
        }
    })
})


//----------------------------------------------------------------------
//Changement de page :

let GameTour = document.querySelector('.div-game-tour')
let GameEvent = document.querySelector('.div-game-event')

let btnEvent=document.querySelector('.btn-event')
let btnTour=document.querySelector('.btn-tour')

function changeState(toRemove, toAdd){
    toRemove.classList.remove('hide')
    toAdd.classList.add('hide')
}

btnTour.addEventListener('click', ()=>{
    changeState(GameTour, GameEvent)
})
btnEvent.addEventListener('click', ()=>{
    changeState(GameEvent, GameTour)
})