import './typer.css'

const Typer = ({ typing, paragraph, correct, gameFont }) => {

    return(
        <div className='char'>
        {paragraph.split('').map((char, index) => {
            const currentPos = correct.length + typing.length

            if (index < correct.length) {
                return (
                    <span key={index} className={`correct ${gameFont ? `font-${gameFont.rewardId}` : ''}`}>
                    {char}
                </span>
                )
            }

            if (index < correct.length + typing.length) {
                const typedChar = typing[index - correct.length]
                if (typedChar === char) {
                    return (
                    <span key={index} className={`correct ${gameFont ? `font-${gameFont.rewardId}` : ''}`}>
                        {char}
                    </span>
                    )
                }
                if (char === ' ') {
                    return (
                    <span key={index} className="incorrect">
                    {typedChar + ' '}
                    </span>
                    )
                }
                return (
                    <span key={index} className="incorrect">
                    {char}
                    </span>
                )
            }

            if (index === currentPos) {
                return(
                    <span key={index} className='neutral cursor'>
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