import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ title, statistic }) => (
  <>
    {title} {statistic} <br />
  </>
)

const Statistics = ({ statistics }) => {
  // i do not want to write bad code.
  let total = 0
  // the following snippet gets total number of feedbacks independent of the index of the "all" entry in the prop
  statistics.forEach(({ title, statistic }) => {
    if (title == "all") {
      total = statistic
    }
  })
  if (total == 0) {
    return <p>No feedback given</p>
  } else {
    return statistics.map((el) => StatisticLine(el))
  }
}

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
      <Statistics
        statistics={[
          { title: "good", statistic: good },
          { title: "neutral", statistic: neutral },
          { title: "bad", statistic: bad },
          { title: "all", statistic: total },
          { title: "average", statistic: ((good - bad) / total).toFixed(3) },
          {
            title: "positive",
            statistic: ((good * 100) / total).toFixed(3).toString() + "%",
          },
        ]}
      />
    </div>
  )
}

export default App
