function QDropFun1(id1, id2, id3) {
    document.getElementById(id1).classList.toggle("show");
	document.getElementById(id2).classList.toggle("fa-minus-circle");
	document.getElementById(id3).classList.toggle("qbold");
}

function booksdropfun1() {
    document.getElementById("refbooksspan").classList.toggle("show");
	document.getElementById('plusbook1').classList.toggle("fa-minus-circle");
}
		
function websdropfun1() {
    document.getElementById("refwebsspan").classList.toggle("show");
	document.getElementById('pluswebs1').classList.toggle("fa-minus-circle");
}