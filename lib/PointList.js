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
