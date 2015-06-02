$(function() {

	/* Adding csrf handling JS from Django site */
	
	// using jQuery
	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	
	var csrftoken = getCookie('csrftoken');
	
	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});
	
	$('button.curveball-btn').on('click', function () {
		//console.log("group has clicked on a curveball button");
		//alert("group has clicked on a curveball button");
		//console.log();
		//console.log("jQuery(this).data()");
		//alert("jQuery(this).data()");
		//console.log(jQuery(this).data());
		//alert(jQuery(this).data());
		//alert("jQuery(this).data().pageblock");
		//console.log(jQuery(this).data());
		//alert(jQuery(this).data().pageblock);
		//alert("jQuery(this).data().group");
		//console.log(jQuery(this).data());
		//alert(jQuery(this).data().group);
//		console.log("jQuery(this).data().pageblock-id");
//		console.log(jQuery(this).data().pageblock-id);
//		console.log("jQuery(this).data().group-id");
//		console.log(jQuery(this).data().group-id);
//	    
		//var group = 
		
		$.ajax({
	        url: "/curveball_read/",
	        type: "POST",
	        dateType: 'json',
	        data: {'pageblock' : jQuery(this).data().pageblock, 'group' : jQuery(this).data().group },
	        error: function(evt) {
	              //setTimeout(updateToken, currentRefresh);
	        },
	        success: function(d) {
	                //window.token = d.token;
	        }
	    });

	});
	

	
	
	
	
	
	
	
    // Taken from Tala
    var conn;
    var currentRefresh = 1000;
    var defaultRefresh = 1000;
    var maxRefresh = 1000 * 5 * 60; // 5 minutes

    var updateToken = function() {
        $.ajax({
            url: window.freshTokenUrl,
            type: 'get',
            dateType: 'json',
            error: function(evt) {
                setTimeout(updateToken, currentRefresh);
            },
            success: function(d) {
                window.token = d.token;
            }
        });
    };

    var requestFailed = function(evt) {

        // circuit breaker pattern for failed requests
        // to ease up on the server when it's having trouble
    updateToken();
    currentRefresh = 2 * currentRefresh; // double the refresh time
    if (currentRefresh > maxRefresh) {
        currentRefresh = maxRefresh;
    }
    setTimeout(connectSocket, currentRefresh);
	};

    var connectSocket = function() {
        conn = new WebSocket(window.websocketsBase + '?token=' + window.token);
        conn.onclose = requestFailed;
        conn.onmessage = onMessage;
        conn.onopen = function(evt) {
            currentRefresh = defaultRefresh;
        };
    };

    var onMessage = function(evt) {
        var envelope = JSON.parse(evt.data);
        var data = JSON.parse(envelope.content);
        if ((data.section === parseInt(window.sectionId)) &&
            (data.username === window.username)) {
            jQuery('ul.pager li.next a').removeClass('disabled');
            jQuery('ul.pager li.next a').css('color', '#337ab7');
            jQuery('ul.pager li.next a').attr('href', data.nextUrl);
            jQuery('.unlock-msg').show();
            jQuery('.unlock-msg').addClass('alert alert-success');
        }

    };

    if (window.WebSocket) {
        connectSocket();
    } else {
        alert($('Your browser does not support WebSockets. ' +
                'You will have to refresh your browser to view updates.'));
    }
});
