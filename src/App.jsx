import { useState, useEffect } from 'react'
import data from './data/paragraphs.json'
import Input from './components/Input'
import Typer from './components/Typer'
import './App.css'

function App() {

  const texts = data.paragraphs
  const [paragraph, setParagraph] = useState(() => {
    return texts[Math.floor(Math.random() * texts.length)].text
  })
  const [typing, setTyping] = useState('')
  const words = paragraph.split(' ')
  const [count, setCount] = useState(0)
  const isLastWord = count === words.length - 1
  const targetWord = isLastWord ? words[count] : words[count] + ' '
  const [correct, setCorrect] = useState('')
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    setCount(0)
    setCorrect('')
    setTyping('')
    setStartTime(null)
  }, [paragraph])

  const newGame = () => {
    setParagraph(texts[Math.floor(Math.random() * texts.length)].text)
  }

  const handleTyping = (value) => {
    if (!startTime) {
      setStartTime(performance.now())
      console.log('START!!')
    }

    const firstErrorIndex = value.split('').findIndex((char, i) => (
      char !== targetWord[i]
    ))

    if (firstErrorIndex !== -1 && value.length > firstErrorIndex + 1) {
    return
    }

    if (value === targetWord) {
        setCorrect(prev => {
          const newCorrect = prev + value

          if (count + 1 === words.length) {
            const endTime = performance.now()
            const durationMinutes = (endTime - startTime) / 1000 / 60
            const totalChars = newCorrect.length
            const wpm = (totalChars / 5) / durationMinutes
            console.log('Totall Chars: ', totalChars)
            console.log('correct words: ', newCorrect)
            console.log('Paragraph length: ', paragraph.length)
            console.log('WPM:', wpm.toFixed(0))
          }

          return newCorrect
        })
        setCount(prev => {
          console.log('New count:', prev + 1)
          return prev + 1
        })
        setTyping('')
    } else {
        setTyping(value)
    }
  }

  return(
    <div className='game-box'>
      <div className='textbox'>
        <div className='text'>
          <Typer typing={typing} paragraph={paragraph} correct={correct}/>
        </div>
      </div>
      <div>
      <Input
        typing={typing}
        handleTyping={handleTyping}
      />
      </div>
      <div className='button-row'>
        <button className='new-game' onClick={newGame}>
        New game
      </button>
      </div>
  </div>
  )
}

export default App
