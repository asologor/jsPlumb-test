var cnt = 3; // current number of the blocks on the display
var con = []; // temp array for selected blocks
var elems = []; // endpoints array

var sourceEndpoint = {};
var targetEndpoint = {};

jsPlumb.ready(function() {
	jsPlumb.importDefaults({
		Container : $("body"),
		ConnectionOverlays : [
			[ "Arrow", { location:1, width:25, height:5 } ]
		],
		Connector : [ "Flowchart", { stub:[10, 30], gap:2, cornerRadius:0, alwaysRespectStubs:false } ],
		Endpoint : "Blank",
		PaintStyle : {
			lineWidth:4,
			strokeStyle:"#4FB9FF",
			joinstyle:"round"
		},
		HoverPaintStyle : {
			strokeStyle: "#FF0000"
		}
	});

	sourceEndpoint = {
		isSource: true,
		anchor:"BottomCenter"
	};
	targetEndpoint = {
		anchor:"TopCenter"
	};

	jsPlumb.draggable($(".jsplumb"), { grid: [50, 50] });
});


$(function(){
	$('body').on('click', 'div.jsplumb', function(){
		event.stopPropagation();
		$(this).addClass('selected');
		con.push( $(this) );

		if(con.length === 2){
			// return if second block is the same as first block
			$('.selected').removeClass('selected');
			if(con[0].attr('id') === con[1].attr('id')) {
				con = [];
				return false;
			}

			// creating endpoints on the blocks
			elems.push(jsPlumb.addEndpoint(con[0], sourceEndpoint));
			elems.push(jsPlumb.addEndpoint(con[1], targetEndpoint));
			con = [];

			// connecting endpoints
			var conn = jsPlumb.connect({
				source:elems[elems.length-2],
				target:elems[elems.length-1]
			});

			// listener for deleting connections
			conn.bind("click", function(obj){
				jsPlumb.detach(obj);
			});
		}
	});

	// deselect after click on the document body (whitespace)
	$(document).on('click', function(){
		$('.selected').removeClass('selected');
		con = [];
	});

	// add new block
	$('#addOne').on('click', function(){
		cnt++;
		var id = 'b' + cnt;
		$(jsPlumb.Defaults.Container)
			.append('<div class="jsplumb" style="top:50px; left:0px;" id="'+id+'">');
		jsPlumb.draggable($(id), { grid: [50, 50] });
	});
});