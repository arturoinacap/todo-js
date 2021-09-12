import { Todo } from "../classes/todo.class";
import { todoList } from "../index.js";

//referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo)=>{
    const HtmlTodo = `
	<li class="${ ( todo.completado) ? 'completed': ''}" data-id="${ todo.id }">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado)? 'checked':''}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;
    //elemento HTML
    const div = document.createElement('div');
	div.innerHTML = HtmlTodo;

	divTodoList.append(div.firstElementChild);
	return div; 
}

//eventos
txtInput.addEventListener('keyup',(event)=>{

	if(event.keyCode === 13 && txtInput.value.length > 0){
		
		console.log(txtInput.value);
		const nuevoTodo = new Todo(txtInput.value);
		todoList.nuevoTodo(nuevoTodo);
		
		crearTodoHtml(nuevoTodo);
		txtInput.value = '';
	}

});

divTodoList.addEventListener('click', (event)=>{
	
	const nombreElemento = event.target.localName;//input, label, button
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute('data-id');



	if(nombreElemento.includes('input')){ //click en el check
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle('completed');

	}else if(nombreElemento.includes('button')){
		var mensaje = confirm("¿Seguro que deseas eliminar este elemento?");
		if(mensaje){
			todoList.eliminarTodo(todoId); //lo borra del arreglo no del html
			divTodoList.removeChild(todoElemento); //elimina elemento html		
		}else{
			alert("el elemento no se eliminara");
		}
	

	}

});

//evento borrarCompletados
btnBorrar.addEventListener('click', ()=>{
	todoList.eliminarCompletados(); //borra el completado del arreglo

	for(let i = divTodoList.children.length-1; i>=0; i--){ //eliminar el ultimo elemento del arreglo en el html
		const elemento = divTodoList.children[i];

		if(elemento.classList.contains('completed')){
			divTodoList.removeChild(elemento);

		}
	}
});

//recibimos el evento click de filtro
ulFiltros.addEventListener('click', (event) =>{

const filtro = event.target.text;
 if(!filtro){
	 return ;
 }

 anchorFiltros.forEach(elem => elem.classList.remove('selected'));
 event.target.classList.add('selected');

 for(const elemento of divTodoList.children){
	 elemento.classList.remove('hidden');
	 const completado = elemento.classList.contains('completed');
	
	switch( filtro){

		case 'Pendientes':
		if(completado){
			elemento.classList.add('hidden');
		}
		break;

		case 'Completados':
		if(!completado){
			elemento.classList.add('hidden');
		}
		break;

	}

	}
});