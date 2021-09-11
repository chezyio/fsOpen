import React, { useEffect } from "react";
import anecdoteService from "./services/anecdoteService";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

import AnecdoteForm from './components/AnecdoteForm';
import AnedoteList from './components/AnecdoteList';
import Notification from './components/Notification';


const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnedoteList />
      <AnecdoteForm />

    </div >
  )
}

export default App