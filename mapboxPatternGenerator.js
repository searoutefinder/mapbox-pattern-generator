        const generateNamedPattern = async (map, patternName, patternOpts) => {
          
          const isHexColor = (str) => {
            return /^#([0-9A-F]{3}){1,2}$/i.test(str)
          }

          const drawStripePoly = (ctx, points, color) => {
            ctx.beginPath()
            ctx.moveTo(points[0][0], points[0][1])

            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i][0], points[i][1])
            }

            ctx.closePath()
            ctx.fillStyle = color
            ctx.fill()
          }

          return new Promise((resolve, reject) => {

            // Create a canvas element
            const canvas = document.createElement("canvas")
            canvas.width = 100
            canvas.height = 100

            // Obtain the context
            const ctx = canvas.getContext("2d")
            ctx.fillStyle = patternOpts.backgroundColor
            ctx.fillRect(0, 0, 100, 100)

            if (
              patternOpts.backgroundColor === null &&
              patternOpts.lineColor === null
            ) {
              ctx.fillStyle = "rgba(0,0,0,0)"
              ctx.fillRect(0, 0, 100, 100)
            } else if ( 
              patternOpts.backgroundColor !== null && 
              isHexColor(patternOpts.backgroundColor) &&
              patternOpts.lineColor === null
            ) {
              ctx.fillStyle = bgColor
              ctx.fillRect(0, 0, 100, 100)
            } else if (
              patternOpts.backgroundColor !== null &&
              isHexColor(patternOpts.backgroundColor) &&
              patternOpts.lineColor !== null &&
              isHexColor(patternOpts.lineColor)
            ) {
              ctx.fillStyle = patternOpts.backgroundColor
              ctx.fillRect(0, 0, 100, 100)
              ctx.strokeStyle = patternOpts.lineColor
              ctx.lineWidth = 2
            }

            switch (patternOpts.pattern) {
              case "diagonalLeft":
                drawStripePoly(ctx,[[0, 0],[25, 0],[0, 25],[0, 0]], patternOpts.lineColor)
                drawStripePoly(ctx,[[50, 0],[0, 50],[0, 75],[75, 0],[50, 0]], patternOpts.lineColor)
                drawStripePoly(ctx,[[100, 0],[0, 100],[25, 100],[100, 25],[100, 0]], patternOpts.lineColor)
                drawStripePoly(ctx,[[50, 100],[100, 50],[100, 75],[75, 100],[50, 100]], patternOpts.lineColor)
              break
              case "diagonalRight":
                drawStripePoly(ctx,[[0, 100],[0, 75],[25, 100],[0, 100]], patternOpts.lineColor)
                drawStripePoly(ctx,[[0, 50],[0, 25],[75, 100],[50, 100]], patternOpts.lineColor)
                drawStripePoly(ctx,[[0, 0],[25, 0],[100, 75],[100, 100]], patternOpts.lineColor)
                drawStripePoly(ctx,[[50, 0],[75, 0],[100, 25],[100, 50]], patternOpts.lineColor)
              break
              case "horizontal":
                drawStripePoly(ctx,[[0, 0],[100, 0],[100, 25],[0, 25]], patternOpts.lineColor)
                drawStripePoly(ctx,[[0, 50],[100, 50],[100, 75],[0, 75]], patternOpts.lineColor)
              break
              case "vertical":
                drawStripePoly(ctx,[[1, 0],[25, 0],[25, 100],[1, 100]], patternOpts.lineColor)
                drawStripePoly(ctx,[[50, 0],[74, 0],[74, 100],[50, 100]], patternOpts.lineColor)
              break
              case "dots":
              break
              default:
                resolve(null)
            }

            const img = new Image()
            img.src = canvas.toDataURL()

            img.onload = () => {
              if (map.hasImage(patternName)) {
                reject(null)
              } else {
                map.addImage(patternName, img, { pixelRatio: 2 })
                resolve(img)
              }
            }
          })
        }