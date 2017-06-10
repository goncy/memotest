import React from 'react'
import PropTypes from 'prop-types'
import { compose, mapProps } from 'recompose'

import './Card.css'

export const Card = ({onClick, styles, icon, shown}) => (
  <article
    className={`Card mw5 bg-white br3 pa3 ma1 ${styles.card} ${shown && 'flipped'}`}
    onClick={onClick}
  >
    <div className='flipper'>
      <div className='front'>
        <div className='tc flex justify-center items-center'>
          <div className='br-100 h4 w4 ba pa2 flex justify-center items-center b--black-10'>
            <i className='black fa fa-question' />
          </div>
        </div>
      </div>
      <div className='back'>
        <div className='tc flex justify-center items-center'>
          <div className='br-100 h4 w4 ba pa2 flex justify-center items-center b--white'>
            <i className={`white fa fa-${icon}`} />
          </div>
        </div>
      </div>
    </div>
  </article>
)

Card.propTypes = {
  onClick: PropTypes.func,
  styles: PropTypes.object,
  icon: PropTypes.string,
  shown: PropTypes.bool
}

export const CardHOC = compose(
  mapProps(({status, shown, icon, onClick}) => {
    let styles

    switch (status) {
      case 'unmatched':
        styles = {
          card: 'bg-light-red ba b--white'
        }
        break
      case 'picked':
        styles = {
          card: 'bg-light-blue ba b--white'
        }
        break
      case 'revealed':
        styles = {
          card: 'bg-light-green ba b--white'
        }
        break
      case 'disabled':
        styles = {
          card: 'ba b--black-10'
        }
        break
      default:
        styles = {
          card: 'hover-bg-light-gray grow pointer ba b--black-10'
        }
        break
    }

    return {
      styles,
      onClick,
      shown,
      icon
    }
  })
)

export default CardHOC(Card)
