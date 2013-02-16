var images;
var imageCounter;
var url1, src1;

function start() {
	images = new Object();
	
	images.qrcode = new Object();
	$('#qrcode').qrcode($("#link").val());
	images.qrcode.data = $("#qrcode canvas").get(0).toDataURL("image/jpeg");

	images.person = new Object();
	images.person.url = $("#image").val();

	images.badge01 = new Object();
	images.badge01.url = "images/badges/" + $("#badge01").val();
	images.badge02 = new Object();
	images.badge02.url = "images/badges/" + $("#badge02").val();
	images.badge03 = new Object();
	images.badge03.url = "images/badges/" + $("#badge03").val();
	images.badge04 = new Object();
	images.badge04.url = "images/badges/" + $("#badge04").val();
	images.badge05 = new Object();
	images.badge05.url = "images/badges/" + $("#badge05").val();
	images.badge06 = new Object();
	images.badge06.url = "images/badges/" + $("#badge06").val();
	images.badge07 = new Object();
	images.badge07.url = "images/badges/" + $("#badge07").val();
	images.badge08 = new Object();
	images.badge08.url = "images/badges/" + $("#badge08").val();
	images.badge09 = new Object();
	images.badge09.url = "images/badges/" + $("#badge09").val();
	images.badge10 = new Object();
	images.badge10.url = "images/badges/" + $("#badge10").val();
	
	imageCounter = 11;
	imageData("person", imageCallback);
	imageData("badge01", imageCallback);
	imageData("badge02", imageCallback);
	imageData("badge03", imageCallback);
	imageData("badge04", imageCallback);
	imageData("badge05", imageCallback);
	imageData("badge06", imageCallback);
	imageData("badge07", imageCallback);
	imageData("badge08", imageCallback);
	imageData("badge09", imageCallback);
	imageData("badge10", imageCallback);
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
	doc.addImage(images.qrcode.data, 'JPEG', 100, 13, 30, 30);
	
	// Big Picture
	doc.addImage(images.person.data, 'JPEG', 29, 50, 90, 90);
	
	//Bagdes
	doc.addImage(images.badge01.data, 'JPEG', 16, 150, 20, 20);
	doc.addImage(images.badge02.data, 'JPEG', 40, 150, 20, 20);
	doc.addImage(images.badge03.data, 'JPEG', 64, 150, 20, 20);
	doc.addImage(images.badge04.data, 'JPEG', 88, 150, 20, 20);
	doc.addImage(images.badge05.data, 'JPEG', 112, 150, 20, 20);
	doc.addImage(images.badge06.data, 'JPEG', 16, 174, 20, 20);
	doc.addImage(images.badge07.data, 'JPEG', 40, 174, 20, 20);
	doc.addImage(images.badge08.data, 'JPEG', 64, 174, 20, 20);
	doc.addImage(images.badge09.data, 'JPEG', 88, 174, 20, 20);
	doc.addImage(images.badge10.data, 'JPEG', 112, 174, 20, 20);
	
	
	doc.output("dataurlnewwindow", 'Test.pdf');
}

function getBadges(callback) {
	$.getJSON('images/badges/list.json', function(data) {
		callback(data);
	});
}

$("window").ready(function() {
	getBadges(function(lines) {
		$.each(lines, function(idx,line) {
			$("<option/>").val(line).text(line).appendTo("#badge01");
			$("<option/>").val(line).text(line).appendTo("#badge02");
			$("<option/>").val(line).text(line).appendTo("#badge03");
			$("<option/>").val(line).text(line).appendTo("#badge04");
			$("<option/>").val(line).text(line).appendTo("#badge05");
			$("<option/>").val(line).text(line).appendTo("#badge06");
			$("<option/>").val(line).text(line).appendTo("#badge07");
			$("<option/>").val(line).text(line).appendTo("#badge08");
			$("<option/>").val(line).text(line).appendTo("#badge09");
			$("<option/>").val(line).text(line).appendTo("#badge10");
		});
	});
});
