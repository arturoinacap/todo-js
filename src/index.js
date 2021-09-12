//importar la function
// ``import { TodoList } from './classes/todo-list.class.js';
// import { Todo } from './classes/todo.class.js';``
//import {saludar}  from './js/componentes.js';
import './styles.css';
import {Todo, TodoList} from './classes/index.class.js';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(todo =>crearTodoHtml(todo));

 
// crearTodoHtml.log('todos', todoList.todos);

console.log('todos', todoList.todos);