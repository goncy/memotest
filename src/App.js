import React, { Component } from 'react'

import ICONS from './icons.json'

import Board from './components/Board'

import './App.css'

const INITAL_CARDS_COUNT = 2
const INITIAL_LEVEL = 1

class App extends Component {
  constructor () {
    super()

    this.state = {
      level: INITIAL_LEVEL,
      cards: this.getCardsForLevel(INITIAL_LEVEL),
      revealed: [],
      firstPick: null,
      secondPick: null
    }
  }

  getCardsForLevel (level) {
    const cards = this.shuffleCards(ICONS).slice(0, level * INITAL_CARDS_COUNT)

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
    const {cards, level} = this.state

    if (revealed.length === cards.length) {
      setTimeout(() => {
        this.setState({
          level: level + 1,
          cards: this.getCardsForLevel(level + 1),
          revealed: [],
          firstPick: null,
          secondPick: null
        })
      }, 1000)
    }
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
    const {cards, revealed, firstPick, secondPick} = this.state

    return (
      <div className='App'>
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
