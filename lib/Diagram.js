Plotter.Diagram = class extends Plotter.CanvasImage {

  constructor (canvas) {
    super(canvas)
    this.pointSize = 2
    this.lineWidth = 1

    this.fillStyle = this.strokeStyle = this.color = '#000000'
    this._lastLineWidth = this.lineWidth
    this._baseLine = this.height

    this.scaleX = this.width / canvas.width
    this.scaleY = this.height / canvas.height

    this.xAxis = null
    this.yAxis = null
  }

  getPointSize () {
    return this.pointSize
  }

  setPointSize (pointSize) {
    if (typeof pointSize === 'number' && pointSize >= 0) {
      this.pointSize = pointSize
    } else {
      throw new TypeError('Diagram.prototype.setPointSize: Expected argument 1 to be a positive number or 0.')
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
      throw new TypeError('Diagram.prototype.setLineWidth: Expected argument 1 to be a positive number or 0.')
    }
    return this
  }

  getScaleX () {
    return this.scaleX
  }

  setScaleX (scaleX) {
    if (scaleX === Plotter.SCALE_TO_FIT) {
      const min = Math.min(this.pointList.getMinimumX(), 0)
      const max = this.pointList.getMaximumX()
      if (min < 0) {
        this.scaleX = this.width / (max - min)
        this.positionX -= min * this.scaleX
      } else {
        this.scaleX = this.width / max
      }
      return this
    }
    if (typeof scaleX === 'number') {
      this.scaleX = scaleX
    } else {
      throw new TypeError('CanvasImage.prototype.setScaleX: Expected argument 1 to be a number.')
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
      throw new TypeError('CanvasImage.prototype.setScaleY: Expected argument 1 to be a number.')
    }
    return this
  }

  getXAxis () {
    return this.xAxis
  }

  setXAxis (xAxis) {
    if (xAxis instanceof Plotter.Axis) {
      this.xAxis = xAxis
    } else {
      throw new TypeError('Diagram.prototype.setXAxis: Expected argument 1 to be an instance of Axis.')
    }
    return this
  }

  getYAxis () {
    return this.yAxis
  }

  setYAxis (yAxis) {
    if (yAxis instanceof Plotter.Axis) {
      this.yAxis = yAxis
    } else {
      throw new TypeError('Diagram.prototype.setYAxis: Expected argument 1 to be an instance of Axis.')
    }
    return this
  }

  drawBarChart (pointList) {
    const {ctx} = this
    let index

    ctx.textAlign = 'center'
    const points = (pointList instanceof Plotter.PointList ? pointList : this.pointList).getPoints()

    for (index in points) {
      const point = points[index]
      const pointLabel = point.label

      // transform the point coordinates
      const width = point.lineWidth === Plotter.DEFAULT ? this.lineWidth : point.lineWidth
      const x = point.x * this.scaleX + this.positionX - width / 2
      const y = this._baseLine - point.y * this.scaleY + this.positionY
      const height = point.y * this.scaleY

      this._maybeSetColor(point.color, true)

      // draw the point's label
      if (pointLabel !== '') {
        ctx.fillText(pointLabel, x + width / 2, point.y < 0 ? y + 13 : (y - 3)) // this is assuming a font size of 10px.
      }

      // draw the bar
      ctx.fillRect(x, y, width, height)
    }

    return this
  }

  drawLineChart (pointList) {
    const {ctx} = this
    let lastX = 0, lastY = 0, isFirstPoint = true
    let index

    ctx.textAlign = 'left'
    const points = (pointList instanceof Plotter.PointList ? pointList : this.pointList).getPoints()

    for (index in points) {
      const point = points[index]
      const pointLabel = point.label
      const pointSize = point.size === Plotter.DEFAULT ? this.pointSize : point.size

      // transform the point coordinates
      const x = point.x * this.scaleX + this.positionX
      const y = this._baseLine - point.y * this.scaleY + this.positionY

      this._maybeSetColor(point.color, true)
      this._maybeSetLineWidth(point.lineWidth)

      // draw the point's label
      if (pointLabel !== '') {
        ctx.fillText(pointLabel, x + pointSize, y)
      }

      // draw the line from the last point to this point
      if (!isFirstPoint) {
        this._maybeSetColor(point.color, false)
        this._maybeSetLineWidth(point.lineWidth)
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

  drawXAxis () {
    const {ctx, xAxis} = this
    const lineWidth = xAxis.lineWidth === Plotter.DEFAULT ? this.lineWidth : xAxis.lineWidth
    const lineWidthHalf = lineWidth / 2

    // draw the axis labels
    ctx.textAlign = 'center'
    const points = xAxis.getPointList().getPoints()
    const y = this._baseLine + this.positionY + lineWidthHalf + 16
    const drawGridLines = xAxis.gridLines.visible
    const gridLinesColor = xAxis.gridLines.color
    const gridLinesWidth = xAxis.gridLines.lineWidth === Plotter.DEFAULT ? this.lineWidth : xAxis.gridLines.lineWidth
    let index
    for (index in points) {
      const point = points[index]
      const x = point.x * this.scaleX + this.positionX
      this._maybeSetColor(point.color, true)
      ctx.fillRect(x - lineWidthHalf, this._baseLine + this.positionY - lineWidthHalf, lineWidth, lineWidth + 5)
      if (point.label) {
        ctx.fillText(point.label, x, y)
      }
      if (drawGridLines) {
        this._maybeSetColor(gridLinesColor, true)
        ctx.fillRect(x - gridLinesWidth / 2, this.positionY, gridLinesWidth, this.height)
      }
    }

    // draw the axis itself
    this._maybeSetColor(xAxis.color, true)
    ctx.fillRect(this.positionX, this._baseLine + this.positionY - lineWidthHalf, this.width, lineWidth)
    if (xAxis.name) {
      ctx.textAlign = 'left'
      ctx.fillText(xAxis.name, this.positionX + this.width + 7, this._baseLine + this.positionY + 3)
    }
    return this
  }

  drawYAxis () {
    const {ctx, yAxis} = this
    const lineWidth = yAxis.lineWidth === Plotter.DEFAULT ? this.lineWidth : yAxis.lineWidth
    const lineWidthHalf = lineWidth / 2

    // draw the axis labels
    ctx.textAlign = 'right'
    const points = yAxis.getPointList().getPoints()
    const x = this.positionX
    const drawGridLines = yAxis.gridLines.visible
    const gridLinesColor = yAxis.gridLines.color
    const gridLinesWidth = yAxis.gridLines.lineWidth === Plotter.DEFAULT ? this.lineWidth : yAxis.gridLines.lineWidth
    let index
    for (index in points) {
      const point = points[index]
      const y = this._baseLine - point.x * this.scaleY + this.positionY
      this._maybeSetColor(point.color, true)
      ctx.fillRect(x - 5, y - lineWidthHalf, lineWidth + 5, lineWidth)
      if (point.label) {
        ctx.fillText(point.label, x - 8, y  + 3)
      }
      if (drawGridLines) {
        this._maybeSetColor(gridLinesColor, true)
        ctx.fillRect(this.positionX, y - gridLinesWidth / 2, this.width, gridLinesWidth)
      }
    }

    // draw the axis itself
    this._maybeSetColor(yAxis.color, true)
    ctx.fillRect(this.positionX, this.positionY, lineWidth, this.height)
    if (yAxis.name) {
      ctx.textAlign = 'center'
      ctx.fillText(yAxis.name, this.positionX + lineWidthHalf, this.positionY - 7)
    }
    return this
  }

  _maybeSetColor (color, fill) {
    const {ctx} = this
    const key = fill ? 'fillStyle' : 'strokeStyle'
    if (color !== this[key] || this.color !== this[key]) {
      this[key] = color
      if (color === Plotter.DEFAULT) {
        ctx[key] = this.color
      } else {
        ctx[key] = color
      }
    }
  }

  _maybeSetLineWidth (lineWidth) {
    if (lineWidth !== this._lastLineWidth || this.lineWidth !== this._lastLineWidth) {
      if (lineWidth === Plotter.DEFAULT) {
        this._lastLineWidth = this.ctx.lineWidth = this.lineWidth
      } else {
        this._lastLineWidth = this.ctx.lineWidth = lineWidth
      }
    }
  }

}
