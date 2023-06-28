import React, { useState, useEffect } from 'react'
import { socket } from '../constants'
import Button from 'react-bootstrap/Button'
import { cid } from '../constants'

export default function StartBtn({ game }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let allReady = true
    game.players.forEach(player => {
      if (!player.isReady) {
        allReady = false
      }
    })
    if (!game.isStarted) {
      setShow(allReady)
    }
  }, [game])

  function start() {
    socket.emit('timer', { cid, gid: game._id })
    setShow(false)
  }

  return (
    <>
      {show
        ? <Button className="mt-2" style={{width: '8rem'}} variant="danger" onClick={start}>Start</Button>
        : <div style={{height: '2.9rem'}}></div>
      }
    </>
  )
}