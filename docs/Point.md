# Point class
[Home](./)

This document describes the `Point` class. It lives in the `Plotter` namespace.

## Constructor
Creates a new point that can be drawn on the canvas.

Syntax:
```
const point = new Plotter.Point([object options])
```

Arguments:
* `object options`: a dictionary object that contains 0. It may contain zero or more of the [properties](#properties) listed below.

Returns:
* `Point`: a new instance of `Plotter.Point`

## <a name="properties"></a>Instance properties
All properties have corresponding getters and setters which you can use to read or write the properties' values. The setters return the instance of the point itself.

* `number x`: describes the point's position in x direction (default: `0`; the setter for this property is `setPosition`).
* `number y`: describes the point's position in y direction (default: `0`; the setter for this property is `setPosition`).
* `cssColor color`: describes the point's color (default: the plotter's `color` property).
* `string label`: describes the point's label (default: `''`).

## Instance methods
Along with the getters and setters, the `Point` class has the following methods:

#### `setPosition`
Sets the point's position.

Syntax:
```
Point point.setPosition(number x, number y)
```

Arguments:
* `number x`: the point's new position in x direction
* `number y`: the point's new position in y direction

Returns:
* `Point`: the same instance of `Point`
