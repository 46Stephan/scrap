const formHTML = document.getElementById('creat-form')
const confirmaSenhaHTML = document.getElementById('confirm_senha')
const senhaHTML = document.getElementById('senha')
const usuarioHTML = document.getElementById('usuario')


formHTML.addEventListener('submit', (e) =>{
    e.preventDefault()
    const existeUsuario = verificaUsuario(usuarioHTML.value)

    if(usuarioHTML.value === existeUsuario.usuario){
        alert('VERIFICAR USUÁRIO: Usuário já existente no sistema')
        return
    }

    if(senhaHTML.value !== confirmaSenhaHTML.value){
        alert('VERIFICAR SENHA: Senha inválida!')
        return
    }

    salvarUsuario({
        usuario: usuarioHTML.value,
        senha: senhaHTML.value,
        recados: []
    })


    alert('PARABÉNS! Conta criada com sucesso')
    localStorage.setItem('usuarioLogado', `${usuarioHTML.value}`)
    location.assign('/homepage.html')
})

function salvarUsuario(data){
    localStorage.setItem(data.usuario, JSON.stringify(data))
}

function verificaUsuario(nome){
    const user = localStorage.getItem(nome)

    if(user){
        return JSON.parse(user)
    }

    return ''
}