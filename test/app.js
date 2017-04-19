document.addEventListener('DOMContentLoaded', () => {

  const points = []
  let i
  for (i = 0; i < Math.PI * 4; i += .3) {
    const point = new Plotter.Point({
      x: i,
      y: Math.sin(i) * i
    })
    point.setColor(Math.sin(i) * i >= 0 ? Plotter.DEFAULT : 'red')
    const index = points.push(point)
  }

  const diagram = new Plotter.Diagram(document.getElementById('canvas'))
  diagram.getPointList().setPoints(points)

  diagram
      .setWidth(600)
      .setScaleX(Plotter.SCALE_TO_FIT)
      .setHeight(300)
      .setScaleY(Plotter.SCALE_TO_FIT)
      .setPositionY(50)
      .center()

  const months = 'JFMAMJJASOND'.split('')

  const xAxis = new Plotter.Axis()
  xAxis
      .setName('X Axis')
      .setLineWidth(2)
      .gridLines.setColor('#BBBBBB')
  months.forEach((month, index) => xAxis.addLabelAtPosition(month, index + .5))
  diagram.setXAxis(xAxis).drawXAxis()

  const yAxis = new Plotter.Axis()
  yAxis
      .setName('Y Axis')
      .setLineWidth(2)
      .generateLabelsUntil(diagram.getPointList().getMaximumY())
      .generateLabelsUntil(-diagram.getPointList().getMaximumY())
      .gridLines.setColor('#BBBBBB')
  diagram.setYAxis(yAxis).drawYAxis()

  diagram.setColor('blue').setLineWidth(1).setPointSize(4).drawLineChart()

})
