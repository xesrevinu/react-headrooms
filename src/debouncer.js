const requestAnimationFrame_ = typeof window === 'object' ? window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame : function () {}

/**
 * Handles debouncing of events via requestAnimationFrame
 * @see http://www.html5rocks.com/en/tutorials/speed/animations/
 * @param {Function} callback The callback to handle whichever event
 */
class Debouncer {
  constructor (callback) {
    this.callback = callback
    this.ticking = false
  }
  /**
   * dispatches the event to the supplied callback
   * @private
   */
  update () {
    this.callback && this.callback()
    this.ticking = false
  }
  /**
   * ensures events don't get stacked
   * @private
   */
  requestTick () {
    if (!this.ticking) {
      requestAnimationFrame_(this.rafCallback || (this.rafCallback = this.update.bind(this)))
      this.ticking = true
    }
  }
  /**
   * Attach this as the event listeners
   */
  handleEvent () {
    this.requestTick()
  }
}

export default Debouncer
