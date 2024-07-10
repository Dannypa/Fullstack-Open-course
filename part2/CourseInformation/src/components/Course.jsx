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

export default Course
