let nbTours = 5
let frequency = 0.5
let compteTours = 1

let tourPrint = document.querySelector('.tour')
tourPrint.innerHTML = "Tour "+compteTours+"<span>/"+nbTours+"</span>"

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

document.querySelector('.next').addEventListener('click', ()=>{
    if(nbTours === compteTours){
        //do things in localstorage
        window.location.href = "../select-cards.html";
    }else{
        compteTours++
        tourPrint.innerHTML = "Tour "+compteTours+"<span>/"+nbTours+"</span>"

        if(hasEvent(frequency)){
            fetchEvent(Math.floor(Math.random() * 18) + 1).then(fetchedEvent => {
                console.log(fetchedEvent)
                eventName.innerText = fetchedEvent.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                eventDesc.innerText = fetchedEvent.effect
            })
        }else{
            resetEvent()
        }
    }
})