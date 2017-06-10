import React from 'react'
import { compose, withHandlers } from 'recompose'
import PropTypes from 'prop-types'

import Card from '../Card'

import './Board.css'

export const Board = ({cards, getCardOnClickHandler, getCardStatus, getShouldShowCard}) => (
  <div className='Board center'>
    <div className='flex flex-wrap justify-center'>
      {cards.map((card, key) => (
        <Card
          key={key}
          icon={card.icon}
          status={getCardStatus(card)}
          shown={getShouldShowCard(card)}
          onClick={getCardOnClickHandler(card)}
        />
      ))}
    </div>
  </div>
)

Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    type: PropTypes.string
  })),
  getCardOnClickHandler: PropTypes.func,
  getCardStatus: PropTypes.func,
  getShouldShowCard: PropTypes.func
}

export const BoardHOC = compose(
  withHandlers({
    getCardStatus: ({picks, revealed}) => card => {
      if (revealed.includes(card)) {
        return 'revealed'
      } else if (!picks.includes(card)) {
        if (picks.includes(null)) {
          return 'default'
        } else {
          return 'disabled'
        }
      } else if (picks.includes(card)) {
        if (picks.find(c => c && c.icon !== card.icon)) {
          return 'unmatched'
        } else {
          return 'picked'
        }
      }
    },
    getCardOnClickHandler: ({picks, revealed, onCardClick}) => card => {
      return (picks.includes(card) || revealed.includes(card)) || !picks.includes(null)
        ? e => e
        : () => onCardClick(card)
    },
    getShouldShowCard: ({picks, revealed}) => card => {
      return picks.includes(card) || revealed.includes(card)
    }
  })
)

export default BoardHOC(Board)
