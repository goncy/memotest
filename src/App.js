import React, { Component } from 'react'

import ICONS from './icons.json'

import Board from './components/Board'

import './App.css'

const CARDS_PER_LEVEL = 2
const INITIAL_LEVEL = 1

class App extends Component {
  constructor () {
    super()

    this.state = {
      level: INITIAL_LEVEL,
      levelStart: Date.now(),
      points: 0,
      cards: this.getCardsForLevel(INITIAL_LEVEL),
      revealed: [],
      firstPick: null,
      secondPick: null
    }
  }

  getCardsForLevel (level) {
    const cards = this.shuffleCards(ICONS).slice(0, level * CARDS_PER_LEVEL)

    const Acards = cards.map(card => ({icon: card, type: 'a'}))
    const Bcards = cards.map(card => ({icon: card, type: 'b'}))

    return this.shuffleCards([].concat(Acards, Bcards))
  }

  handleCardClick = card => {
    const {firstPick, secondPick} = this.state

    if (!firstPick) {
      this.setState({
        firstPick: card
      })
    } else if (!secondPick) {
      this.setState({
        secondPick: card
      })

      this.checkMatch(firstPick, card)
    }
  }

  checkMatch (firstPick, secondPick) {
    const {revealed} = this.state

    if (firstPick.icon === secondPick.icon) {
      this.setState({
        firstPick: null,
        secondPick: null,
        revealed: revealed.concat(firstPick, secondPick)
      })

      this.checkWin(revealed.concat(firstPick, secondPick))
    } else {
      setTimeout(() => {
        this.setState({
          firstPick: null,
          secondPick: null
        })
      }, 750)
    }
  }

  checkWin (revealed) {
    const {cards, level, levelStart} = this.state

    if (revealed.length === cards.length) {
      setTimeout(() => {
        this.setState({
          level: level + 1,
          levelStart: Date.now() + 1000,
          points: this.getPoints(Date.now() - levelStart),
          cards: this.getCardsForLevel(level + 1),
          revealed: [],
          firstPick: null,
          secondPick: null
        })
      }, 1000)
    }
  }

  getPoints (ms) {
    const {points: previousPoints, level} = this.state

    const levelPoints = Math.round(((((CARDS_PER_LEVEL * level) * 10000) - ms) * level) / 4)

    return previousPoints + (levelPoints < 0 ? 0 : levelPoints)
  }

  shuffleCards (array) {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  render () {
    const {cards, revealed, firstPick, secondPick, level, points} = this.state

    return (
      <div className='App vh-100 w-100'>
        <p className='pv2 center f3 helvetica ma0 b'>
          Nivel <span className='light-green'>{level}</span> - Puntos: <span className='light-green'>{points}</span>
        </p>
        <Board
          cards={cards}
          revealed={revealed}
          picks={[firstPick, secondPick]}
          onCardClick={this.handleCardClick}
        />
      </div>
    )
  }
}

export default App
