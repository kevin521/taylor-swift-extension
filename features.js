function printRandomLyric(jsonFile){
	var obj = JSON.parse(jsonFile);

	var index = -1

	while (index < 0 || index > obj.lyrics.length)
  	index = Math.round(Math.random() * obj.lyrics.length) - 1;

  document.getElementById("lyric").innerHTML = obj.lyrics[index]

}

function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
	xobj.open('GET', 'lyrics.json', true); 
	xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          printRandomLyric(xobj.responseText);
        }
  };
  xobj.send(null);  
}

document.addEventListener('DOMContentLoaded', function () {
  loadJSON(printRandomLyric);
});
