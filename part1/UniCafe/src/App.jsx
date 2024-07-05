import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ title, number }) => (
  <p>
    {title} {number}
  </p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => setGood(good + 1)
  const handleNeutralFeedback = () => setNeutral(neutral + 1)
  const handleBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodFeedback} text="good" />
      <Button onClick={handleNeutralFeedback} text="neutral" />
      <Button onClick={handleBadFeedback} text="bad" />
      <h1> statistics </h1>
      <Statistic title="good" number={good} />
      <Statistic title="neutral" number={neutral} />
      <Statistic title="bad" number={bad} />
    </div>
  )
}

export default App
