
let tcpr = (function () {
  "use strict";
  let toggleVisibility = function (id) {
    (function (style) {
      style.display = style.display === 'none' ? '' : 'none';
      return false;
    })(document.getElementById(id).style);
    return false;
  };
  
  let coursesByCategoryandLocation = function () {
    let url = window.location.search;
    let params = new URLSearchParams(url);
    let site = params.get('site');
    let category = params.get('category');
    var el = document.getElementById('header');
    el.innerHTML = category.toUpperCase() + ' Classes: ' + sites[site];
    $("#coursemenu").empty();
    $("#coursemenu").css("display", "block");
    let courses = courseIDs[category];
    $.each(courses.classes, function (_idx, obj) {
      let elemString = '<div><h2 onclick=$(\'#' + obj.id + site + '\').toggle() class="' + obj.id + site + '">' + obj.title + '</h2>' + ' <span class="cost">' + obj.cost + '</span><p>&nbsp;</p>';
      elemString += '<div class="enrollware" id="' + obj.id + site + '" style="display:none"></div></div>';
      $("#coursemenu").append(elemString);
      $("div#" + obj.id + site).enrollware({
        feed: "https://trianglecpr.enrollware.com/registration/schedule-feed.ashx?courseid=" + obj.id + "&locationid=" + site
      });
    });
  };
  let coursesByLocation = function (location) {
    for (let category in courseIDs) {
      console.log(category);
      let courses = courseIDs[category];

      $.each(courses.classes, function (_idx, obj) {
        console.log(obj.title);
      let elemString = '<div><h2 onclick=$(\'#' + obj.id + location + '\').toggle() class="' + obj.id + location + '">' + obj.title + '</h2>' + ' <span class="cost">' + obj.cost + '</span><p>&nbsp;</p>';
      elemString += '<div class="enrollware" id="' + obj.id + location + '" style="display:none"></div></div>';
      $("#coursemenu").append(elemString);
      $("div#" + obj.id + location).enrollware({
        feed: "https://trianglecpr.enrollware.com/registration/schedule-feed.ashx?courseid=" + obj.id + "&locationid=" + location
      });
    });
      
    }
  };
      
  
  

  return {
    coursesByCategoryandLocation: coursesByCategoryandLocation,
    coursesByLocation: coursesByLocation,
    toggleVisibility: toggleVisibility
  };
}());
