import { useState } from 'react'
import data from './data/paragraphs.json'
import Timer from './components/Timer'
import Typer from './components/Typer'
import Text from './components/Text'
import './App.css'

function App() {

  const texts = data.paragraphs
  const [paragraph, setParagraph] = useState(() => {
    return texts[Math.floor(Math.random() * texts.length)].text
  })
  const [seconds, setSeconds] = useState(60)
  const [start, setStart] = useState(false)
  const [typing, setTyping] = useState('')


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
      <div className='text'>
        <Text paragraph={paragraph}/>
        <div className='typer'>
          <Typer typing={typing} />
          </div>
      </div>
      <label>
          <input 
          type="text"
          value={typing}
          onChange={({ target }) => {
            setTyping(target.value)
            setStart(true)
          }}
          />
      </label>
      <div className='button-row'>
        <button className='new-game' onClick={newGame}>
        New game
      </button>
      </div>
  </div>
  )
}

export default App
