import { useState } from "react"

// generates a random number in the (closed) interval [0; b]
const randInt = (upper) => Math.round(Math.random() * upper)

const VoteDisplay = ({ voteNumber }) => (
  <p>This anecdote has {voteNumber} votes.</p>
)

const AnecdoteDisplay = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>This anecdote has {votes} votes.</p>
  </>
)

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleSelect = () => setSelected(randInt(anecdotes.length - 1))
  const handleVote = () => {
    const copiedVotes = [...votes]
    copiedVotes[selected]++
    setVotes(copiedVotes)
  }

  const getAnecdoteComponent = (index) => (
    <AnecdoteDisplay anecdote={anecdotes[index]} votes={votes[index]} />
  )

  let mostVoteIndex = 0
  for (let i = 1; i < votes.length; i++) {
    if (votes[i] > votes[mostVoteIndex]) {
      mostVoteIndex = i
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {getAnecdoteComponent(selected)}
      <button onClick={handleSelect}>next (if you are lucky) anecdote</button>
      <button onClick={handleVote}>vote for this anecdote</button>
      <h1>Anecdote with most votes</h1>
      {getAnecdoteComponent(mostVoteIndex)}
    </div>
  )
}

export default App
