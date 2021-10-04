// TODO: splash-screen

let splashElement = document.getElementById("splash_open")
document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splashElement.classList.add('splash-gone')
        setTimeout(()=>{
            splashElement.style.display = "none"
        },2000)

    },5000)

    setTimeout(()=>{
        let node = `<span class="splash-subheader">Blooming Flowers of Youth</span>`
        splashElement.insertAdjacentHTML('beforeend',node)
    },2000)

    
})




