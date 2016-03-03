(function ($) {
  $.fn.enrollware = function (options) {
    var settings = {
      feed: null,
      showLocations: false,
      showSeatsRemaining: true
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
            $container.append("<div>No matching classes were found. Please call for an appointment</div>");
          },
          "success": function (items) {
            $container.empty();
            if (items.length == 0) {
              $container.empty();
              $container.append("<div>No matching classes were found. Please call for an appointment.</div>");
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
                contents += "Note that this class also meets on:";
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
//                if (item.dateTimes !== null && item.dateTimes.length == 1 && opts.showLocations == false) {
//                  $a.attr("class", "singleline");
//                }
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
        'title': 'Healthcare Provider CPR (BLS)',
        'cost': '$50, book $13.25'},
      { 'id': '52177',
        'title': 'Healthcare Provider CPR (BLS) Online and Skills Check',
        'cost': '$55'}
    ],
    'acls': [
      { 'id': '7278',
        'title': 'ACLS- Initial',
        'cost': '$225, book $33.50'},
      { 'id': '7277',
        'title': 'ACLS Renewal',
        'cost': '$150, book $33.50'},
      { 'id': '7475',
        'title': 'ACLS Online and Skills Check',
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
        'title': 'PALS Online and Skills Check',
        'cost': ''}
    ],
    'heartsaver': [
      { 'id': '7281',
        'title': 'Heartsaver CPR',
        'cost': '$50'},
      { 'id': '31031',
        'title': 'Heartsaver CPR Online and Skills Check',
        'cost': ''}
    ],
    'heartsaverfirstaid': [
      { 'id': '7282',
        'title': 'Adult First Aid & CPR',
        'cost': '$65'},
      { 'id': '7283',
        'title': 'Pediatric First Aid & CPR',
        'cost': '$65'},
      { 'id': '31030',
        'title': 'Pediatric First Aid & CPR Online and Skills Check',
        'cost': ''}
    ]
  };
  
  var getCourses = function(fstem){
    var courses = tcpr.getURL(fstem);
    $.each(courses, function(idx, obj){
      var elemString = '<div><h2 class="' + obj.id + '">' + obj.title + ' <span class="cost">' + obj.cost + '</span></h2>';
      elemString += '<div class="enrollware" id="' + obj.id + '" style="display: none"></div></div>';
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
  };
  var getAllCourses = function() {
    var courseNames = [
      {'name': 'bls', 'title':'Basic Life Support for the Healthcare Provider'},
      {'name': 'acls', 'title':'Advanced Life Support'},
      {'name': 'heartsaver', 'title':'Heartsaver CPR'},
      {'name': 'heartsaverfirstaid', 'title':'Heartsaver CPR and First Aid'}
      ];
    for (var i = 0; i < courseNames.length; i++) {
      var div0 = document.createElement( "div" );
      var h01 = document.createElement('h1');
      div0.appendChild(h01);
      $("section#classlists").append(div0);
      var sp0 = document.createElement('span');
      var courseCategory, categoryTitle, categoryLabel;
      
      for (var category in courseIDs) {
        if (category === courseNames[i]['name']) {
          categoryLabel = category;
          courseCategory = courseIDs[category];
          categoryTitle = courseNames[i]['title']
          break;
        }
      }
      
      div0.setAttribute('class', 'courseCategory');
      sp0.textContent = categoryTitle + ':';
      var a0 = document.createElement('a');
      a0.setAttribute('href', '/content/' + categoryLabel + '.html');
      a0.setAttribute('style', 'margin-left:2em;font-size: .625em;line-height: 1.45em;')
      a0.textContent = 'Details »';
      h01.appendChild(sp0)
      h01.appendChild(a0)
      for (var j = 0; j < courseCategory.length; j++) {
        var course = courseCategory[j];
        var div1 = document.createElement( "div" );
        var h02 = document.createElement('h2');
        var a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('onclick', 'event.preventDefault();toggleVisibility('+course.id+')')
        h02.appendChild(a)
        div0.appendChild(h02);
        
        div1.setAttribute('id', course.id);
        div1.setAttribute('class', 'enrollware');
        div1.setAttribute('style', 'display:none');
        h02.setAttribute('style', 'color:maroon;cursor:pointer;');
        var sp1 = document.createElement('span');
        sp1.textContent = course.title;
        var sp2 = document.createElement('span');
        sp2.setAttribute('style', 'margin:1em;color:#333;font-family:sans-serif;text-decoration:none');
        sp2.textContent = course.cost;
        a.appendChild(sp1);
        h02.appendChild(sp2);
        
        div0.appendChild(div1);
        $("div#"+course.id).enrollware({
          feed:"https://trianglecpr.enrollware.com/registration/schedule-feed.ashx?courseid="+course.id});
      }
    }
  };
  
  return { 
    getURL: function (name) {
      return courseIDs[name];
    },
    getCourses: getCourses,
    getAllCourses: getAllCourses
  };
}());

  
