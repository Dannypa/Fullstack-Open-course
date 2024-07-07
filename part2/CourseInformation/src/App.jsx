const Header = ({ coursename }) => {
  return <h2>{coursename}</h2>
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
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <div>
      <h1>Web development curriculum </h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App
