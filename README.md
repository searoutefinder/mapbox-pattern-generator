# 📙 Mapbox Pattern Generator - Create custom, dynamic fill patterns in Mapbox GL JS using the Canvas API

This repository demonstrates how to use the `generateNamedPattern` utility to create and register custom canvas-based fill patterns for Mapbox GL JS vector layers.

## 🔧 Function: `generateNamedPattern`

### Purpose

`generateNamedPattern` dynamically creates canvas-based fill patterns (like diagonal stripes, horizontal lines, vertical lines, etc.) and registers them to a running Mapbox GL JS map instance using `map.addImage`.

These named patterns can then be used in style layers via the `fill-pattern` paint property.

---

## 📆 Usage

### 1. Initialize a Mapbox map:

```js
const map = new mapboxgl.Map({
  container: "map",
  center: [-77.1945, 41.2033],
  zoom: 6,
  projection: "mercator"
});
```

### 2. Call `generateNamedPattern`:

```js
await generateNamedPattern(map, "diagonal_l", {
  backgroundColor: "#34eb46",
  lineColor: "#0d00ff",
  pattern: "diagonalLeft"
});
```

---

## 📖 Function Signature

```js
async function generateNamedPattern(map, patternName, patternOpts)
```

### Parameters

| Name          | Type           | Description                                  |
| ------------- | -------------- | -------------------------------------------- |
| `map`         | `MapboxGL.Map` | A Mapbox GL JS map instance.                 |
| `patternName` | `string`       | A unique name to register the pattern under. |
| `patternOpts` | `object`       | Configuration object defining the pattern.   |

### `patternOpts` object

| Property          | Type     | Required | Description                                                                             |
| ----------------- | -------- | -------- | --------------------------------------------------------------------------------------- |
| `backgroundColor` | `string` | No       | Hex color for the base layer (e.g., `#FFFFFF`).                                         |
| `lineColor`       | `string` | No       | Hex color for the pattern lines.                                                        |
| `pattern`         | `string` | No       | One of: `"diagonalLeft"`, `"diagonalRight"`, `"horizontal"`, `"vertical"`, or `"dots"`. |

---

## 🖌️ Supported Patterns

| Pattern Name    | Description                          |
| --------------- | ------------------------------------ |
| `diagonalLeft`  | Diagonal lines leaning to the left.  |
| `diagonalRight` | Diagonal lines leaning to the right. |
| `horizontal`    | Horizontal stripes.                  |
| `vertical`      | Vertical stripes.                    |
| `dots`          | *(Not yet implemented)*              |

---

## ✅ Example Usage with a Layer

Once patterns are registered, you can use them like this:

```js
map.addLayer({
  id: "test-lyr",
  type: "fill",
  source: "my-geojson-source",
  paint: {
    "fill-pattern": [
      "case",
      ["==", ["get", "STATE"], "39"], "red",
      ["==", ["get", "STATE"], "42"], "diagonal_l",
      "empty"
    ],
    "fill-opacity": 0.6,
    "fill-outline-color": "#000"
  }
});
```

---

## 📌 Notes

* `generateNamedPattern` returns a Promise that resolves to the created image.
* The image will not be added if an image with the same name already exists in the map.
* You must `await` the function before referencing the pattern name in your layers.

---

## 🛠️ Development Tips

* Patterns are drawn using a 100x100 canvas.
* Customize the shapes in `drawStripePoly` to define new stripe styles.
* Extend the `switch` block to add support for more patterns like `dots`, `crosshatch`, etc.

---

## 📄 License

MIT License. Free to use and modify.

---

## 👤 Author

Created by [Tamas Hajdu](https://ezmapdesign.com). Contributions welcome!
