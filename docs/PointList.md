# PointList class
This document describes the `PointList` class. It lives in the `Plotter` namespace.

## Constructor
Creates a new point list that contains the points that are drawn on the canvas.

Syntax:
```
const pointList = new Plotter.PointList()
```

Arguments: none.

Returns:
* `PointList`: a new instance of `Plotter.PointList`

## Instance properties
All properties have corresponding getters and setters which you can use to read or write the properties' values. The setters return the instance of the point itself.

* `array<Point> points`: the list of points (default: `[]`).

## Instance methods
Along with the getters and setters, the `PointList` class has the following methods:

#### `addPoint`
Adds a point to the point list.

Syntax:
```
PointList pointList.addPoint(Point point)
```

Arguments:
* `Point point`: the point to be added

Returns:
* `PointList`: the same instance of `PointList`

#### `addPoints`
Adds points to the point list.

Syntax:
```
PointList pointList.addPoints(Point... points)
```

Arguments:
* `Point... points`: an arbitrary amount of points to be added

Returns:
* `PointList`: the same instance of `PointList`

#### `sort`
Bring the points in the list into a special order.

Syntax:
```
PointList pointList.sort(((Point a, Point b) => number) sortingFunction = PointList.prototype.defaultSortingFunction)
```

Arguments:
* `((Point a, Point b) => number) sortingFunction` (optional): a function that determines the order the point's will be brought into be returning the result of a comparison between two points. More on this topic: [MDN on `Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

Returns:
* `PointList`: the same instance of `PointList`

#### `defaultSortingFunction`
Compares two points.

Syntax:
```
number pointList.defaultSortingFunction(Point a, Point b)
```

Arguments:
* `Point a, Point b`: two points that should be compared

Returns:
* `number`: the result of the comparison

#### `getMinimumX, getMaximumX, getMinimumY, getMaximumY`
Returns the minimum or maximum extent of the points in the list in x or y direction.

Syntax:
```
number pointList.getMinimumX()
number pointList.getMaximumX()
number pointList.getMinimumY()
number pointList.getMaximumY()
```

Arguments: none.

Returns:
* `number`: the minimum or maximum extent of the points in the list in x or y direction
