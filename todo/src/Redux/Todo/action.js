import {
    ADD_TODO,
    EDIT_ITEM,
    DEL_ITEM,
    CHECK_BOX,
    CLEAR_COMPLETE_TASK
} from './actionTypes'

export const addTodo = (payload) => ({
    type:ADD_TODO,
    payload:payload
}) 

export const editItem = (payload) => (
    {
    type:EDIT_ITEM,
    payload:payload
}) 

export const delItem = (payload) => ({
    type:DEL_ITEM,
    payload:payload
}) 

export const checkBox = (payload) => ({
    type:CHECK_BOX,
    payload:payload
}) 

export const clearCompleteTask = (payload) => ({
    type:CLEAR_COMPLETE_TASK,
    payload:payload
}) 