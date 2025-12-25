import { useState, useEffect } from 'react'

const Timer = ({ startTime, seconds }) => {
    const [time, setTime] = useState(seconds)

    useEffect(() => {
        setTime(seconds)
    }, [seconds])

    useEffect(() => {
        if (startTime) {
            const id = setInterval(() => {
                setTime(t => Math.max(t - 1, 0))
            }, 1000)

            return () => clearInterval(id)
        }
    }, [startTime])

    return <div>{time}</div>
}

export default Timer