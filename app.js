const express = require ('express')
const app     = express()
const multer  = require('multer')
const sharp   = require('sharp')
const fs      = require('fs')

const storagestrategy = multer.memoryStorage()
const upload  = multer({storage: storagestrategy})

app.use(express.json())

app.get('/', function(req, res) {

    res.send('Hola mundo!')
})

app.post('/imagen', upload.single('imagen') , async function(req, res) {

    const imagen = req.file

    const processedImage = sharp(imagen.buffer)

    const resizedImage = processedImage.resize(200,800,{
        fit:'contain',
        background: {r:255, g:255, b:255, alpha:1}

    })

    const resizedImageBuffer = await resizedImage.toBuffer()

    fs.writeFileSync('nuevaruta/prueba.png', resizedImageBuffer)

    console.log(resizedImageBuffer)

    res.send({ resizedImage: resizedImageBuffer})
} )
const PORT = process.env.PORT || 3000

console.log({PORT})

app.listen(PORT, function() {

    console.log('servidor escuchando en el puerto', PORT)
}) 



