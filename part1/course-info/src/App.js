import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return <h1>{props.course}</h1>
  }


  const Content = ({ parts }) => {

    return (
      <>
        <Part part={parts[0]} />
        <Part part={parts[1]} />
        <Part part={parts[2]} />

      </>
    )
  }

  const Part = (props) => {

    return (
      <>
        <p>{props.part.name} {props.part.exercises}</p>
      </>
    )
  }

  const Total = (props) => {
    return (
      <>
        <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>

      </>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App