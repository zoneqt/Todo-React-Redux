import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux/es/exports';
import { addTodo } from '../redux/todoSlice';
import Filter from '../components/Filter';

const Input = () => {

  const dispatch = useDispatch();

  const handleAdd = (e) => {
    console.log(e.target.value);
    if(e.key === 'Enter') {
      const newTodo = {
        id: Math.floor(Math.random() * 100000),
        completed: false,
        text: e.target.value
      }
  
      dispatch(addTodo(newTodo));

      e.target.value = "";
    }
  

  }

  return (
    <InputContainer>
      <InputAdd type={"text"} placeholder={"Add task.."} onKeyPress={e => handleAdd(e)} />
      <Filter />
    </InputContainer>
  )
}


const InputAdd = styled.input`
    outline: none;
    background: none;
    border: none;
    width: 100%;
    font-size: 20px;

`;

const InputContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  border-radius: 50px;
  background-color: var(--bg-default);
  box-shadow: 0 3px 15px -1px rgb(0 0 0 / 10%);
  display: flex;
  align-items: center;
`

export default Input