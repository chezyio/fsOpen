import React, { useState } from 'react'


const Button = ({ label, handleClick }) => {
  return (
    <button onClick={handleClick}>{label}</button>
  )
}


const Statistics = ({ text, value }) => {

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </>
  )


}





const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const onGood = () => {
    setGood(good + 1);
    console.log(good);
  };

  const onNeutral = () => {
    setNeutral(neutral + 1);
  };

  const onBad = () => {
    setBad(bad + 1);
  };

  const total = good + neutral + bad
  const average = ((1 * good) + neutral + (-1 * bad)) / total
  const positive = good / total * 100 + '%'

  return (
    <div>
      <h1>give feedback</h1>
      <Button label='good' handleClick={onGood} />
      <Button label='neutral' handleClick={onNeutral} />
      <Button label='bad' handleClick={onBad} />

      <h1>statistics</h1>
      {good != 0 || neutral != 0 || bad != 0 ?
        <>
          <Statistics text='good' value={good} />
          <Statistics text='neutral' value={neutral} />
          <Statistics text='bad' value={bad} />
          <Statistics text='average' value={average} />
          <Statistics text='positive' value={positive} />
        </>

        : 'No feedback given'}




    </div>
  )
}

export default App