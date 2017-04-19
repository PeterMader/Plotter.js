Plotter.Point = class extends Plotter.ImageComponent {

  constructor (options) {
    super()

    this.x = 0
    this.y = 0
    this.size = Plotter.DEFAULT
    this.label = ''

    if (typeof options === 'object') {
      this.setPosition(options.x || 0, options.y || 0).setLabel(options.label || '')
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

  getSize () {
    return this.size
  }

  setSize (size) {
    if (size === Plotter.DEFAULT) {
      this.size = size
      return this
    }
    if (typeof size === 'number' && size >= 0) {
      this.size = size
    } else {
      throw new TypeError('Point.prototype.setSize: Expected argument 1 to be a positive number or 0.')
    }
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
