import './typer.css'

const Typer = ({ typing, paragraph, correct }) => {

    return(
        <div>
        {paragraph.split('').map((char, index) => {
            if (index < correct.length) {
                return (
                    <span key={index} className="correct">
                    {char}
                </span>
                )
            }

            if (index < correct.length + typing.length) {
                const typedChar = typing[index - correct.length]
                if (typedChar === char) {
                    return (
                    <span key={index} className="correct">
                        {char}
                    </span>
                    )
                }
                return (
                    <span key={index} className="incorrect">
                    {char}
                    </span>
                )
            }

            return (
            <span key={index} className="neutral">
                {char}
            </span>
            )
        })}
    </div>
    )
}

export default Typer