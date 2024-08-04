const Anecdote = ({ anecdote }) => {
    if (anecdote === null) return <div>no anecdote here.</div>

    return <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes </p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a> </p>
    </div>
}

export default Anecdote