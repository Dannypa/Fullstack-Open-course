const Header = ({ coursename }) => {
  return <h1>{coursename}</h1>
}

const Part = ({ name, exerciseNumber }) => {
  return (
    <p>
      {name} {exerciseNumber}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part {...parts[0]} />
      <Part {...parts[1]} />
      <Part {...parts[2]} />
    </div>
  )
}

const Total = ({ number }) => {
  return <p>Number of exercises {number}</p>
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total
        number={course.parts.reduce((current, el) => current + el.exercises, 0)}
      />
    </div>
  )
}

export default App
