import React from 'react'
import { useDispatch } from 'react-redux'
import {
    createAnecdote
} from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";



const AnecdoteForm = (props) => {

    const dispatch = useDispatch()


    const addAnecdote = async (event) => {

        event.preventDefault();
        const content = event.target.newAnecdote.value;
        event.target.newAnecdote.value = "";

        dispatch(createAnecdote(content));

        dispatch(showNotification(`New anecdote was added: ${content}`, 5));
    };


    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="newAnecdote" /></div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
