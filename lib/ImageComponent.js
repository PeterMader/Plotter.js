Plotter.ImageComponent = class {

  constructor () {
    this.lineWidth = Plotter.DEFAULT
    this.visible = true
    this.color = Plotter.DEFAULT
  }

  getLineWidth () {
    return this.lineWidth
  }

  setLineWidth (lineWidth) {
    if (typeof lineWidth === 'number' && lineWidth >= 0) {
      this.lineWidth = lineWidth
    } else {
      throw new TypeError('ImageComponent.prototype.setLineWidth: Expected argument 1 to be a positive number or 0.')
    }
    return this
  }

  getVisible () {
    return this.visible
  }

  setVisible (visible) {
    this.visible = !!visible
    return this
  }

  getColor () {
    return this.color
  }

  setColor (color) {
    if (color === Plotter.DEFAULT) {
      this.color = color
      return this
    }
    if (typeof color === 'string' && color) {
      this.color = color
    } else {
      throw new TypeError('ImageComponent.prototype.setColor: Expected argument 1 to be a color string.')
    }
    return this
  }

}
