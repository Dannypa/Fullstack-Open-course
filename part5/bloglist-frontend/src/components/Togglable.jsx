import { useState } from 'react'

const Togglable = (props) => {
    const [hidden, setHidden] = useState(true)

    const showWhenHidden = () => ({ display: hidden ? '' : 'none' })
    const hideWhenHidden = () => ({ display: hidden ? 'none' : '' })

    const toggleVisibility = () => setHidden(!hidden)

    return (
        <div>
            <button style={showWhenHidden()} onClick={toggleVisibility}>{props.label}</button>
            <div style={hideWhenHidden()}>
                {props.children} <br/> <br/>
                <button onClick={toggleVisibility}>hide</button>
            </div>
        </div>
    )
}

export default Togglable