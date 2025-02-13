var myTheme = {
    printButton : false,
    init : function(){
		var ie_v = $exe.isIE();
		if (ie_v && ie_v<8) return false;
        setTimeout(function(){
            $(window).resize(function() {
                myTheme.reset();
            });
        },1000);
		var tit = $exe_i18n.menu+" ("+$exe_i18n.hide.toLowerCase()+")";
		var navToggler = '<p id="header-options">';
				navToggler += '<a href="#" class="hide-nav" id="toggle-nav" title="'+tit+'">';
					navToggler += '<span>'+$exe_i18n.menu+'</span>';
				navToggler += '</a>';
				if (myTheme.printButton==true && typeof(window.print)=='function') {
					navToggler += '<a href="#" id="print-page">';
						navToggler += '<span>'+$exe_i18n.print+'</span>';
					navToggler += '</a>';
				}
			navToggler += '</p>';
        var l = $(navToggler);
        var nav = $("#siteNav");
		nav.before(l);
		$("#toggle-nav").click(function(){
			myTheme.toggleMenu(this);
			return false;
		});
		$("#print-page").click(function(){
			window.print();
			return false;
		});		
		if ( $("A",nav).attr("class").indexOf("active")==0 ) $("BODY").addClass("home-page");
        var url = window.location.href;
        url = url.split("?");
        if (url.length>1){
            if (url[1].indexOf("nav=false")!=-1) {
                myTheme.hideMenu();
            }
        }
		// Set the min-height for the content wrapper
		$("#main-wrapper").css("min-height",(nav.height()+25)+"px");
    },
	init2 : function(){
		var ie_v = $exe.isIE();
		if (ie_v && ie_v<8) return false;
        setTimeout(function(){
            $(window).resize(function() {
                myTheme.reset();
            });
        },1000);
		var tit = $exe_i18n.menu+" ("+$exe_i18n.hide.toLowerCase()+")";
		var navToggler = '<p id="header-options">';
				navToggler += '<a href="#" class="hide-nav" id="toggle-nav" title="'+tit+'">';
					navToggler += '<span>'+$exe_i18n.menu+'</span>';
				navToggler += '</a>';
				if (myTheme.printButton==true && typeof(window.print)=='function') {
					navToggler += '<a href="#" id="print-page">';
						navToggler += '<span>'+$exe_i18n.print+'</span>';
					navToggler += '</a>';
				}
			navToggler += '</p>';
        var l = $(navToggler);
        var nav = $("#siteNav");
		nav.before(l);
		$("#toggle-nav").click(function(){
			myTheme.toggleMenu(this);
			return false;
		});
		$("#print-page").click(function(){
			window.print();
			return false;
		});		
		if ( $("A",nav).attr("class").indexOf("active")==0 ) $("BODY").addClass("home-page");
        var url = window.location.href;
        url = url.split("?");
        if (url.length>1){
            if (url[1].indexOf("nav=false")!=-1) {
                myTheme.hideMenu();
            }
        }
		// Set the min-height for the content wrapper
		$("#main-wrapper").css("min-height",(nav.height()+25)+"px");
		myTheme.hideMenu();
	
    },
    hideMenu : function(){
        $("#siteNav").hide();
        $(document.body).addClass("no-nav");
        myTheme.params("add");
		var tit = $exe_i18n.menu+" ("+$exe_i18n.show.toLowerCase()+")";
        $("#toggle-nav").attr("class","show-nav").attr("title",tit);
    },
    toggleMenu : function(e){
        if (typeof(myTheme.isToggling)=='undefined') myTheme.isToggling = false;
        if (myTheme.isToggling) return false;
        
        var l = $("#toggle-nav");
        
        if (!e && $(window).width()<900 && l.css("display")!='none') return false; // No reset in mobile view
        if (!e) {
            var tit = $exe_i18n.menu+" ("+$exe_i18n.show.toLowerCase()+")";
            l.attr("class","show-nav").attr("title",tit); // Reset
        }
        
        myTheme.isToggling = true;
        
        if (l.attr("class")=='hide-nav') {  
			var tit = $exe_i18n.menu+" ("+$exe_i18n.show.toLowerCase()+")";
            l.attr("class","show-nav").attr("title",tit);
            $("#siteFooter").hide();
			$("#siteNav").slideUp(400,function(){
                $(document.body).addClass("no-nav");
                $("#siteFooter").show();
                myTheme.isToggling = false;
            }); 
            myTheme.params("add");
        } else {
            var tit = $exe_i18n.menu+" ("+$exe_i18n.hide.toLowerCase()+")";
			l.attr("class","hide-nav").attr("title",tit);
            $(document.body).removeClass("no-nav");
			$("#siteNav").slideDown(400,function(){
                myTheme.isToggling = false;
            });
            myTheme.params("delete");            
        }
        
    },
    param : function(e,act) {
        if (act=="add") {
            var ref = e.href;
            var con = "?";
            if (ref.indexOf(".html?")!=-1) con = "&";
            var param = "nav=false";
            if (ref.indexOf(param)==-1) {
                ref += con+param;
                e.href = ref;                    
            }            
        } else {
            // This will remove all params
            var ref = e.href;
            ref = ref.split("?");
            e.href = ref[0];
        }
    },
    params : function(act){
        $("A",".pagination").each(function(){
            myTheme.param(this,act);
        });
    },
    reset : function() {
        myTheme.toggleMenu();        
    },
	inIframe : function(){
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	},	
	printContent : function(bodyClassName){
		if (bodyClassName.indexOf("exe-authoring-page")==0) {
			if (typeof(_)!='undefined') {
				eXe.app.alert(_("File") + " - " + _("Print") + " (Ctrl+P)");
				return false;
			}
		}
		if (!this.inIframe()) {
			window.print();
		} else {
			var isIE = navigator.appName.indexOf('Microsoft') !=-1;
			if (isIE) alert('Ctrl+P');
			var a = window.open(self.location.href);			
			if (!isIE) a.onload = function() { this.print() }
			a.focus();			
		}
	},
	common : {
		init : function(c){
			var iDevices = $(".iDevice_wrapper");
			var firstIsText = false;
			iDevices.each(function(i){
				// To review (just for 2.5.1)
				if ($(this).hasClass("UDLcontentIdevice")) {
					var h = $(".iDevice_header",this);
						h = h.css("background-image");
						if (h && h!="") {
							h = h.split("/");
							h = h[h.length-1];
							h = h.split(".");
							h = h[0];
							h = h.replace("icon_","");
							$(this).addClass("em_iDevice_"+h);
						}
				} // / 2.5.1				
				if (iDevices.length>1 && i==0 && this.className.indexOf("FreeTextIdevice")!=-1) {
					$(".iDevice",this).css("margin-top",0);
					firstIsText = true;
				}
			});
			// Print button in authoring-page, SCORM and IMS
			if (myTheme.printButton==true && ($("body").hasClass("exe-authoring-page") || $("body").hasClass("exe-ims") || $("body").hasClass("exe-scorm"))) {
				var extra = '';
				if (iDevices.length>1 && !firstIsText) extra = ' class="with-toggler"';
				$("#nodeDecoration").after('<p id="printNode"'+extra+'><a href="#" title="'+$exe_i18n.print+'"><span>'+$exe_i18n.print+'</span></a></p>');
				$("#printNode a").click(function(e){
					myTheme.printContent(document.body.className);
				});
			}
		}
	}
}

$(function(){
	if ($("body").hasClass("exe-web-site")) {
		if($(window).width()<829 && $(window).height()<1800){
			myTheme.init2();
		}
		else{
		myTheme.init();
		}
	}
	myTheme.common.init();
});

function ayudantes(evt, cityName){
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
};


function personajes(evt, cityName) {
  // Declare all variables
  var i, personajescontent, tablinks;

  // Get all elements with class="personajesconten" and hide them
  personajescontent = document.getElementsByClassName("personajescontent");
  for (i = 0; i < personajescontent.length; i++) {
    personajescontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
};