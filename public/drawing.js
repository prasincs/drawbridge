function getSketchId(){ return window.location.hash.substring(1); }

$(function(){
	UI.canvas = new Canvas($("#canvas").get(0));
    UI.canvas.context.lineWidth = 4;
    UI.canvas.context.lineJoin  = "round";
    UI.canvas.context.lineCap   = "round";
        
    var currentTool = UI.canvas.pen;
        
    $(UI.canvas.canvas).mousedown(function(e){
        currentTool.down(UI.canvas.xcr(e.pageX), UI.canvas.ycr(e.pageY));
		UI.fadeInShadow();
    }).mousemove(function(e){        
        currentTool.moved(UI.canvas.xcr(e.pageX), UI.canvas.ycr(e.pageY));
    }).mouseout(function(e){
        currentTool.up(UI.canvas.xcr(e.pageX), UI.canvas.ycr(e.pageY));
    }).mouseup(function(e){
        currentTool.up(UI.canvas.xcr(e.pageX), UI.canvas.ycr(e.pageY));
    }).mouseover(function(e){
		UI.fadeInShadow(e);
	}).mouseleave(function(){
		UI.fadeOutShadow();
	});
		  
    $("#eraser").click(function(){
        currentTool = UI.canvas.eraser;
        $("#pen").removeClass("selected");
        $(this).addClass("selected");
    });
    $("#pen").click(function(){
        currentTool = UI.canvas.pen;
        $("#eraser").removeClass("selected");
        $(this).addClass("selected");
    });
    

	$("#share").click(function(){
		if ($("#share-box").css("display") === "none") {
			$("#share-box").show();
		} else {
			$("#share-box").hide();
		}
		return false;
	});
	$("#share-box .close").click(function(){ $("#share-box").hide(); return false; });
	$("#invite").click(function(){
		if ($("#invite-box").css("display") === "none") {
			$("#invite-box").css("top",$("#invite").position().top + 48)
			$("#invite-box").show();
		} else {
			$("#invite-box").hide();
		}
		return false;
	});
	$("#invite-box .close").click(function(){ $("#invite-box").hide(); return false; });

	$("#you a").click(function(){
		$("#you form").show();
		$("#you a").hide();
		$("#you form input").focus();
		return false;
	});
	$("#you form input").focusout(function(){
		$("#you a").html($("#you form input").val()  + " <span class='tiny'>(click to change)</span>");
		$("#you a").show();
		$("#you form").hide();
	});
	$("#you form").submit(function(){
        CommLink.reportSignOn($("#you form input").val());
        $("#you form input").focusout();
        return false;
	});
});
