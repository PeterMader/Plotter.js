const Plotter = class {

  constructor (canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('Plotter: Expected argument 1 to be a HTMLCanvasElement.')
    }

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.pointList = new Plotter.PointList()

    this.positionX = 10
    this.positionY = 10
    this.width = canvas.width - this.positionX * 2
    this.height = canvas.height - this.positionY * 2
    this.pointSize = 2
    this.lineWidth = 1
    this.barWidth = 15
    this.scaleX = this.width / canvas.width
    this.scaleY = this.height / canvas.height
    this.color = this.ctx.fillStyle
    this._lastColor = this.color
    this._baseLine = this.height
  }

  getCanvas () {
    return this.canvas
  }

  getCanvasContext () {
    return this.ctx
  }

  getPointList () {
    return this.pointList
  }

  setPointList (pointList) {
    if (pointList instanceof Plotter.PointList) {
      this.pointList = pointList
    } else {
      throw new TypeError('Plotter.prototype.setPointLust: Expected argument 1 to be an instance of PointList.')
    }
    return this
  }

  getWidth () {
    return this.width
  }

  setWidth (width) {
    if (typeof width === 'number' && width >= 0) {
      this.width = width
    } else {
      throw new TypeError('Plotter.prototype.setWidth: Expected argument 1 to be a positive number or 0.')
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
      throw new TypeError('Plotter.prototype.setHeight: Expected argument 1 to be a positive number or 0.')
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
      throw new TypeError('Plotter.prototype.setPositionX: Expected argument 1 to be a number.')
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
      throw new TypeError('Plotter.prototype.setPositionY: Expected argument 1 to be a number.')
    }
    return this
  }

  center () {
    this.positionX = (this.canvas.width - this.width) / 2
    this.positionY = (this.canvas.height - this.height) / 2
    return this
  }

  getPointSize () {
    return this.pointSize
  }

  setPointSize (pointSize) {
    if (typeof pointSize === 'number' && pointSize >= 0) {
      this.pointSize = pointSize
    } else {
      throw new TypeError('Plotter.prototype.setPointSize: Expected argument 1 to be a positive number or 0.')
    }
    return this
  }

  getLineWidth () {
    return this.lineWidth
  }

  setLineWidth (lineWidth) {
    if (typeof lineWidth === 'number' && lineWidth >= 0) {
      this.lineWidth = lineWidth
    } else {
      throw new TypeError('Plotter.prototype.setLineWidth: Expected argument 1 to be a positive number or 0.')
    }
    return this
  }

  getBarWidth () {
    return this.barWidth
  }

  setBarWidth (barWidth) {
    if (typeof barWidth === 'number' && barWidth >= 0) {
      this.barWidth = barWidth
    } else {
      throw new TypeError('Plotter.prototype.setBarWidth: Expected argument 1 to be a positive number or 0.')
    }
    return this
  }

  getScaleX () {
    return this.scaleX
  }

  setScaleX (scaleX) {
    if (scaleX === Plotter.SCALE_TO_FIT) {
      const min = this.pointList.getMinimumX()
      const max = this.pointList.getMaximumX()
      this.scaleX = this.width / (max - min)
      this.positionX -= min * this.scaleX
      return this
    }
    if (typeof scaleX === 'number') {
      this.scaleX = scaleX
    } else {
      throw new TypeError('Plotter.prototype.setScaleX: Expected argument 1 to be a number.')
    }
    return this
  }

  getScaleY () {
    return this.scaleY
  }

  setScaleY (scaleY) {
    if (scaleY === Plotter.SCALE_TO_FIT) {
      const min = this.pointList.getMinimumY()
      const max = this.pointList.getMaximumY()
      if (min < 0) {
        this.scaleY = this.height / (max - min)
        this._baseLine = this.height + min * this.scaleY
      } else {
        this.scaleY = this.height / max
        this._baseLine = this.height
      }
      return this
    }
    if (typeof scaleY === 'number') {
      this.scaleY = scaleY
    } else {
      throw new TypeError('Plotter.prototype.setScaleY: Expected argument 1 to be a number.')
    }
    return this
  }

  getColor () {
    return this.color
  }

  setColor (color) {
    this.color = this.ctx.strokeStyle = this.ctx.fillStyle = color
    return this
  }

  drawBarChart (pointList) {
    const {ctx, barWidth} = this
    let index

    ctx.fillStyle = this.color
    ctx.textAlign = 'center'
    const points = (pointList instanceof Plotter.PointList ? pointList : this.pointList).getPoints()

    for (index in points) {
      const point = points[index]
      const pointColor = point.getColor()
      const pointLabel = point.getLabel()

      // transform the point coordinates
      const x = point.x * this.scaleX + this.positionX - barWidth / 2
      const width = barWidth
      const y = this._baseLine - point.y * this.scaleY + this.positionY
      const height = point.y * this.scaleY

      // maybe set the fill color to the point's color
      if (pointColor !== Plotter.DEFAULT_COLOR && pointColor !== Plotter.LAST_COLOR && pointColor !== this._lastColor) {
        ctx.fillStyle = this._lastColor = pointColor
      } else if (pointColor === Plotter.DEFAULT_COLOR) {
        ctx.fillStyle = this._lastColor = this.color
      }

      // draw the point's label
      if (pointLabel !== '') {
        ctx.fillText(pointLabel, x + barWidth / 2, point.y < 0 ? y + 13 : (y - 3)) // this is assuming a font size of 10px.
      }

      // draw the bar
      ctx.fillRect(x, y, width, height)
    }

    return this
  }

  drawLineChart (pointList) {
    const {ctx, pointSize} = this
    let lastX = 0, lastY = 0, isFirstPoint = true
    let index

    ctx.fillStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.textAlign = 'left'
    const points = (pointList instanceof Plotter.PointList ? pointList : this.pointList).getPoints()

    for (index in points) {
      const point = points[index]
      const pointColor = point.getColor()
      const pointLabel = point.getLabel()

      // transform the point coordinates
      const x = point.x * this.scaleX + this.positionX
      const y = this._baseLine - point.y * this.scaleY + this.positionY

      // maybe set the fill color to the point's color
      if (pointColor !== Plotter.DEFAULT_COLOR && pointColor !== Plotter.LAST_COLOR && pointColor !== this._lastColor) {
        ctx.fillStyle = this._lastColor = pointColor
        if (this.shouldInterpolate) {
          ctx.strokeStyle = pointColor
        }
      } else if (pointColor === Plotter.DEFAULT_COLOR) {
        ctx.fillStyle = this._lastColor = this.color
        if (this.shouldInterpolate) {
          ctx.strokeStyle = this.color
        }
      }

      // draw the point's label
      if (pointLabel !== '') {
        ctx.fillText(pointLabel, x + pointSize, y)
      }

      // draw the line from the last point to this point
      if (this.lineWidth > 0 && !isFirstPoint) {
        ctx.beginPath()
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(x, y)
        ctx.stroke()
      }

      // draw the point
      ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize)

      lastX = x
      lastY = y
      isFirstPoint = false
    }

    return this
  }

  drawXAxis (name) {
    const {ctx} = this
    ctx.textAlign = 'right'
    if (name) {
      ctx.fillText(name.toString(), this.positionX + this.width, this._baseLine + this.positionY + this.lineWidth / 2 + 13)
    }
    ctx.fillRect(this.positionX, this._baseLine + this.positionY - this.lineWidth / 2, this.width, this.lineWidth)
    return this
  }

  drawYAxis (name) {
    const {ctx} = this
    ctx.textAlign = 'left'
    if (name) {
      ctx.fillText(name.toString(), this.positionX + 5 + this.lineWidth / 2, this.positionY + 10)
    }
    ctx.fillRect(this.positionX, this.positionY, this.lineWidth, this.height)
    return this
  }

}

Plotter.DEFAULT_COLOR = Symbol('Default color')
Plotter.LAST_COLOR = Symbol('Last color')
Plotter.SCALE_TO_FIT = Symbol('Scale to fit')
