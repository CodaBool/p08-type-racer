import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Game from '../../Components/Game'
import Lobby from '../../Components/Lobby'
import { socket } from '../../constants'
import Cars from '../../Components/Cars'
import Chat from '../../Components/Chat'
import CountDown from '../../Components/CountDown'
import Stats from '../../Components/Stats'
import Navigation from '../../Components/Navigation'
import { cid } from '../../constants'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Loading = ({ msg }) => (
  <>
    <Spinner animation="border" variant="info" style={{margin: '20% auto 0 auto', display: 'block'}} />
    <h3 className="text-muted delayedFade mt-5 text-center">This game does not appear reachable</h3>
    <hr className="delayedFade w-50 mx-auto my-3" />
    <h4 className="text-center delayedFade mb-2">{msg}</h4>
  </>
)

let gid = ''

export default function Online() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [game, setGame] = useState({ gid: '', isOpen: false, isStarted: false, players: [] })
  const [gameStarted, setGameStarted] = useState(false)
  const [winner, setWinner] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    gid = searchParams.get("id")
  }, [searchParams])
  
  useEffect(() => {
    if (!localStorage.getItem('name')) {
      navigate('/')
    }

    socket.on('updateGame', (game) => {
      console.log('update game', game)
      setGame(game)
    })
    socket.on('timer', data => {
      // console.log('timer emitted', gameStarted)
      if (data.msg === 'Time Remaining' && !gameStarted) {
        // console.log('allow typing')
        setGameStarted(true)
      }
    })

    // TODO: should find a solution to not need client to finish the game for everyone
    socket.on('done', ({winnerID, game}) => {
      console.log('got a done', game._id, 'with winner', winnerID)
      setWinner(winnerID)
      setGameStarted(false)
      setGame(game)
      // set ready to false
      // set progress to false
    })

    socket.on('error', msg => {
      if (msg.includes('No game')) {
        setError(msg)
      } else if (msg.includes('already exists')) {
        setError(msg)
      }
    })

    if (gid) { // join existing game
      socket.emit('join-game', { gid, name: localStorage.getItem('name'), cid })
    } else { // new game or blocked join
      socket.emit('create-game', {name: localStorage.getItem('name'), cid})
    }

    return () => socket.removeAllListeners()
  }, [])

  return (
    <>
      <Navigation />
      <Container>
        {game._id == '' &&
          <Loading msg={error} />
        }
        {error && 
          <Row>
            <Button onClick={() => navigate('/')} variant="outline-secondary" className="mx-auto my-4 w-25 quickFade">Return to Menu</Button>
          </Row>
        }
        <Row>
          <Col md={8} className="">
            {(game._id && !game.isStarted) && <Lobby game={game} />}
            {game.isStarted && <CountDown />}
            {game._id !== '' && <Cars game={game} />}
            <Stats game={game} gameStarted={gameStarted} winner={winner} setWinner={setWinner} />
            {game.isStarted && <Game game={game} loading={Loading} />}
          </Col>
          <Col md={4} className="mt-4">
            {game._id !== '' && <Chat game={game} />}
          </Col>
        </Row>
      </Container>
    </>
  )
}
