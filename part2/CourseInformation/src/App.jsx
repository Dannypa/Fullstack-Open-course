const Header = ({ coursename }) => {
  return <h1>{coursename}</h1>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} {...part} />
      ))}
    </div>
  )
}

const Total = ({ number }) => {
  return <b>total number of exercises {number}</b>
}

const Course = ({ course }) => {
  return (
    <>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total
        number={course.parts.reduce(
          (current, next) => current + next.exercises,
          0
        )}
      />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}

export default App
