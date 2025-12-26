import './typer.css'

const Typer = ({ typing, paragraph }) => {

    const charColors = paragraph.split('').map((char, index) => {

        if (index < typing.length) {

            if (typing[index] === char) {
                return <span key={index} className='correct'>{char}</span>
            }
            
            if (char === ' ') {
                return (
                    <span key={index} className="incorrect">{typing[index]}</span>
                )
            }

            return <span key={index} className='incorrect'>{char}</span>
        }
        return <span key={index} style={{ color: 'white' }}>{char}</span>
        })

    return(
        <div>
            {charColors}
        </div>
    )
}

export default Typer