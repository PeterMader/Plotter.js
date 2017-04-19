Plotter.CanvasImage = class extends Plotter.DataConsumer {

  constructor (canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('CanvasImage: Expected argument 1 to be a HTMLCanvasElement.')
    }

    super()

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.positionX = 10
    this.positionY = 10

    this.width = canvas.width - this.positionX * 2
    this.height = canvas.height - this.positionY * 2
  }

  getCanvas () {
    return this.canvas
  }

  getCanvasContext () {
    return this.ctx
  }

  getWidth () {
    return this.width
  }

  setWidth (width) {
    if (typeof width === 'number' && width >= 0) {
      this.width = width
    } else {
      throw new TypeError('CanvasImage.prototype.setWidth: Expected argument 1 to be a positive number or 0.')
    }
    return this
  }

  getHeight () {
    return this.height
  }

  setHeight (height) {
    if (typeof height === 'number' && height >= 0) {
      this.height = height
    } else {
      throw new TypeError('CanvasImage.prototype.setHeight: Expected argument 1 to be a positive number or 0.')
    }
    return this
  }

  getPositionX () {
    return this.positionX
  }

  setPositionX (positionX) {
    if (typeof positionX === 'number') {
      this.positionX = positionX
    } else {
      throw new TypeError('CanvasImage.prototype.setPositionX: Expected argument 1 to be a number.')
    }
    return this
  }

  getPositionY () {
    return this.positionY
  }

  setPositionY (positionY) {
    if (typeof positionY === 'number') {
      this.positionY = positionY
    } else {
      throw new TypeError('CanvasImage.prototype.setPositionY: Expected argument 1 to be a number.')
    }
    return this
  }

  center () {
    this.positionX = (this.canvas.width - this.width) / 2
    this.positionY = (this.canvas.height - this.height) / 2
    return this
  }

}
