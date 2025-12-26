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
  const targetWord = words[count] + ' '
  const [correct, setCorrect] = useState('')
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    setCount(0)
    setCorrect('')
    setTyping('')
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
        setCorrect(prev => prev + value)
        setCount(prev => prev + 1)
        setTyping('')

        if (count + 1 === words.length) {
          console.log('END!!')
          const endTime = performance.now()
          const durationMinutes = (endTime - startTime) / 1000 / 60
          const wordCount = words.length
          const wpm = wordCount / durationMinutes
          console.log('WPM:', wpm.toFixed(2))
      }
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
