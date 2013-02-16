var images;
var imageCounter;

function start() {
	images = new Object();
	images["a"] = new Object();
	images["a"]["url"] = "images/document.svg";

	imageCounter = 1;
	imageData("a", imageCallback);
}

function imageCallback() {
	imageCounter--;
	if (imageCounter == 0) {
		renderPDF();
	}
}

function imageData(index,callback) {
	var img = new Image();
	var dataURL = "";
	img.onload = function () {
		// Create an empty canvas element
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		
		var ctx = canvas.getContext("2d");
		
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Copy the image contents to the canvas
		ctx.drawImage(img, 0, 0);

		// Get the data-URL formatted image
		// Firefox supports PNG and JPEG. You could check img.src to
		// guess the original format, but be aware the using "image/jpg"
		// will re-encode the image.
		dataURL = canvas.toDataURL("image/jpeg");
		//alert(dataURL);
		images[index].data = dataURL;
		callback();
	}
	
	img.src = images[index]["url"];
}

function renderPDF() {
	var doc = new jsPDF("portrait","mm","a5" );
	
	doc.setFont("times");
	doc.setFontType("bold");
	doc.setFontSize(48);
	doc.text(15, 25, $("#nickname").val());
	
	doc.setFont("helvetica");
	doc.setFontSize(16);
	doc.setFontType("normal");
	doc.text(15, 36, $("#subtitle").val());
	
	//doc.rect(20, 20, 10, 10); 
	// QRCode
	doc.addImage(images.a.data, 'JPEG', 100, 13, 30, 30);
	
	// Big Picture
	doc.addImage(images.a.data, 'JPEG', 29, 50, 90, 90);
	
	//Bagdes
	doc.addImage(images.a.data, 'JPEG', 16, 150, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 40, 150, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 64, 150, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 88, 150, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 112, 150, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 16, 174, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 40, 174, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 64, 174, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 88, 174, 20, 20);
	doc.addImage(images.a.data, 'JPEG', 112, 174, 20, 20);
	
	
	doc.output("dataurlnewwindow", 'Test.pdf');
}
