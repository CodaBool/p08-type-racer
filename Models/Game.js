import mongoose from 'mongoose'

const PlayerSchema = new mongoose.Schema({
  percent: {type: Number, default: 0},
  givenUp: {type: Boolean, default: false},
  wpm: {type: Number, default: -1},
  name: {type: String},
  room: {type: String},
  cid: {type: String},
  sid: {type: String},
  isLeader: {type: Boolean, default: false},
  isWinner: {type: Boolean, default: false},
  wins: {type: Number, default: 0},
  isReady: {type: Boolean, default: false}
})

const GameSchema = new mongoose.Schema({
  _id: String,
  quote: {type: String},
  source: {type: String},
  words: {type: Number},
  speed: {type: String},
  isOpen: {type: Boolean, default: true},
  isOver: {type: Boolean, default: false},
  isStarted: {type: Boolean, default: false},
  isTypable: {type: Boolean, default: false},
  players: [PlayerSchema],
  startTime: {type: Number},
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: '45m' }
  }
})

export default mongoose.model('Game', GameSchema)