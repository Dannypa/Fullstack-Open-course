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
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header coursename={course} />
      <Content
        parts={[
          { name: part1, exerciseNumber: exercises1 },
          { name: part2, exerciseNumber: exercises2 },
          { name: part3, exerciseNumber: exercises3 },
        ]}
      />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
