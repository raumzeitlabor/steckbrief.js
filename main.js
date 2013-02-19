var images;
var imageCounter;
var url1, src1;

function start() {
	images = new Object();
	
	images.qrcode = new Object();
	$('#qrcode').qrcode($("#link").val());
	images.qrcode.data = $("#qrcode canvas").get(0).toDataURL("image/jpeg");

	imageCounter = 11;

	images.person = new Object();
	images.person.url = $("#image").val();
	imageData("person", imageCallback);

	for (var i=0;i<10;i++) {
		images["badge"+i] = new Object();
		images["badge"+i].url = "img/badges/" + $("#badge"+i).val();
		imageData("badge"+i, imageCallback);
	}
}

function imageCallback() {
	imageCounter--;
	if (imageCounter == 0) {
		renderPDF();
	}
}

function imageData(index,callback) {
	var img = document.createElement('img');
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
	doc.addImage(images.qrcode.data, 'JPEG', 100, 13, 30, 30);
	
	// Big Picture
	doc.addImage(images.person.data, 'JPEG', 29, 50, 90, 90);
	
	//Bagdes
	doc.addImage(images.badge0.data, 'JPEG', 16, 150, 20, 20);
	doc.addImage(images.badge1.data, 'JPEG', 40, 150, 20, 20);
	doc.addImage(images.badge2.data, 'JPEG', 64, 150, 20, 20);
	doc.addImage(images.badge3.data, 'JPEG', 88, 150, 20, 20);
	doc.addImage(images.badge4.data, 'JPEG', 112, 150, 20, 20);
	doc.addImage(images.badge5.data, 'JPEG', 16, 174, 20, 20);
	doc.addImage(images.badge6.data, 'JPEG', 40, 174, 20, 20);
	doc.addImage(images.badge7.data, 'JPEG', 64, 174, 20, 20);
	doc.addImage(images.badge8.data, 'JPEG', 88, 174, 20, 20);
	doc.addImage(images.badge9.data, 'JPEG', 112, 174, 20, 20);
	
	
	doc.output("dataurlnewwindow", 'Test.pdf');
}

function getBadges(callback) {
	$.getJSON('img/badges/list.json', function(data) {
		callback(data);
	});
}

$("window").ready(function() {
	getBadges(function(lines) {
		$.each(lines, function(idx,line) {
			for (var i=0;i<10;i++) {
				$("<option/>").val(line).text(line).css("background","url(img/badges/"+line+") no-repeat right").css("background-size","auto 100%").appendTo("#badge"+i);
			}
		});
	});
});
