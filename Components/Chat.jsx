import React, { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Spinner from 'react-bootstrap/Spinner'
import { socket, cid } from '../constants'

export default function Chat({ game }) {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const player = game.players.find(player => player.cid === cid)
  const msgEl = useRef(null)

  useEffect(() => {
    socket.on('get-message', message => {
      receivedMessage(message)
    })
    return () => socket.removeAllListeners()
  }, [])

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message])
  }

  function sendMessage(e) {
    e.preventDefault()
    const messageObject = {
      body: message,
      author: player.name,
      gid: game._id,
      cid
    }
    setMessage('')
    socket.emit('send-message', messageObject)
  }

  useEffect(() => {
    if (messages && msgEl) {
      msgEl.current?.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
      });
    }
  }, [])

  function setMsg(e) {
    if (e.target.value.length < 400) {
      setMessage(e.target.value)
    }
  }

  if (!player) return (
    <>
      <Spinner animation="border" variant="info" style={{margin: '20% auto 0 auto', display: 'block'}} />
      <h4 className="delayedFade mt-5 text-center">Cannot connect to Chat</h4>
    </>
  )

  return (
    <div className="chat">
      <div className="messages" ref={msgEl}>
        {messages.length > 0 &&
          messages.map((message, index) => {
            if (message.cid === cid) {
              return (
                <p key={index} className="myMsg rounded text-right">
                  <span className="yourName">{message.author}: </span>
                  <span className=""> {message.body}</span>
                </p>
              )
            }
            return (
              <p key={index} className="otherMsg">
                <span className="otherName">{message.author}: </span>
                <span className=""> {message.body}</span>
              </p>
            )
          })
        }
      </div>
      <div className="chatControls mt-2">
        <Form onSubmit={sendMessage}>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Enter Message" onChange={setMsg} value={message ? message : ""} />
            <Button variant="outline-primary" type="submit">Send</Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}