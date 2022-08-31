import React from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { updateTodo, deleteTodo } from '../redux/todoSlice';
import styled from 'styled-components';
import { motion } from "framer-motion";

const List = ({todo, index}) => {

  const dispatch = useDispatch();

  const handleCheck = () => {
    dispatch(
      updateTodo({ ...todo, completed: !todo.completed })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteTodo(todo.id)
    );
  };



  return (
  <ListContainer initial={{ y: 20, opacity: 0 }} animate={{y: 0, opacity: 1}} transition={{duration: 0.3, delay: index * 0.03}}>
    <ListText completed={todo.completed}>{todo.text}</ListText>
    <ButtonContainer>
      {todo.completed && 
        <ButtonDelete onClick={handleDelete}><span className="material-symbols-outlined">delete</span></ButtonDelete>
      }

      <ButtonCheck completed={todo.completed} onClick={handleCheck}>
        {todo.completed && <ButtonIcon completed={todo.completed}><span className="material-symbols-outlined">done</span></ButtonIcon>  }
      </ButtonCheck>
    </ButtonContainer>

  </ListContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonCheck = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    background: var(--bg-default);
    border-radius: 50%;
    box-shadow: ${({completed}) => completed ? "0 3px 15px -1px rgb(55 215 178 / 60%)" : "0 3px 15px -1px rgb(0 0 0 / 15%)" };     
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    & .material-symbols-outlined {
      font-size: 20px;
      user-select: none;
    }
    
`;

const ButtonDelete = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    background: var(--bg-default);
    border-radius: 50%;
    box-shadow: 0 3px 15px -1px rgb(0 0 0 / 15%);     
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    margin-right: 12px;
    transition: all 150ms ease;
    &:hover {
      background: #ff6363;
      color: #fff;
      box-shadow: 0 3px 15px -1px rgb(255 99 99 / 60%);     
    }
    & .material-symbols-outlined {
      font-size: 20px;
      user-select: none;
    }
`;

const ButtonIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({completed}) => completed && "#37d7b2"};
  transform: scale(1);
  animation: check 150ms forwards;
  will-change: transform;
`

const ListText = styled.span`
    font-size:20px;
    line-height: 1;
    width: 100%;
    color: ${ ({completed}) => completed && '#cbcbcb'};
`

const ListContainer = styled(motion.div)`
  width: 100%;
  padding: 15px 20px;
  border-radius: 50px;
  background-color: var(--bg-default);
  box-shadow: 0 3px 15px -1px rgb(0 0 0 / 10%);
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

export default List