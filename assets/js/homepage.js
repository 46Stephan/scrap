const usuarioLogado = JSON.parse(localStorage.getItem(localStorage.getItem('usuarioLogado')))
const modalHTML = document.querySelector('#pop-up')
const numeroHTML = document.querySelector('numero_recado')
const sairSistemaHTML = document.querySelector('#cabecalho-sair button')
const editarHTML = document.querySelector('#texto-editar')
const recadosHTML = document.querySelector('#recados')
const detalhamentoHTML = document.querySelector('#input-detalhamento')
const descricaoHTML = document.querySelector('#input-descricao')
const numeroRecadoHTML = document.querySelector('#numero_recado')

const btnCancelar = document.querySelector('#botao-cancelar');
const btnCadastrar = document.querySelector('#botao-cadastrar');
const btnNovoRecado = document.getElementById('#botao-cadastrar');


/*document.addEventListener('DOMContentLoaded' (()=>{*/
    function checklog(){
    if(!usuarioLogado){
        window.location.href = 'login.html'
        return
    }
    console.log(usuarioLogado)
    mostrarRecados(usuarioLogado)
/*}))*/}


btnCadastrar.addEventListener('click', criarRecado)
btnCancelar.addEventListener('click', cancelaEdicao)
btnNovoRecado.addEventListener('click', abrirModal)
sairSistemaHTML.addEventListener('click', sairSistema)

function abrirModal(){
    modalHTML.showModal()
}

function criarRecado(){
    const numeroRecado = numeroRecadoHTML.value
    const descricao = descricaoHTML.value
    const detalhamento = detalhamentoHTML.value

    if(!descricao || !detalhamento){
        alert('Por favor, preencher a descrição e o detalhamento para prosseguir')
        return
    }

    recadoNovo = {
        descricao,
        detalhamento
    }

    if(numeroRecado){
        usuarioLogado.recados[numeroRecado] = recadoNovo
    }else{
        usuarioLogado.recados.push(recadoNovo)
    }

    salvarNoLocalStorage(usuarioLogado)
    limparDados()
    mostrarRecados(usuarioLogado)
    cancelaEdicao()
}

function editarRecado(id, usuario){
    const usuarioDoRecado = JSON.parse(localStorage.getItem(usuario))
    const recadoParaEditar = usuarioDoRecado.recados[id]
    console.log(usuarioDoRecado.recados[id])

    btnCadastrar.value = 'Atualizar'
    detalhamentoHTML.style = 'width: 50%'
    btnCancelar.style = 'display: inline-block'

    numeroHTML.value = id
    descricaoHTML.value = recadoParaEditar.descricao
    detalhamentoHTML.value = recadoParaEditar.detalhamento
}

function cancelaEdicao(){
    detalhamentoHTML.style = ''
    detalhamentoHTML.value = ''
    descricaoHTML.value = ''
    btnCancelar.style = ''
    numeroHTML.value = ''
    modalHTML.close()
}

function excluirRecado(id, usuario){
    const usuarioDoRecado = JSON.parse(localStorage.getItem(usuario))
    usuarioDoRecado.recados.splice(id,1)
    localStorage.setItem(usuario, JSON.stringify(usuarioDoRecado))
    let usuarioNovosRecados = JSON.parse(localStorage.getItem(usuario))

    mostrarRecados(usuarioNovosRecados)
}

function salvarNoLocalStorage(dados){
    localStorage.setItem(dados.usuario, JSON.stringify(dados))
}

function mostrarRecados(usuario){

    recadosHTML.innerHTML = ''
    recadosUsuarioLogado = usuario.recados
    let btn = []
    recadosUsuarioLogado.forEach((recado, index,) =>{

        let novaLinha = document.createElement('tr')
        novaLinha.setAttribute('id', `linha_recado_${index}`)
        
        let numeroRecado = document.createElement('td')
        numeroRecado.innerText = `${index+1}`
        
        let descricao = document.createElement('td')
        descricao.innerText = recado.descricao
        
        let detalhamento = document.createElement('td')
        detalhamento.innerText = recado.detalhamento
        
        let tdBotoes = document.createElement('td')
        
        let botaoEditar = document.createElement('button')
        botaoEditar.setAttribute('class', `btn btn-success mb-1 mb-md-0 mt-1 mt-md-0 editar`)
        botaoEditar.setAttribute('id', `btn_editar_${index}`)
        botaoEditar.setAttribute('onclick', `editarRecado(${index}, '${usuarioLogado.usuario}')`)
        botaoEditar.innerText = 'Editar'
        
        let botaoExcluir = document.createElement('button')
        botaoExcluir.setAttribute('class', `btn btn-danger ms-0 ms-md-3 excluir`)
        botaoExcluir.setAttribute('id', `btn_excluir_${index}`)
        botaoExcluir.setAttribute('onclick', `excluirRecado(${index}, '${usuarioLogado.usuario}')`)
        botaoExcluir.innerText = 'Excluir'
        
        novaLinha.appendChild(numeroRecado)
        novaLinha.appendChild(descricao)
        novaLinha.appendChild(detalhamento)
        
        tdBotoes.appendChild(botaoEditar)
        tdBotoes.appendChild(botaoExcluir)
        novaLinha.appendChild(tdBotoes)
        
        recadosHTML.appendChild(novaLinha)
        
        btn.push(novaLinha)
    })
}

function limparDados(){
    numeroRecadoHTML.value = ''
    descricaoHTML.value = ''
    detalhamentoHTML.value = ''
}

function sairSistema(){
    localStorage.removeItem('usuarioLogado')
    window.location.href = 'login.html'
}
