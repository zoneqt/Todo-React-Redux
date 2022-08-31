import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
    const localStorageData = localStorage.getItem('todo-list') || '[]';

    return JSON.parse(localStorageData);
}

const initialValue = {
    filter: 'all',
    todoList: getInitialTodo(),
  };


const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {            
            const localStorageData = localStorage.getItem('todo-list') || '[]';
            const localStorageDataArr = JSON.parse(localStorageData);

            localStorageDataArr.push({
                ...action.payload
            });

            localStorage.setItem('todo-list', JSON.stringify(localStorageDataArr));

            state.todoList.push(action.payload);
        },
        updateTodo: (state, action) => {
            const localStorageData = localStorage.getItem('todo-list') || '[]';
            const localStorageDataArr = JSON.parse(localStorageData);

            localStorageDataArr.forEach(todo => {
                if(todo.id === action.payload.id) {
                    todo.completed = action.payload.completed
                }
            });

            localStorage.setItem('todo-list', JSON.stringify(localStorageDataArr));

            state.todoList = [...localStorageDataArr];
        },
        deleteTodo: (state, action) => {
            const localStorageData = localStorage.getItem('todo-list') || '[]';
            const localStorageDataArr = JSON.parse(localStorageData);

            localStorageDataArr.forEach((todo, index) => {
                if (todo.id === action.payload) {
                    localStorageDataArr.splice(index, 1);
                }
              });

              localStorage.setItem('todo-list', JSON.stringify(localStorageDataArr));
              state.todoList = localStorageDataArr; 
          },
          updateFilter: (state, action) => {
            state.filter = action.payload;
          }
    }
})


export const { addTodo, updateTodo, deleteTodo, updateFilter } = todoSlice.actions;
export default todoSlice.reducer;