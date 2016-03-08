import React, { Component, PropTypes as Types } from 'react'
import Debouncer from './debouncer'
import classnames from 'classnames'

/**
 * Helper function for normalizing tolerance option to object format
 */
function normalizeTolerance (t) {
  return t === Object(t) ? t : { down: t, up: t }
}

const initialState = {
  pinned: false,
  unpinned: false,
  top: false,
  notTop: false,
  bottom: false,
  notBottom: false,
  initial: false
}

class Headroom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initialised: false,
      lastKnownScrollY: 0,
      classes: initialState
    }
    this.scroller = null
    this.debouncer = null
    this.classes = this.props.classes
    this.tolerance = normalizeTolerance(this.props.tolerance)
    this.update = this.update.bind(this)
    this.attachEvent = this.attachEvent.bind(this)
  }
  componentDidMount () {
    this.setState({
      classes: {
        ...this.state.classes,
        initial: true
      }
    })
    this.scroller = this.props.scroller || window
    this.debouncer = new Debouncer(this.update)
    setTimeout(this.attachEvent, 100)
  }
  componentWillUnmount () {
    this.setState({
      initialised: false,
      classes: initialState
    })
    this.scroller.removeEventListener('scroll', this.debouncer, false)
  }
  /**
   * Attaches the scroll event
   * @private
   */
  attachEvent () {
    if (!this.initialised) {
      this.setState({
        initialised: true,
        lastKnownScrollY: this.getScrollY()
      })
      this.scroller.addEventListener('scroll', this.debouncer, false)
      this.debouncer.handleEvent()
    }
  }
  /**
   * Unpins the header if it's currently pinned
   */
  unpin () {
    const classList = this.state.classes
    if (classList.pinned || !classList.unpinned) {
      this.setState({
        classes: {
          ...classList,
          unpinned: true,
          pinned: false
        }
      })
      this.props.onUnpin && this.props.onUnpin.apply(this)
    }
  }
  /**
   * Pins the header if it's currently unpinned
   */
  pin () {
    const classList = this.state.classes

    if (classList.unpinned) {
      this.setState({
        classes: {
          ...classList,
          pinned: true,
          unpinned: false
        }
      })
      this.props.onPin && this.props.onPin.apply(this)
    }
  }
  /**
  * Handles the top states
  */
  top () {
    const classList = this.state.classes
    if (!classList.top) {
      this.setState({
        classes: {
          ...classList,
          top: true,
          notTop: false
        }
      })
      this.props.onTop && this.props.onTop.apply(this)
    }
  }
  /**
   * Handles the not top state
   */
  notTop () {
    const classList = this.state.classes
    if (!classList.notTop) {
      this.setState({
        classes: {
          ...classList,
          notTop: true,
          top: false
        }
      })
      this.props.onNotTop && this.props.onNotTop.apply(this)
    }
  }
  bottom () {
    const classList = this.state.classes
    if (!classList.bottom) {
      this.setState({
        classes: {
          ...classList,
          bottom: true,
          notBottom: false
        }
      })
      this.props.onBottom && this.props.onBottom.apply(this)
    }
  }
  /**
   * Handles the not top state
   */
  notBottom () {
    const classList = this.state.classes
    if (!classList.notBottom) {
      this.setState({
        classes: {
          ...classList,
          notBottom: true,
          bottom: false
        }
      })
      this.props.onNotBottom && this.props.onNotBottom.apply(this)
    }
  }
  /**
  * Gets the Y scroll position
  * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
  * @return {Number} pixels the page has scrolled along the Y-axis
  */
  getScrollY () {
    return (this.scroller.pageYOffset !== undefined)
      ? this.scroller.pageYOffset
      : (this.scroller.scrollTop !== undefined)
        ? this.scroller.scrollTop
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
  }
  /**
   * Gets the height of the viewport
   * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
   * @return {int} the height of the viewport in pixels
   */
  getViewportHeight () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
  /**
   * Gets the physical height of the DOM element
   * @param  {Object}  elm the element to calculate the physical height of which
   * @return {int}     the physical height of the element in pixels
   */
  getElementPhysicalHeight (elm) {
    return Math.max(
      elm.offsetHeight,
      elm.clientHeight
    )
  }
  /**
   * Gets the physical height of the scroller element
   * @return {int} the physical height of the scroller element in pixels
   */
  getScrollerPhysicalHeight () {
    return (this.scroller === window || this.scroller === document.body)
      ? this.getViewportHeight()
      : this.getElementPhysicalHeight(this.scroller)
  }
  /**
   * Gets the height of the DOM element
   * @param  {Object}  elm the element to calculate the height of which
   * @return {int}     the height of the element in pixels
   */
  getElementHeight (elm) {
    return Math.max(
      elm.scrollHeight,
      elm.offsetHeight,
      elm.clientHeight
    )
  }
  /**
   * Gets the height of the document
   * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
   * @return {int} the height of the document in pixels
   */
  getDocumentHeight () {
    const body = document.body
    const documentElement = document.documentElement

    return Math.max(
      body.scrollHeight, documentElement.scrollHeight,
      body.offsetHeight, documentElement.offsetHeight,
      body.clientHeight, documentElement.clientHeight
    )
  }

  /**
   * Gets the height of the scroller element
   * @return {int} the height of the scroller element in pixels
   */
  getScrollerHeight () {
    return (this.scroller === window || this.scroller === document.body)
      ? this.getDocumentHeight()
      : this.getElementHeight(this.scroller)
  }
  /**
   * determines if the scroll position is outside of document boundaries
   * @param  {int}  currentScrollY the current y scroll position
   * @return {bool} true if out of bounds, false otherwise
   */
  isOutOfBounds (currentScrollY) {
    const pastTop = currentScrollY < 0
    const pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight()

    return pastTop || pastBottom
  }
  /**
   * determines if the tolerance has been exceeded
   * @param  {int} currentScrollY the current scroll y position
   * @return {bool} true if tolerance exceeded, false otherwise
   */
  toleranceExceeded (currentScrollY, direction) {
    return Math.abs(currentScrollY - this.state.lastKnownScrollY) >= this.tolerance[direction]
  }
  /**
   * determine if it is appropriate to unpin
   * @param  {int} currentScrollY the current y scroll position
   * @param  {bool} toleranceExceeded has the tolerance been exceeded?
   * @return {bool} true if should unpin, false otherwise
   */
  shouldUnpin (currentScrollY, toleranceExceeded) {
    const scrollingDown = currentScrollY > this.state.lastKnownScrollY
    const pastOffset = currentScrollY >= this.props.offset

    return scrollingDown && pastOffset && toleranceExceeded
  }
  /**
   * determine if it is appropriate to pin
   * @param  {int} currentScrollY the current y scroll position
   * @param  {bool} toleranceExceeded has the tolerance been exceeded?
   * @return {bool} true if should pin, false otherwise
   */
  shouldPin (currentScrollY, toleranceExceeded) {
    const scrollingUp = currentScrollY < this.state.lastKnownScrollY
    const pastOffset = currentScrollY <= this.props.offset

    return (scrollingUp && toleranceExceeded) || pastOffset
  }
  update () {
    const currentScrollY = this.getScrollY()
    const scrollDirection = currentScrollY > this.state.lastKnownScrollY ? 'down' : 'up'
    const toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection)
    // Ignore bouncy scrolling in OSX
    if (this.isOutOfBounds(currentScrollY)) {
      return
    }
    if (currentScrollY <= this.props.offset) {
      this.top()
    } else {
      this.notTop()
    }

    if (currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
      this.bottom()
    } else {
      this.notBottom()
    }

    if (this.shouldUnpin(currentScrollY, toleranceExceeded)) {
      this.unpin()
    } else if (this.shouldPin(currentScrollY, toleranceExceeded)) {
      this.pin()
    }

    this.setState({
      lastKnownScrollY: currentScrollY
    })
  }
  render () {
    const cNames = this.props.classes
    const sNames = this.state.classes
    const t = {}
    Object.keys(cNames).map(k => {
      t[cNames[k]] = sNames[k]
    })
    const cName = classnames(t)
    const children = React.cloneElement(this.props.children, {
      className: cName + ' ' + this.props.children.props.className
    })
    return children
  }
}
Headroom.propTypes = {
  children: Types.element.isRequired,
  classes: Types.object,
  scroller: Types.object,
  tolerance: Types.any,
  offset: Types.number,
  onNotBottom: Types.func,
  onBottom: Types.func,
  onNotTop: Types.func,
  onTop: Types.func,
  onUnpin: Types.func,
  onPin: Types.func
}
Headroom.defaultProps = {
  classes: {
    pinned: 'headroom--pinned',
    unpinned: 'headroom--unpinned',
    top: 'headroom--top',
    notTop: 'headroom--not-top',
    initial: 'headroom'
  },
  tolerance: {
    up: 0,
    down: 0
  },
  offset: 0
}

export default Headroom
