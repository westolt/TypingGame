const Input = ({ typing, handleTyping }) => {
    return(
        <div className='input'>
            <input 
            type="text"
            value={typing}
            onChange={({ target }) => handleTyping(target.value)}
            />
        </div>
    )
}

export default Input