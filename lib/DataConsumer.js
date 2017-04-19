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
