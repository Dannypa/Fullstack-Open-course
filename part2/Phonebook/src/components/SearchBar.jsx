const SearchBar = ({ setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <p>
      Filter shown with <input onChange={handleFilterChange}></input>
    </p>
  )
}
export default SearchBar
