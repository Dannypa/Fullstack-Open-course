const Header = (props) => {
  return <h1>{props.coursename}</h1>
}

const Content = (props) => {
  const contents = []
  for (const part of props.parts) {
    contents.push(
      <p>
        {part.name} {part.exerciseNumber}
      </p>
    )
  }
  return contents
}

const Total = (props) => {
  return <p>Number of exercises {props.number}</p>
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
