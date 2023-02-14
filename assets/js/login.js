let formHTML = document.getElementById('login-form')
let usuarioHTML = document.getElementById('username')
let senhaHTML = document.getElementById('password')
let usuarios = {}

formHTML.addEventListener('submit', (e)=>{
    e.preventDefault()

    usuarios = procuraUsuario(usuarioHTML.value, senhaHTML.value)
    if(!usuarios){
        return
    }


    localStorage.setItem('usuarioLogado', usuarios.usuarios)
    window.location.assign('/homepage.html')
})



function procuraUsuario(nome, senha){
    let usuarioEncontrado = JSON.parse(localStorage.getItem(nome))


    if(usuarioEncontrado && usuarioEncontrado.senha === senha){
        return usuarioEncontrado
    }else{
        alert('USUÁRIO OU SENHA INVÁLIDOS!')
        return
    }
}