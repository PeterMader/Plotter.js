# Plotter class
[Home](./index.md)

This document describes the `Plotter` class.

## Constructor
Creates a new plotter that operates on a canvas.

Syntax:
```
const plotter = new Plotter(HTMLCanvasElement canvas)
```

Arguments:
* `HTMLCanvasElement canvas`: the canvas the plotter will draw on.

Returns:
* `Plotter`: a new instance of `Plotter`

## Instance properties
All properties have corresponding getters and setters which you can use to read or write the properties' values. The setters return the instance of the plotter itself.

* `PointList pointList`: describes the data the plotter draws (default: `new PointList()`).
* `length width`: the width of the charts that will be drawn (default: `<canvas>.width - <positionX> * 2`).
* `length height`: the height of the charts that will be drawn (default: `<canvas>.height - <positionY> * 2`).
* `number positionX`: the position of the chart in the canvas in x direction (default: `10`).
* `number positionY`: the position of the chart in the canvas in y direction (default: `10`).
* `length pointSize`: the width and height of points in a line chart (default: `2`).
* `length lineWidth`: the width of lines in a line chart (default: `1`).
* `length barWidth`: the width of bars in a bar chart (default: `15`).
* `number scaleX`: the scaling factor of charts in x direction (default: `1`).
* `number scaleY`: the scaling factor of charts in y direction (default: `1`).
* `cssColor color`: the default color for chart contents and axes (default: `<ctx>.fillColor`).

## Instance methods
Along with the getters and setters, the `Plotter` class has the following methods:

#### `getCanvas`
Returns the plotter's `canvas` element.

Syntax:
```
HTMLCanvasElement plotter.getCanvas()
```

Arguments: none.

Returns:
* `HTMLCanvasElement`: the plotter's `canvas` element

#### `getCanvasContext`
Returns the plotter's canvas rendering context.

Syntax:
```
CanvasRenderingContext2D plotter.getCanvasContext()
```

Arguments: none.

Returns:
* `CanvasRenderingContext2D`: the plotter's canvas rendering context

#### `center`
Centers the chart in the canvas by setting the plotter's `positionX` and `positionY` property.

Syntax:
```
Plotter plotter.center()
```

Arguments: none.

Returns:
* `Plotter`: the same instance of `Plotter`

#### `drawBarChart`
Draws a bar chart on the canvas.

Syntax:
```
Plotter plotter.drawBarChart([PointList pointList = plotter.pointList])
```

Arguments:
* `PointList pointList` (optional): the `PointList` that should be drawn. If omitted, the plotter's internal `pointList` property is used.

Returns:
* `Plotter`: the same instance of `Plotter`

#### `drawLineChart`
Draws a line chart on the canvas.

Syntax:
```
Plotter plotter.drawLineChart([PointList pointList = plotter.pointList])
```

Arguments:
* `PointList pointList` (optional): the `PointList` that should be drawn. If omitted, the plotter's internal `pointList` property is used.

Returns:
* `Plotter`: the same instance of `Plotter`

#### `drawXAxis`

Draws a x axis on the baseline of the canvas (the line where points that have a y value of zero are drawn).

Syntax:
```
Plotter plotter.drawXAxis([string name = ''])
```

Arguments:
* `string name` (optional): the label of the x axis. It is drawn on the right side of the chart.

Returns:
* `Plotter`: the same instance of `Plotter`

#### `drawYAxis`

Draws a y axis on the left side of the canvas (the line where points that have a x value of zero are drawn).

Syntax:
```
Plotter plotter.drawYAxis([string name = ''])
```

Arguments:
* `string name` (optional): the label of the y axis. It is drawn at the top of the chart.

Returns:
* `Plotter`: the same instance of `Plotter`
