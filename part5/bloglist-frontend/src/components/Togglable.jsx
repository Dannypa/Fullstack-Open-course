import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
    const [hidden, setHidden] = useState(true)

    const showWhenHidden = () => ({ display: hidden ? '' : 'none' })
    const hideWhenHidden = () => ({ display: hidden ? 'none' : '' })

    const toggleVisibility = () => setHidden(!hidden)

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <button style={showWhenHidden()} onClick={toggleVisibility}>
                {props.label}
            </button>
            <div style={hideWhenHidden()}>
                {props.children} <br /> <br />
                <button onClick={toggleVisibility}>hide</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
}

export default Togglable
