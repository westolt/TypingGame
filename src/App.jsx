import { useState, useEffect, useRef } from 'react'
import data from './data/paragraphs.json'
import Input from './components/Input'
import Typer from './components/Typer'
import scoreService from './services/scores'
import './App.css'

function App() {
  const urlParams = new URLSearchParams(window.location.search)
  const gameId = Number(urlParams.get('id'))

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
  const startTimeRef = useRef(null)
  const [currentWpm, setCurrentWpm] = useState(0)
  const [finalWpm, setFinalWpm] = useState(0)
  const [selectedTextId, setSelectedTextId] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      scoreService.setToken(user.token)
    }
  }, [])

  const resetGame = () => {
    setCount(0)
    setCorrect('')
    setTyping('')
    startTimeRef.current = null
    setCurrentWpm(0)
    setFinalWpm(0)
  }

  const handleTyping = async (value) => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now()
    }

    const firstErrorIndex = value.split('').findIndex((char, i) => (
      char !== targetWord[i]
    ))

    if (firstErrorIndex !== -1 && value.length > firstErrorIndex + 1) {
      return
    }

    if (value === targetWord) {
        
      const now = performance.now()
      const elapsedMinutes = (now - startTimeRef.current) / 1000 / 60
      
      setCorrect(prev => {
        const newCorrect = prev + value

        const chars = newCorrect.length
        const wpmNow = (chars / 5) / elapsedMinutes

        if (elapsedMinutes < 0.03) {
          setCurrentWpm(0)
        } else {
          setCurrentWpm(Math.round(wpmNow))
        }

        return newCorrect
      })

      if (count + 1 === words.length) {
        const endTime = performance.now()
        const durationMinutes = (endTime - startTimeRef.current) / 1000 / 60
        const totalChars = (correct + value).length
        const wpm = (totalChars / 5) / durationMinutes

        const finalScore = Math.round(wpm)
        setFinalWpm(finalScore)

        try {
          await scoreService.sendScore({ score: finalScore, gameId: gameId })
        } catch (err) {
          console.log('Error sending score: ', err)
        }
      }

      setCount(prev => prev + 1)
      setTyping('')
    } else {
      setTyping(value)
    }
  }

  const random = () => {
    let index = Math.floor(Math.random() * texts.length)
    if (texts[index].text === paragraph) {
      index = (index + 1) % texts.length
    }
    setParagraph(texts[index].text)
    setSelectedTextId('')
    resetGame()
  }

  const restart = () => {
    resetGame()
    setSelectedTextId('')
  }

  const choose = (id) => {
    setSelectedTextId(id)

    const selected = texts.find(text => text.id === Number(id))
    if (selected) {
      setParagraph(selected.text)
      resetGame()
    }
  }

  return(
    <div className='game-box'>
      <div className='wpm'>
        <div>{finalWpm ? finalWpm : currentWpm} wpm</div>
      </div>
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
        <button className='restart' onClick={restart}>
          Restart
        </button>
        <button className='random' onClick={random}>
          Random
        </button>
        <select value={selectedTextId} className='choose' onChange={e => choose(e.target.value)}>
          <option value='' disabled>Choose text</option>
          {texts.map(text => (
            <option key={text.id} value={text.id}>
              {text.name}
            </option>
          ))}
        </select>
      </div>
  </div>
  )
}

export default App
