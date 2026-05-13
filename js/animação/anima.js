// Lampada

const lampada = document.querySelector('.lampada');
const imagem = document.getElementById('imagem');
const main = document.getElementById('porta-bg');
const lista = document.getElementById('porta-logicas-listas')

function trocaImage(){
    const body = document.querySelector('body').classList.toggle("luz")
    
    if(imagem.src.includes("desligada.svg")){
        imagem.src = "./img/lampadas/ligada.svg"
        main.classList.add("ativo");
        lista.classList.add("hover");
    }else {
        imagem.src = "./img/lampadas/desligada.svg"
         main.classList.remove("ativo");
         lista.classList.remove("hover");    
        }

}

lampada.addEventListener('click', trocaImage)
