// Lampada

const lampada = document.querySelector('.lampada')
const imagem = document.getElementById('imagem')

function trocaImage(){
    const body = document.querySelector('body').classList.toggle("luz")
    
    if(imagem.src.includes("desligada.svg")){
        imagem.src = "./img/lampadas/ligada.svg"
    }else {
        imagem.src = "./img/lampadas/desligada.svg"
    }

}

lampada.addEventListener('click', trocaImage)
