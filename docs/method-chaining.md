# Method chaining
Every method in `Plotter.js` returns the object it operates on. This is not true if it would not make sense to do so (e.g. getter methods). This feature simplifies API calls on the same object. For example, instead of writing this:
```JavaScript
const canvas = diagram.getCanvas()
diagram.setColor('#5599FF') // call every method
diagram.setPointSize(5)     // in a separate
diagram.drawLineChart()     // statement
```
one could also write this:
```JavaScript
const canvas = diagram.getCanvas() // this cannot be part of the method chain
diagram.setColor('#5599FF').setPointSize(5).drawLineChart() // call the methods in a method chain
```
This works with the methods of the classes `Point` and `PointList`, as well:
```JavaScript
const maxY = pointList.addPoints(pointA, pointB).sort().getMaximumY()
```
Of course, you do not have to use this technique.
