import {useMutation, useQueryClient} from "@tanstack/react-query"
import {addAnecdote} from "../services/anecdotes.js"
import {showNotification, useNotificationDispatch} from "../NotificationContext.jsx"

const AnecdoteForm = () => {
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: addAnecdote,
        onSuccess: () => {
            console.log('got here')
            queryClient.invalidateQueries({queryKey: ['anecdotes']})
        },
        onError: () => {
            showNotification(dispatch, 'error! are you sure your anecdote is longer then 5 symbols?', 5000)
        }
    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
      newAnecdoteMutation.mutate(content)
      showNotification(dispatch,'created an anecdote', 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
