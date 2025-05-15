// models/Prop.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  playerId: { type: Number, required: true },
  teamId: { type: Number, required: true },
  positionAbbr: { type: String, required: true },
  name: { type: String, required: true },
  teamAbbr: { type: String, required: true },
  opponentAbbr: { type: String, required: true },
  srId: { type: String, required: true },
  headshot: { type: String, required: true },
  isHome: { type: Boolean, required: true },
  _id: { type: String, required: true }
});

const choiceSchema = new mongoose.Schema({
  abbr: { type: String, enum: ['O', 'U'], required: true },
  name: { type: String, enum: ['Over', 'Under'], required: true },
  result: { type: String, default: '' },
  currentStats: { type: String, default: '0' },
  selected:{type:Boolean,default:false,required:true},
  _id: { type: String, required: true }
});

const bidStatsSchema = new mongoose.Schema({
  scoringId: { type: Number, required: true },
  name: { type: String, required: true },
  value: { type: String, required: true },
  scoringKey: { type: String, required: true },
  originalValue: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
  eventId: { type: Number, required: true },
  srId: { type: String, required: true },
  name: { type: String, required: true },
  startTime: { type: Number, required: true },
  ownTeam: { type: String, required: true },
  opponentTeam: { type: String, required: true }
});

const gamingSchema = new mongoose.Schema({
  gameId: { type: Number, required: true },
  lockTime: { type: Number, required: true },
  isSeasonal: { type: Boolean, required: true },
  isPromo: { type: Boolean, required: true },
  propStatus: { type: String, enum: ['open', 'closed'], required: true },
  question: { type: String, required: true },
  players: { type: [playerSchema], required: true },
  choices: { type: [choiceSchema], required: true },
  bidStats: { type: bidStatsSchema, required: true },
  event: { type: eventSchema, required: true },
  status: { type: Number, enum: [0, 1], required: true }, // assuming 0: inactive, 1: active
  promoLimit: { type: Number, default: 0 },
  marketId: { type: String, required: true },
  epMarketID: { type: String, required: true },
  round: { type: Number, required: true },
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  propId: { type: Number, required: true }
});

module.exports = mongoose.model('gaming',gamingSchema );
