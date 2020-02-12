$(document).ready(function(){
	$("textarea").keydown(function(e){
		
		if(e.keyCode === 9){//tab was pressed
			var start = this.selectionStart;
			var end = this.selectionEnd;
			var $this = $(this);
			var values  = $this.val();
			$this.val(values.substring(0, start)  + "\t"  + values.substring(end));
			this.selectionStart = this.selectionEnd = start + 1;
			e.preventDefault();
		}
	});
	//getting input from textarea
	function getHTML(){
		var html = $("#html").val();
		return html;
	}
	function getCSS(){
		var css = $("#css").val();
		return css;
	}
	function getJS(){
		var js = $("#js").val();
		return js; 
	}
	
$("textarea").keyup(()=>{
		var targetIframe = $("#preview")[0].contentWindow.document;
		targetIframe.open(); 
		targetIframe.close();
		var html = getHTML();
		var css = "<style>"+getCSS()+"</style>";
		var js = "<script>"+getJS()+"</script>";
		$("body", targetIframe).append(html);
		$("head", targetIframe).append(css);
		$("body", targetIframe).append(js);
	});
});

$("#save-app").click(function(e){e.preventDefault();
	alert();
	var html = $("#html").val();
	var css =  $("#css").val();
	var js =  $("#js").val();
	if(html === ""){
		alert("Upload file without accompannying css and js")
	}else if(css === ""){
		alert("Upload file without accompannying html and js")
	}else if(js === ""){
		alert("Upload file without accompannying css and html")
	}else{
		var fullContent = "";
		fullContent += "<!DOCTYPE html>";
		fullContent += "<html>";
		fullContent += "<head>";
		fullContent += "<style>"+css+"</style>";
		fullContent += "<script>"+js+"</script>";
		fullContent += "<body>";
		fullContent += html;
		fullContent += "</body>";
		fullContent += "</html>";
		/*alert(js);
		alert(css);
		alert(html);*/
		console.log(fullContent);
		fetch("http://127.0.0.1:9999/uploadminiapp", {method:"POST", headers:{"Accept":"application/json","Content-Type":"application/json",},body:JSON.stringify({appName:"Mini Mi",telNumber:"0777122000",activityName:"index",pageActivity:fullContent,})}).then((resp) =>resp.json()).then((responseJsonFromServer) =>{console.log(responseJsonFromServer);}).catch((error)=>{console.log(error);})
	}
});
$("#connect-app-to-db").click(function(e){e.preventDefault();alert()});
$("#cancel-development").click(function(e){e.preventDefault();alert()});
function syntaxHighlightsHtml() {
    var ca = document.getElementsById("html");
    for(var i=0; i < ca.length; i++){
        var data = ca[i].innerHTML;
        data = data.replace(/"(.*?)"/g, '<span class="code-str">&quot;$1&quot;</span>');
        data = data.replace(/&lt;(.*?)&gt;/g, '<span class="code-elem">&lt;$1&gt;</span>');
        data = data.replace(/\/\* (.*?) \*\//g, '<span class="code-comment">/* $1 */</span>');
        ca[i].innerHTML = data;
    }
}

function syntaxHighlightsCss() {
    var ca = document.getElementsById("css");
    for(var i=0; i < ca.length; i++){
        var data = ca[i].innerHTML;
        data = data.replace(/"(.*?)"/g, '<span class="code-str">&quot;$1&quot;</span>');
        data = data.replace(/&lt;(.*?)&gt;/g, '<span class="code-elem">&lt;$1&gt;</span>');
        data = data.replace(/\/\* (.*?) \*\//g, '<span class="code-comment">/* $1 */</span>');
        ca[i].innerHTML = data;
    }
}

function syntaxHighlightsJs() {
    var ca = document.getElementsById("js");
    for(var i=0; i < ca.length; i++){
        var data = ca[i].innerHTML;
        data = data.replace(/"(.*?)"/g, '<span class="code-str">&quot;$1&quot;</span>');
        data = data.replace(/&lt;(.*?)&gt;/g, '<span class="code-elem">&lt;$1&gt;</span>');
        data = data.replace(/\/\* (.*?) \*\//g, '<span class="code-comment">/* $1 */</span>');
        ca[i].innerHTML = data;
    }
}

//modal windows open
function openSettings(contType) {
	if(contType === "html"){
		$("#html-settings").toggle();
	}else if(contType === "css"){
		$("#css-settings").toggle();
	}else if(contType === "js"){
		$("#js-settings").toggle();
	}
}

$(".save-settings").on("click", function(e){e.preventDefault();});

function saveHTMLSetting(contType) {
	var targetIframe = $("#preview")[0].contentWindow.document;
	targetIframe.open(); 
	targetIframe.close();
	if(contType === "html"){
		var metaTags = $("#meta-tags").val();
		var pageTitle = "<title>"+$("#page-title").val()+"</title>";
		$("head", targetIframe).prepend(metaTags);
		$("head", targetIframe).prepend(pageTitle);
		alert("saved succesfully");
		$("#html-settings").hide();
	}else if(contType === "css"){
	
	}else if(contType === "js"){
		
	}
}
