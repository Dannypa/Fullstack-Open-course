import { useState } from 'react'

export const useField = (type) => { // useless as fuck imo tho
    const [value, setValue] = useState('')

    const onChange = (event) =>  setValue(event.target.value)

    return {
        type,
        value,
        onChange
    }
}