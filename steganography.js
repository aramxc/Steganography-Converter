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

//Math helper function to call inside of cutImage function:
function clearBits(pixval) {

  var x = Math.floor(pixval / 16) * 16; //multiply by 16 to clear insignificant bits
  return x;

}

function cutImage(imageToHide) {

  //iterate over each pixel and call clearBits() for RGB values
  for (var pixel of imageToHide.values()) {

    //clear low bits of red
    pixel.setRed(clearBits(pixel.getRed()));

    //clear low bits of green
    pixel.setGreen(clearBits(pixel.getGreen()));

    //clear low bits of blue
    pixel.setBlue(clearBits(pixel.getBlue()));
  }

  //return the resulting cut image
  return imageToHide;

}

function shiftImage(imageHideInside) {

  //iterate over each pixel and shift significant bits over
  for (var pixel of imageHideInside) {

    //shift red bits over
    pixel.setRed(pixel.getRed() / 16);

    //shift green bits over
    pixel.setGreen(pixel.getGreen() / 16);

    //shift blue bits over
    pixel.setBlue(pixel.getBlue() / 16);

  }

  //return the resulting cut image
  return imageHideInside;
}

function combine(imageToHide, imageHideInside) {

  var combinedImage = new SimpleImage(imageHideInside.getWidth(), imageHideInside.getHeight());

  //iterate over each pixel
  for (var pixel of combinedImage.values()) {

    //get x and y of each pixel
    var x = pixel.getX();
    var y = pixel.getY();

    //get x and y of var show pixels
    var imageHideInsidePixel = imageHideInside.getPixel(x, y);

    //get the corresponding pixel in imageToHide
    var imageToHidePixel = imageToHide.getPixel(x, y);

    /*set the red pixels to the sum of imageToHide's red pixels
     * and imageHideInside's red pixels:
     */
    pixel.setRed(imageHideInsidePixel.getRed() + imageToHidePixel.getRed());

    /*set the green pixels to the sum of imageToHide's green pixels
     * and imageHideInside's green pixels:
     */
    pixel.setGreen(imageHideInsidePixel.getGreen() + imageToHidePixel.getGreen());

    /*set the blue pixels to the sum of imageToHide's blue pixels
     * and imageHideInside's blue pixels:
     */
    pixel.setBlue(imageHideInsidePixel.getBlue() + imageToHidePixel.getBlue());
  }

  //return the resulting image
  return combinedImage;
}

// Function called when user uploads image in step 1
function uploadAndCut() {
  uploadImageToHide(); //upload and draw image to canvas
  cutImage(imageToHide); //convert image and save to var imageToHide

}

//Function called when user uploads image in step 2
function uploadAndShift() {
  uploadImageHideInside(); //upload and draw image to canvas
  shiftImage(imageHideInside); //convert image and save to var imageHideInside

}

function viewResult() {
  if (imageToHide != null && imageHideInside != null) {

    //combine results from cutImage() and shiftImage(), returns combinedImage
    combine(imageToHide, imageHideInside);

    //draw combinedImage to result canvas
    var canvasResult = document.getElementById('canvasResult');
    var contextResult = canvasResult.getContext('2d');
    combinedImage.drawTo(canvasResult);
  } else {
    alert('Error');

  }
}
