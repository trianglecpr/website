(function ($) {
    $.fn.enrollware = function (options) {
      var settings = {
        feed: null,
        showLocations: true,
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
                else if (item.seatsLeft == 0) {
                  contents += " (full)";
                }
  
                if (opts.showLocations) {
                  contents += "<span><br>" + item.location + "</span>";
                }
  
                if (item.dateTimes !== null && item.dateTimes.length > 1) {
                  contents += "<br><br>";
                  contents += "This class continues on:";
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
                    $a.addClass("greylink");
                  } else if (item.seatsLeft > 0) {
                    $a.attr("title", "Click to choose this class");
                  }
                  else {
                    $a.attr("title", "This class is full");
                    $a.addClass("greylink");
                  }
                  if (item.dateTimes !== null && item.dateTimes.length == 1 && opts.showLocations == false) {
                    $a.addClass("singleline");
                  }
                }
                else {
                  $a.attr("title", "Click to register without a schedule");
                  $a.addClass("singleline");
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
  