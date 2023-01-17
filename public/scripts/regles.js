// js tabs

let listeRegles=document.querySelectorAll('.btn-rules');

listeRegles.forEach(function(item) {

    item.addEventListener('click', function() {

        listeRegles.forEach(function(i) {
            i.classList.remove('btn-active');

        })

        let content=document.querySelectorAll('.section-regles-droite');
        content.forEach(function(c) {
            c.classList.remove('active');
        })
        this.classList.add('btn-active');
        
        if(this.classList.contains('btn-r1')) {
            let contentR1=document.querySelector('.r1');
            contentR1.classList.add('active');
        }
        if(this.classList.contains('btn-r2')) {
            let contentR2=document.querySelector('.r2');
            contentR2.classList.add('active');
        }
        if(this.classList.contains('btn-r3')) {
            let contentR3=document.querySelector('.r3');
            contentR3.classList.add('active');
        }
        if(this.classList.contains('btn-r4')) {
            let contentR4=document.querySelector('.r4');
            contentR4.classList.add('active');
        }
        if(this.classList.contains('btn-r5')) {
            let contentR5=document.querySelector('.r5');
            contentR5.classList.add('active');
        }
    })
})