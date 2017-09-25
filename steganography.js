
var imageToHide;
var imageHideInside;

function uploadImageToHide() {

  //get file input from element
  var file = document.getElementById('inputToHide');

  //save the first image as "originalImage"
  imageToHide = new SimpleImage(file);

  //draw imageToHide to canvas
  var canvasToHide = document.getElementById('canvasToHide');
  var contextToHide = canvasToHide.getContext('2d');
  imageToHide.drawTo(canvasToHide);

}

function uploadImageHideInside() {

  //get file input from element
  var file = document.getElementById('inputHideInside');

  //save the first image as "originalImage"
  imageHideInside = new SimpleImage(file);

  //draw imageToHide to canvas
  var canvasHideInside = document.getElementById('canvasHideInside');
  var contextHideInside = canvasHideInside.getContext('2d');
  imageHideInside.drawTo(canvasHideInside);

}

//Math helper function to call inside of convertToHide function:
function clearBits(pixval) {

  var x = Math.floor(pixval / 16) * 16; //multiply by 16 to clear insignificant bits
  return x;

}

function convertToHide(imageToHide) {

  //iterate over each pixel and call clearBits() for RGB values
  for (var pixel of imageToHide.values()) {

    //clear low bits of red
    pixel.setRed(clearBits(pixel.getRed()));

    //clear low bits of green
    pixel.setGreen(clearBits(pixel.getGreen()));

    //clear low bits of blue
    pixel.setBlue(clearBits(pixel.getBlue()));
  }

  //return the resulting cleared image
  return imageToHide;

}

// Function called when user uploads a new image
function uploadAndConvert() {
  uploadImageToHide(); //upload and draw image to canvas
  convertToHide(imageToHide); //convert image and save to var imageToHide
}
