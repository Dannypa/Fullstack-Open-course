import { useState } from "react"

const Display = ({ counter }) => {
  return <div>{counter}</div>
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
    </div>
  )
}

export default App
