import { useSelector } from 'react-redux/es/hooks/useSelector';
import { motion } from "framer-motion"

import Input from './components/Input';
import List from './components/List';
import styled from 'styled-components';



function App() {

  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filter); 
  
  const filteredTodoList = todoList.filter((item) => {
    const status = filterStatus === 'completed' ? true : false;

    if(filterStatus === 'all'){
      return true;
    }

    return item.completed === status;
  });

  


  return (
    <AppContainer>
        <TodoContainer>
        <Input />
        <Divider />
        <Todo>
          {filteredTodoList.map((todo, index) => (
              <List key={todo.id} todo={todo} index={index} />
          ))}
        </Todo>
      </TodoContainer> 
    </AppContainer>
       
  );
}

const Todo = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 103px);
  overflow-y: overlay;
  margin: 0 -20px;
  padding: 0 20px;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #d7d7d7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(to top, #209cff 0%, #68e0cf 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const TodoContainer = styled.div`
  max-width: 760px;
  width: 100%;
  height: 70vh;
  border-radius: 10px;
  background-color: var(--bg-body);
  box-shadow: 0 8px 30px -7px rgb(0 0 0 / 26%);
  padding: 20px;
`

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #eee;
  margin: 25px 0;
`

export default App;
