function buttonToggle(){
    let toggle = document.querySelector('.toggle');
            let menu = document.querySelector('.menu');
                menu.onclick = function(){
                    menu.classList.toggle('active');
                } 
}