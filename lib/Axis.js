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
