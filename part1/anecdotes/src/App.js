import React, { useState } from 'react'


const Button = ({ label, handleClick }) => {
  return (
    <button onClick={handleClick}>{label}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [key, setKey] = useState(0)
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 })


  const length = anecdotes.length

  const getRandomInt = (max) => {
    const random = Math.floor(Math.random() * max);
    setKey(random)
    return random
  }

  const setVote = () => {
    const copy = { ...points }
    copy[key] += 1
    setPoints(copy)
  }


  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[key]} votes</p>
      <Button label='next anecdote' handleClick={() => setSelected(getRandomInt(length))} />
      <Button label='vote' handleClick={setVote} />

      <p>{anecdotes[Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b)]} <br />
        has {Object.values(points).reduce((a, b) => a > b ? a : b)} votes
      </p>
    </div>
  )
}

export default App