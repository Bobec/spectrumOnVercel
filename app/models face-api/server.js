const faceapi = require("face-api.js")  
const canvas = require("canvas")  
const fs = require("fs")  
const path = require("path")
const fetch = require('node-fetch');

// mokey pathing the faceapi canvas
const { Canvas, Image, ImageData } = canvas  
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
faceapi.env.monkeyPatch({ fetch: fetch });

const faceDetectionNet = faceapi.nets.ssdMobilenetv1

// SsdMobilenetv1Options
const minConfidence = 0.5

// TinyFaceDetectorOptions
const inputSize = 408  
const scoreThreshold = 0.5

// MtcnnOptions
const minFaceSize = 50  
const scaleFactor = 0.8

// function getFaceDetectorOptions(net) {  
//     return net === faceapi.nets.ssdMobilenetv1
//         ? new faceapi.SsdMobilenetv1Options({ minConfidence })
//         : (net === faceapi.nets.tinyFaceDetector
//             ? new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
//             : new faceapi.MtcnnOptions({ minFaceSize, scaleFactor })
//         )
// }

// const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)

// simple utils to save files
const baseDir = path.resolve(__dirname, './out')  
function saveFile(fileName, buf) {  
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir)
    }
    // this is ok for prototyping but using sync methods
    // is bad practice in NodeJS
    fs.writeFileSync(path.resolve(baseDir, fileName), buf)
  }

async function run() {

    // load weights
    
}


module.exports = (req, res) => {
  const MODELS_URL = path.join(__dirname, './models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_URL)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_URL)
  await faceapi.nets.faceExpressionNet.loadFromDisk(MODELS_URL)
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_URL)
  // load the image
  const img = await canvas.loadImage('imgs_src/da.jpeg')
  console.log(req.body.uri)
  // create a new canvas and draw the detection and landmarks
  const out = faceapi.createCanvasFromMedia(img)
  // faceapi.drawLandmarks(out, results.map(res => res.landmarks), { drawLines: true, color: 'red' })
  const detectionsWithExpressions = await faceapi.detectAllFaces(out).withFaceLandmarks().withFaceExpressions()
  // save the new canvas as image
  console.log(detectionsWithExpressions[0].expressions)
  saveFile('faceLandmarkDetection.jpg', out.toBuffer('image/jpeg'))
  console.log('done, saved results to out/faceLandmarkDetection.jpg')


  // res.status(200).send(detectionsWithExpressions[0].expressions);
  const date = new Date().toString();
  res.status(200).send(date);
};