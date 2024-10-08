import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {changeAnecdote, getAll} from "./services/anecdotes.js"
import {showNotification, useNotificationDispatch} from "./NotificationContext.jsx"

const App = () => {
  const dispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })


  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: changeAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    showNotification(dispatch,`voted for ${anecdote.content}`, 5000)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  if ( result.isPending ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server (womp womp)</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
