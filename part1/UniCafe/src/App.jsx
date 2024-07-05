import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ title, statistic }) => (
  <>
    {title} {statistic} <br />
  </>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => setGood(good + 1)
  const handleNeutralFeedback = () => setNeutral(neutral + 1)
  const handleBadFeedback = () => setBad(bad + 1)

  const total = good + neutral + bad
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodFeedback} text="good" />
      <Button onClick={handleNeutralFeedback} text="neutral" />
      <Button onClick={handleBadFeedback} text="bad" />
      <h1> statistics </h1>
      <Statistic title="good" statistic={good} />
      <Statistic title="neutral" statistic={neutral} />
      <Statistic title="bad" statistic={bad} />
      <Statistic title="all" statistic={total} />
      <Statistic
        title="average"
        statistic={((good - bad) / total).toFixed(3)}
      />
      <Statistic
        title="positive"
        statistic={((good * 100) / total).toFixed(3).toString() + "%"}
      />
    </div>
  )
}

export default App
