import { useState, useEffect } from 'react'
import data from './data/paragraphs.json'
import Input from './components/Input'
import Timer from './components/Timer'
import Typer from './components/Typer'
import './App.css'

function App() {

  const texts = data.paragraphs
  const [paragraph, setParagraph] = useState(() => {
    return texts[Math.floor(Math.random() * texts.length)].text
  })
  const [seconds, setSeconds] = useState(60)
  const [start, setStart] = useState(false)
  const [typing, setTyping] = useState('')
  const words = paragraph.split(' ')
  const [count, setCount] = useState(0)
  const targetWord = words[count] + ' '
  const [correct, setCorrect] = useState('')

  useEffect(() => {
    setCount(0)
    setCorrect('')
    setTyping('')
  }, [paragraph])

  const newGame = () => {
    setParagraph(texts[Math.floor(Math.random() * texts.length)].text)
    setStart(false)
    setSeconds(60)
  }

  return(
    <div className='game-box'>
      <div className='timer'>
      <Timer startTime={start} seconds={seconds} setSeconds={setSeconds}/>
      </div>
      <div className='textbox'>
        <div className='text'>
          <Typer typing={typing} paragraph={paragraph} correct={correct}/>
        </div>
      </div>
      <div className='input'>
      <Input
        typing={typing}
        targetWord={targetWord}
        setCorrect={setCorrect}
        setCount={setCount}
        setTyping={setTyping}
        setStart={setStart}
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
