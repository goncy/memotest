import React from 'react'
import PropTypes from 'prop-types'
import { compose, mapProps } from 'recompose'

import './Card.css'

export const Card = ({onClick, styles}) => (
  <article
    className={`Card mw5 bg-white br3 pa3 ma1 ${styles.card}`}
    onClick={onClick}
  >
    <div className='tc flex justify-center items-center'>
      <div className={`br-100 h4 w4 ba pa2 flex justify-center items-center ${styles.circle}`}>
        <i className={styles.icon} />
      </div>
    </div>
  </article>
)

Card.propTypes = {
  onClick: PropTypes.func,
  styles: PropTypes.object
}

export const CardHOC = compose(
  mapProps(({status, shown, icon, onClick}) => {
    let styles

    switch (status) {
      case 'unmatched':
        styles = {
          card: 'bg-light-red ba b--white',
          circle: 'b--white',
          icon: 'white'
        }
        break
      case 'picked':
        styles = {
          card: 'bg-light-blue ba b--white',
          circle: 'b--white',
          icon: 'white'
        }
        break
      case 'revealed':
        styles = {
          card: 'bg-light-green ba b--white',
          circle: 'b--white',
          icon: 'white'
        }
        break
      case 'disabled':
        styles = {
          card: 'ba b--black-10',
          circle: 'b--black-10',
          icon: 'black'
        }
        break
      default:
        styles = {
          card: 'hover-bg-light-gray grow pointer ba b--black-10',
          circle: 'b--black-10',
          icon: 'black'
        }
        break
    }

    if (shown) {
      styles = {
        ...styles,
        card: styles.card + ' flipped',
        icon: styles.icon + ` fa fa-${icon}`
      }
    } else {
      styles = {
        ...styles,
        icon: styles.icon + ' fa fa-question'
      }
    }

    return {
      styles,
      onClick
    }
  })
)

export default CardHOC(Card)
