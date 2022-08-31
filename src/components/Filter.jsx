import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { updateFilter } from '../redux/todoSlice'
import { useDispatch } from 'react-redux/es/exports'

const Filter = () => {

    const [opened, setOpened ] = useState(false);
    const dropdownRef = useRef(); 

    const initialFilter = useSelector((state) => state.todo.filter);
    const [ filter, setFilter ] = useState(initialFilter);

    const dispatch = useDispatch();

    const updateFilterValue = (e) => {
        setFilter(e.target.attributes.getNamedItem("data-value").value);
        dispatch(
            updateFilter(e.target.attributes.getNamedItem("data-value").value)
        );
    }

    const toggleOpen = () => {
        setOpened(!opened);
    }

    useEffect(() => {
        const closeDropdown = (e) =>{
            if(e.path[0] !== dropdownRef.current){
                setOpened(false);

            }
        }

        document.body.addEventListener('click', closeDropdown);

        return () =>  document.body.removeEventListener('click', closeDropdown);
    }, []);

  return (
    <FilterContiner >
        <FilterCurrent ref={dropdownRef} onClick={toggleOpen}>{ filter }</FilterCurrent>
       {opened &&   
                <FilterList>
                    <FilterOption data-value='all' onClick={updateFilterValue}>All</FilterOption>
                    <FilterOption data-value='completed' onClick={updateFilterValue}>Completed</FilterOption>
                    <FilterOption data-value='incomplete' onClick={updateFilterValue}>Incomplete</FilterOption>
                </FilterList>
        }
        
    </FilterContiner>
  )
}

const FilterContiner = styled.div`
    width: 170px;
    background: #f3f3f3;
    position: relative;
    border-radius: 50px;
`
const FilterCurrent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #37d7b2;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;
`
const FilterList = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    box-shadow: 0 3px 15px -1px rgb(0 0 0 / 10%);
    z-index: 10;
    border-radius: 8px;
    margin-top: 10px;
`
const FilterOption = styled.div`
    padding: 10px;
    line-height: 1;
    text-align: center;
    font-size: 14px;
    font-weight: 900;
    text-transform: uppercase;
    color: #585858;
    cursor: pointer;
    &:hover {
        background: #f3f3f3;
    }
`

export default Filter