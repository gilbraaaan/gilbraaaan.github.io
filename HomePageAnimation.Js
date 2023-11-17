

//#region  SLIDESHOW
var slideIndex = 1;
function plusDivs(n) {
  showPublished(slideIndex += n);
  }
function showPublished(n) {
  var i;
  var Image = document.getElementsByClassName("ImgJS");
  if (n > Image.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = Image.length}
  for (i = 0; i < Image.length; i++) {
    Image[i].style.display = "none";  
  }
  Image[slideIndex-1].style.display = "block";  
}
//#endregion


//#region  SLIDESHOW
var slideARIndex = 1;
function arDivs(n) {
    showDivs(slideARIndex += n);
  }
function showDivs(n) {
  var i;
  var Image = document.getElementsByClassName("ARClick");
  if (n > Image.length) {slideARIndex = 1}    
  if (n < 1) {slideARIndex = Image.length}
  for (i = 0; i < Image.length; i++) {
    Image[i].style.display = "none";  
  }
  Image[slideARIndex-1].style.display = "block";  
}
//#endregion


//#region IFRAME SLIDESHOW
var slideIframe = 1;
function plusIframe(n) {
    showIframes(slideIframe += n);
  }
function showIframes(n) {
  var i;
  var Image = document.getElementsByClassName("Iframe");
  if (n > Image.length) {slideIframe = 1}    
  if (n < 1) {slideIframe = Image.length}
  for (i = 0; i < Image.length; i++) {
    Image[i].style.display = "none";  
  }
  Image[slideIframe-1].style.display = "block";  
}
//#endregion

//#region YOUTUBE SLIDESHOW
var slideYoutubePortofolio = 1;
function plusYoutube(n) {
    showYoutube(slideYoutubePortofolio += n);
  }
function showYoutube(n) {
  var i;
  var Image = document.getElementsByClassName("YoutubeShow");
  if (n > Image.length) {slideYoutubePortofolio  = 1}    
  if (n < 1) {slideYoutubePortofolio  = Image.length}
  for (i = 0; i < Image.length; i++) {
    Image[i].style.display = "none";  
  }
  Image[slideYoutubePortofolio -1].style.display = "block";  
}
//#endregion

//#region OOP
var slideOop = 1;
function oopDivs(n) {
    showOop(slideOop += n);
  }
function showOop(n) {
  var i;
  var Image = document.getElementsByClassName("oopClick");
  if (n > Image.length) {slideOop  = 1}    
  if (n < 1) {slideOop  = Image.length}
  for (i = 0; i < Image.length; i++) {
    Image[i].style.display = "none";  
  }
  Image[slideOop -1].style.display = "block";  
}
//#endregion


//#region Get the modal
var intOop = 1;
function processContent(v){
  showContentOop(v)
}
function showContentOop(x){
  var imgOop = document.getElementsByClassName("ForHide");
  for (i = 0; i < imgOop.length; i++) {
    imgOop[i].style.display = "none";  
  }
  imgOop[x].style.display = "block";  
}

function closeContentOop(){
  var imgOop = document.getElementsByClassName("ForHide");
  for (i = 0; i < imgOop.length; i++) {
    imgOop[i].style.display = "none";  
  }
}
//#endregion


document.addEventListener("contextmenu", function(e){
  if (e.target.nodeName === "IMG") {
      e.preventDefault();
  }
}, false);
window.oncontextmenu = function () {
  return false;
}