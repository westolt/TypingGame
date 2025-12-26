const Input = ({ typing, targetWord, setCorrect, setCount, setTyping, setStart }) => {
    return(
        <div className='input'>
            <input 
            type="text"
            value={typing}
            onChange={({ target }) => {
                const value = target.value
                const firstErrorIndex = value
                .split('')
                .findIndex((char, i) => char !== targetWord[i])

                if (firstErrorIndex !== -1 && value.length > firstErrorIndex + 1) {
                return
                }

                if (value === targetWord) {
                    setCorrect(prev => prev + value)
                    setCount(prev => prev + 1)
                    setTyping('')
                } else {
                    setTyping(value)
                }
                setStart(true)
            }}
            />
        </div>
    )
}

export default Input