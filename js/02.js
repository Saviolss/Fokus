const addTarefaBt = document.querySelector('.app__button--add-task');
const formularioAdd = document.querySelector('.app__form-add-task');
const areaTexto = document.querySelector('.app__form-textarea');
const ulTarefa = document.querySelector('.app__section-task-list');
const paragrafoDescriçao = document.querySelector('.app__section-active-task-description');
const btnRemoverTarefa = document.querySelector('#btn-remover-concluidas');
const btnRemoverTarefaTodas = document.querySelector('#btn-remover-todas');

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

let minhasTarefas = JSON.parse(localStorage.getItem('novaTarefa')) || [];
   
function atualizarTarefa() {
    localStorage.setItem('novaTarefa',JSON.stringify(minhasTarefas));
}
function criarElementoTarefa (novaTarefa) {
    const li = document.createElement ('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement ('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const p = document.createElement('p');
    p.textContent = novaTarefa.descriçao;
    p.classList.add('app__section-task-list-item-description');

    const button = document.createElement('button');
    button.onclick = () => {
       const editarTarefa = prompt ('Editar tarefa?');
       if (editarTarefa) {
       p.textContent = editarTarefa;
       novaTarefa.descriçao = editarTarefa;
         atualizarTarefa();
         return
       }
                     
    } 
    button.classList.add('app_button-edit');
    const buttonImg = document.createElement('img');
    buttonImg.setAttribute('src', '/imagens/edit.png');
    button.append(buttonImg);

    li.append(svg);
    li.append(p);
    li.append(button);
    if (novaTarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        button.setAttribute('disabled', 'disabled');
    } 
    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active');    
        });
        if (tarefaSelecionada == novaTarefa) {
            paragrafoDescriçao.textContent = '';
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            return;
        }
        tarefaSelecionada = novaTarefa;
        liTarefaSelecionada = li;
        paragrafoDescriçao.textContent = novaTarefa.descriçao;

        li.classList.add('app__section-task-list-item-active');
    }
    return li;
}

addTarefaBt.addEventListener('click', () => {
    formularioAdd.classList.toggle('hidden');   
})

formularioAdd.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const novaTarefa = {
        descriçao: areaTexto.value
    }
    minhasTarefas.push(novaTarefa);
    const elementoTarefa = criarElementoTarefa(novaTarefa);
    ulTarefa.append(elementoTarefa);   
    atualizarTarefa();
    formularioAdd.classList.add('hidden');
  
})

minhasTarefas.forEach(novaTarefa => {
   const elementoTarefa = criarElementoTarefa(novaTarefa);
    ulTarefa.append(elementoTarefa);
});

document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
     liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
     liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
     liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled'); 
     tarefaSelecionada.completa = true;
     atualizarTarefa();
    }
});

btnRemoverTarefa.onclick = () => {
    const seletor = '.app__section-task-list-item-complete';
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    })
    minhasTarefas = minhasTarefas.filter(novaTarefa => !novaTarefa.completa);
    atualizarTarefa();
}

btnRemoverTarefaTodas.onclick = () => {
    const seletorTodas = '.app__section-task-list';
    document.querySelectorAll(seletorTodas).forEach(elemento => {
        elemento.remove();
    })
    minhasTarefas = minhasTarefas.filter(novaTarefa => !novaTarefa && !novaTarefa.completa);
    atualizarTarefa();
}