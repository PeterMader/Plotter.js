# Diagram class
[Home](./)

This article describes the `Diagram` class.

> This article is incomplete.

## Constructor
Creates a new diagram that operates on a canvas.

Syntax:
```
const diagram = new Plotter.Diagram(HTMLCanvasElement canvas)
```

Arguments:
* `HTMLCanvasElement canvas`: the canvas the diagram will draw on.

Returns:
* `Diagram`: a new instance of `Diagram`

## Instance properties
All properties have corresponding getters and setters which you can use to read or write the properties' values. The setters return the instance of the diagram itself.

* `PointList pointList`: describes the data the diagram draws (default: `new PointList()`).
* `length width`: the width of the chart that will be drawn (default: `<canvas>.width - <positionX> * 2`).
* `length height`: the height of the chart that will be drawn (default: `<canvas>.height - <positionY> * 2`).
* `number positionX`: the position of the chart in the canvas in x direction (default: `10`).
* `number positionY`: the position of the chart in the canvas in y direction (default: `10`).
* `length pointSize`: the width and height of points in a line chart (default: `2`).
* `length lineWidth`: the width of lines in a line chart (default: `1`).
* `length barWidth`: the width of bars in a bar chart (default: `15`).
* `number scaleX`: the scaling factor of charts in x direction (default: `1`).
* `number scaleY`: the scaling factor of charts in y direction (default: `1`).
* `cssColor color`: the default color for chart contents and axes (default: `<ctx>.fillColor`).

## Instance methods
Along with the getters and setters, the `Diagram` class has the following methods:

#### `getCanvas`
Returns the diagram's `canvas` element.

Syntax:
```
HTMLCanvasElement diagram.getCanvas()
```

Arguments: none.

Returns:
* `HTMLCanvasElement`: the diagram's `canvas` element

#### `getCanvasContext`
Returns the diagram's canvas rendering context.

Syntax:
```
CanvasRenderingContext2D diagram.getCanvasContext()
```

Arguments: none.

Returns:
* `CanvasRenderingContext2D`: the diagram's canvas rendering context

#### `center`
Centers the chart in the canvas by setting the diagram's `positionX` and `positionY` property.

Syntax:
```
Diagram diagram.center()
```

Arguments: none.

Returns:
* `Diagram`: the same instance of `Diagram`

#### `drawBarChart`
Draws a bar chart on the canvas.

Syntax:
```
Diagram diagram.drawBarChart([PointList pointList = diagram.pointList])
```

Arguments:
* `PointList pointList` (optional): the `PointList` that should be drawn. If omitted, the diagram's internal `pointList` property is used.

Returns:
* `Diagram`: the same instance of `Diagram`

#### `drawLineChart`
Draws a line chart on the canvas.

Syntax:
```
Diagram diagram.drawLineChart([PointList pointList = diagram.pointList])
```

Arguments:
* `PointList pointList` (optional): the `PointList` that should be drawn. If omitted, the diagram's internal `pointList` property is used.

Returns:
* `Diagram`: the same instance of `Diagram`

#### `drawXAxis`

Draws a x axis on the baseline of the canvas (the line where points that have a y value of zero are drawn).

Syntax:
```
Diagram diagram.drawXAxis([string name = ''])
```

Arguments:
* `string name` (optional): the label of the x axis. It is drawn on the right side of the chart.

Returns:
* `Diagram`: the same instance of `Diagram`

#### `drawYAxis`

Draws a y axis on the left side of the canvas (the line where points that have a x value of zero are drawn).

Syntax:
```
Diagram diagram.drawYAxis([string name = ''])
```

Arguments:
* `string name` (optional): the label of the y axis. It is drawn at the top of the chart.

Returns:
* `Diagram`: the same instance of `Diagram`
