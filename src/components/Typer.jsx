const Typer = ({ typing, paragraph }) => {

    const charColors = paragraph.split('').map((char, index) => {
        if (index < typing.length) {
            if (typing[index] === char) {
                return <span key={index} style={{ color: 'rgb(6,206,6)' }}>{char}</span>
            } else {
                return <span key={index} style={{ color: 'red' }}>{char}</span>
            }
        } else {
            return <span key={index} style={{ color: 'white' }}>{char}</span>
        }
    })

    return(
        <div>
            {charColors}
        </div>
    )
}

export default Typer