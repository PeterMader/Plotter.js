# Getting started
[Home](./)

Embed Plotter.js in your web page by including the `Plotter.js` file. Example:
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo</title>

    <script src="path/to/Plotter.js" charset="utf-8"></script>

    <script type="text/javascript">
      document.addEventListener('DOMContentLoaded', () => {

        // JavaScript goes here

      })
    </script>
  </head>
  <body>
    <!-- HTML goes here, e.g. this canvas element -->
    <canvas id="canvas" width="300" height="300" style="background-color: lightgrey;"></canvas>
  </body>
</html>
```
Now create a new diagram and give it the canvas to operate on:
```JavaScript
const canvas = document.getElementById('canvas')
const diagram = new Plotter.Diagram(canvas)
```
Now give it some data to draw:
```JavaScript
const list = diagram.getPointList()
const point1 = new Plotter.Point({ x: 80, y: 100 })
const point2 = new Plotter.Point({ x: 150, y: 200 })
const point3 = new Plotter.Point({ x: 220, y: 150 })
list.addPoints(point1, point2, point3)
```
Finally, draw the points to the canvas:
```JavaScript
diagram.setColor('#5599FF')
diagram.setPointSize(5)
diagram.drawLineChart()
```
Result:

![Demo Result](demo-result.png)

[HTML](https://github.com/PeterMader/Plotter.js/blob/master/docs/demo.html)
