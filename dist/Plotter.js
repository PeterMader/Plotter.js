// The global namespace for the Plotter.js library
const Plotter = {
  DEFAULT: Symbol('Plotter: Default value'),
  SCALE_TO_FIT: Symbol('Plotter: Scale to fit')
}
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
Plotter.DataConsumer = class extends Plotter.ImageComponent {

  constructor () {
    super()
    this.pointList = new Plotter.PointList()
  }

  getPointList () {
    return this.pointList
  }

  setPointList (pointList) {
    if (pointList instanceof Plotter.PointList) {
      this.pointList = pointList
    } else {
      throw new TypeError('DataConsumer.prototype.setPointLust: Expected argument 1 to be an instance of PointList.')
    }
    return this
  }

}
Plotter.Axis = class extends Plotter.DataConsumer {

  constructor (options) {
    super()
    this.name = ''
    this.gridLines = new Plotter.ImageComponent()
  }

  getName () {
    return this.name
  }

  setName (name) {
    if (typeof name !== 'undefined') {
      this.name = name.toString()
    } else {
      throw new TypeError('Axis.prototype.setName: Expected argument 1 to be a string.')
    }
    return this
  }

  addLabelAtPosition (label, position) {
    if (typeof label !== 'undefined' && typeof position === 'number') {
      this.pointList.addPoint(new Plotter.Point({
        x: position,
        label: label
      }))
    } else {
      throw new TypeError('Axis.prototype.addLabelAtPosition: Expected argument 1 to be a string and argument 2 to be a number.')
    }
    return this
  }

  generateLabelsUntil (limit, amountOfLabels) {
    if (typeof limit === 'number') {
      let amount = 0
      if (typeof amountOfLabels === 'number' && amountOfLabels > 0) {
        amount = amountOfLabels
      } else {
        amount = 5
      }
      let i
      const limitAbs = Math.abs(limit)
      const exponent = Math.floor(Math.log10(limitAbs))
      const power = Math.pow(10, exponent)
      const step = Math.round(limit / power) * power / amount
      const max = Math.abs(step * (amount - 1))
      for (i = step; Math.abs(i) <= max; i += step) {
        this.pointList.addPoint(new Plotter.Point({
          x: i,
          label: i.toFixed(2)
        }))
      }
    } else {
      throw new TypeError('Axis.prototype.generateLabelsUntil: Expected argument 1 to be a number.')
    }
    return this
  }

}
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
Plotter.PointList = class {

  constructor () {
    this.points = []
  }

  getPoints () {
    return this.points
  }

  setPoints (points) {
    if (Array.isArray(points) || points.all((point) => point instanceof Plotter.Point)) {
      this.points = points
    } else {
      throw new TypeError('PointList.prototype.setPoints: Expected argument 1 to be an array of points.')
    }
    return this
  }

  addPoint (point) {
    if (point instanceof Plotter.Point) {
      this.points.push(point)
    } else {
      throw new TypeError('PointList.prototype.addPoint: Expected argument 1 to be an instance of Point.')
    }
  }

  addPoints () {
    const points = Array.slice(arguments)
    let index
    for (index in points) {
      const point = points[index]
      if (point instanceof Plotter.Point) {
        this.points.push(point)
      } else {
        throw new TypeError(`PointList.prototype.addPoints: Expected argument ${index} to be an instance of Point.`)
      }
    }
    return this
  }

  addFromFlatArray (data) {
    if (Array.isArray(data)) {
      let i
      const {length} = data
      for (i = 0; i < length; i += 2) {
        const x = Number(data[i])
        const y = Number(data[i + 1])
        this.points.push(new Plotter.Point({x, y}))
      }
    } else {
      throw new TypeError(`PointList.prototype.addFromFlatArray: Expected argument 1 to be an array.`)
    }
  }

  getMinimumX () {
    const min = Math.min.apply(null, this.points.map((point) => point.x))
    return isFinite(min) ? min : 0
  }

  getMinimumY () {
    const min = Math.min.apply(null, this.points.map((point) => point.y))
    return isFinite(min) ? min : 0
  }

  getMaximumX () {
    return this.points.reduce((acc, point) => {
      return Math.max(acc, point.x)
    }, 1)
  }

  getMaximumY () {
    return this.points.reduce((acc, point) => {
      return Math.max(acc, point.y)
    }, 1)
  }

  defaultSortingFunction (a, b) {
    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0
  }

  sort (sortFunction) {
    this.points = this.points.sort(typeof sortFunction === 'function' ? sortFunction : this.defaultSortingFunction)
    return this
  }

}
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
