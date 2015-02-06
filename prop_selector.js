$(document).ready(function(){
	
	//	Get Property Types from data-prop-type attribute
	var propTypes = '';
	var length = $(".property").length;
	$(".property").each(function(index, element){
		propTypes += $(this).attr('data-prop-type');
		if( (index+1) === length) {
			return false;
		}
		propTypes += ', ';
		
	});
	// Make string into an array
	propTypes = propTypes.split(", ");

	//Remove duplicates
	var uniquePropTypes = [];
	$.each(propTypes, function(i, el){
		if($.inArray(el, uniquePropTypes) === -1) uniquePropTypes.push(el);
	});
	uniquePropTypes.sort();	
	
	//Make <ul> out of the existing property types
	var propNav = '<div class="grid headlinewrapper"><h3>Sort Properties</h3></div>';
	propNav += '<div class="propnavwrapper">';
	propNav += '<div class="grid propnavinnerwrapper">';
	propNav += '<ul id="propertybuttons" class="propertybuttons">';
	$.each(uniquePropTypes, function(index, element) {
		propNav += '<li><a class="button" href="#">';
		propNav += element;
		propNav += '</a></li>';
	});
	propNav += '</ul>';
	propNav += '</div>';
	propNav += '</div>'; 
	propNav = $(propNav);
	propNav.find("li:first-of-type a").addClass("selected");
	
	$(".page-template-page-buildings-and-sites-php #slectorprepend").before(propNav);
	
	$("#propertybuttons a").on("click", function(event){
		
		event.preventDefault();
		
		//Button Styling
		$("#propertybuttons a").removeClass("selected");
		$(this).addClass("selected");
		
		//Hide and remove properties
		var selectedPropType = $(this).html();
		var divArrayShow = new Array();
		var divArrayHide = new Array();
		
		$(".property").each(function(i, el){
			var data = $(el).attr('data-prop-type');
			if(data.indexOf(selectedPropType) >= 0 ) {
				// Put <div>s to show and hide in variables to the animation can run in a queue
				divArrayShow.push(this);

			} else {
				// Put <div>s to show and hide in variables to the animation can run in a queue
				divArrayHide.push(this);

			}
			
		});
	
		if(divArrayHide.length > 0) {
			$("#propertieswrapper").slideUp(function(){
				$(divArrayHide).hide();
				$(divArrayShow).show();
				$("#propertieswrapper").slideDown();
			});
		} else {
			//Because the above won't run if divArrayHide is empty and thus the All button won't work.
			$("#propertieswrapper").slideUp();
			$(divArrayShow).show();
			$("#propertieswrapper").slideDown();
		}
	});
	
});
	
	