(function ($) {
  $.fn.enrollware = function (options) {
    var settings = {
      feed: null,
      showLocations: false,
      showSeatsRemaining: false
    }
    var opts = $.extend({}, settings, options);
    return this.each(function () {
      var $container = $(this);
      if (opts.feed) {
        $.ajax({
          "url": opts.feed,
          "dataType": "jsonp",
          "crossDomain": true,
          "cache": false,
          "error": function () {
            $container.empty();
            $container.append("<div>No matching classes were found</div>");
          },
          "success": function (items) {
            $container.empty();
            if (items.length == 0) {
              $container.empty();
              $container.append("<div>No matching classes were found</div>");
              return;
            }
            $list = $("<ul></ul>").appendTo($container);
            $.each(items, function (i, item) {
              var $el, $a, contents = '';
              $li = $("<li></li>");
              if (item.altTimes !== null && item.altTimes.length > 0) {
                contents += item.altTimes;
              }
              else if (item.dateTimes !== null && item.dateTimes.length > 0) {
                contents += item.dateTimes[0];
              }
              if (item.closed) {
                contents += " (closed)";
              }
              else if (opts.showSeatsRemaining) {
                contents += " (" + (item.seatsLeft > 0 ? item.seatsLeft + " seat" + (item.seatsLeft != 1 ? "s" : "") + " left" : "full") + ")";
              }

              if (opts.showLocations) {
                contents += "<span><br>" + item.location + "</span>";
              }

              if (item.dateTimes !== null && item.dateTimes.length > 1) {
                contents += "<br><br>";
                contents += "This class also meets on:";
                $.each(item.dateTimes.slice(1), function (i, time) {
                  contents += "<br>";
                  contents += time;
                });
              }
              $a = $("<a></a>");
              if (item.url) {
                $a.attr("href", item.url);
              }
              if (item.id > 0) {
                if (item.closed) {
                  $a.attr("title", "Registration is closed for this class");
                  $a.attr("class", "greylink");
                } else if (item.seatsLeft > 0) {
                  $a.attr("title", "Click to choose this class");
                }
                else {
                  $a.attr("title", "This class is full");
                  $a.attr("class", "greylink");
                }
                if (item.dateTimes !== null && item.dateTimes.length == 1 && opts.showLocations == false) {
                  $a.attr("class", "singleline");
                }
              }
              else {
                $a.attr("title", "Click to register without a schedule");
                $a.attr("class", "singleline");
                contents = "I will call to schedule my classroom session";
              }
              $a.html(contents);
              $li.append($a);
              $list.append($li);
            });
          }
        });
      }
    });
  }
})(jQuery);

var tcpr = (function () {
  "use strict";
  var courseIDs = {
    'bls': [
      { 'id': '7276',
        'title': 'Healthcare Provider CPR (BLS) Initial',
        'cost': '$50, book $12'},
      { 'id': '7275',
        'title': 'Healthcare Provider CPR (BLS) Renewal',
        'cost': '$50, book $12'},
      { 'id': '7286',
        'title': 'Healthcare Provider CPR (BLS) Skills Check',
        'cost': ''}
    ],
    'acls': [
      { 'id': '7278',
        'title': 'ACLS- Initial',
        'cost': '$225, book $33.50'},
      { 'id': '7277',
        'title': 'ACLS Renewal',
        'cost': '$150, book $33.50'},
      { 'id': '7475',
        'title': 'ACLS Skills Check',
        'cost': ''},
      { 'id': '7280',
        'title': 'ACLS/BLS Initial',
        'cost': '$250, book $33.50'},
      { 'id': '7279',
        'title': 'ACLS/BLS Renewal',
        'cost': '$175, book $33.50'},
      { 'id': '7284',
        'title': 'PALS Initial',
        'cost': '$225, book $38.50'},
      { 'id': '7285',
        'title': 'PALS Renewal',
        'cost': '$150, book $38.50'},
      { 'id': '7288',
        'title': 'PALS Skills Check',
        'cost': ''}
    ],
    'heartsaver': [
      { 'id': '7281',
        'title': 'Heartsaver CPR',
        'cost': '$50'},
      { 'id': '31031',
        'title': 'Heartsaver CPR Skills Check',
        'cost': ''}
    ],
    'heartsaverfirstaid': [
      { 'id': '7282',
        'title': 'Adult First Aid & CPR',
        'cost': '$65'},
      { 'id': '7293',
        'title': 'Heartsaver First Aid',
        'cost': '$50'},
      { 'id': '7283',
        'title': 'Pediatric First Aid & CPR',
        'cost': '$65'},
      { 'id': '31030',
        'title': 'Pediatric First Aid & CPR Skills Check',
        'cost': ''}
    ]
  };
  var getCourses = function(){
    var fstem = window.location.pathname.split("/").pop().split('.')[0];
    var courses = tcpr.getURL(fstem);
    $.each(courses, function(idx, obj){
      var elemString = '<div><h2 class="' + obj.id + '">' + obj.title + ' <span class="cost">' + obj.cost + '</span></h2>';
      elemString += '<div id="' + obj.id + '" style="display: none"></div></div>';
      $("#coursemenu").append(elemString);
      $("div#"+obj.id).enrollware({
        feed:"https://trianglecpr.enrollware.com/registration/schedule-feed.ashx?courseid="+obj.id
      });
      $( "h2." + obj.id ).click(function() {
        $( "div#"+obj.id ).toggle('fast');
      });   
    });
    $(function(){
      $( "#register" ).click(function() {
        $( "#coursemenu" ).toggle('fast');
      });   
    });
      
  }
  
  return { 
    getURL: function (name) {
      return courseIDs[name];
    },
    getCourses: getCourses
  };
}());

  
