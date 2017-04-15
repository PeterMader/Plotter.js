Plotter.Point = class {

  constructor (options) {
    this.x = 0
    this.y = 0
    this.color = Plotter.DEFAULT_COLOR
    this.label = ''

    if (typeof options === 'object') {
      this.setPosition(options.x || 0, options.y || 0).setColor(options.color || Plotter.DEFAULT_COLOR).setLabel(options.label || '')
    }
  }

  clone () {
    return new Plotter.Point(this)
  }

  getPositionX () {
    return this.x
  }

  getPositionY () {
    return this.y
  }

  setPosition (x, y) {
    if (typeof x === 'number' && typeof y === 'number') {
      this.x = x
      this.y = y
    } else {
      throw new TypeError('Point.prototype.setPosition: Expected arguments 1 and 2 to be numbers.')
    }
    return this
  }

  getColor () {
    return this.color
  }

  setColor (color) {
    this.color = color
    return this
  }

  getLabel () {
    return this.label
  }

  setLabel (label) {
    if (typeof label !== 'undefined') {
      this.label = label.toString()
    } else {
      throw new TypeError('Point.prototype.setLabel: Expected argument 1 to be a string.')
    }
    return this
  }

}
