import { useEffect, useState } from 'react'

export const useCountry = (type) => {
    const [country, setCountry] = useState('')

    const onChange = (event) => {
        setCountry(event.target.value)
    }

    useEffect({
        
    }, [])



    return {
        type, country, onChange
    }
}