
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
    let category = params.get('category')
    var el = document.getElementById('header');
    el.innerHTML = category.toUpperCase() + ' Classes: ' + sites[site];
    $("#coursemenu").empty();
    $("#coursemenu").css("display", "block");
    let courses = courseIDs[category];
    $.each(courses.classes, function (_idx, obj) {
      let elemString = '<div><h2 onclick=$(\'#' + obj.id + site + '\').toggle() class="' + obj.id + site + '">' + obj.title + '</h2>' + ' <span class="cost">' + obj.cost + '</span>';
      elemString += '<div class="enrollware" id="' + obj.id + site + '" style="display:none"></div></div>';
      $("#coursemenu").append(elemString);
      $("div#" + obj.id + site).enrollware({
        feed: "https://trianglecpr.enrollware.com/registration/schedule-feed.ashx?courseid=" + obj.id + "&locationid=" + site
      });
    });
  };
  let coursesByLocation = function (location) {
      for (let category in courseIDs) {
        
        let div0 = document.createElement("div");
        let h01 = document.createElement('h1');
        let sp0 = document.createElement('span');
        let a0 = document.createElement('a');
        div0.appendChild(h01);
        h01.appendChild(sp0);
        h01.appendChild(a0);
        $("section#classlists").append(div0);

        div0.setAttribute('class', category);
        sp0.textContent = courseIDs[category]['title'] + ':';
        a0.setAttribute('href', '/pages/' + category + '_description.html');
        a0.setAttribute('class', 'redonwhite');
        a0.setAttribute('style', 'margin-left:2em;font-size: .625em;line-height: 1.45em;')
        a0.textContent = 'Course Details';
        
        for (let j = 0; j < courseIDs[category]['classes'].length; j++) {
          let course = courseIDs[category]['classes'][j];
          let div1 = document.createElement("div");
          let h02 = document.createElement('h2');
          let a1 = document.createElement('a');
          let sp1 = document.createElement('span');
          let sp2 = document.createElement('span');

          
          div0.appendChild(h02);
          h02.appendChild(a1);
          h02.appendChild(sp2);
          a1.appendChild(sp1);
          
          div1.setAttribute('id', course.id+location);
          div1.setAttribute('class', 'enrollware');
          div1.setAttribute('style', 'display:none');

          h02.setAttribute('style', 'color:maroon;cursor:pointer;');

          a1.setAttribute('href', '#');
          a1.setAttribute('class', 'redonwhite');
          a1.setAttribute('onclick', 'event.preventDefault();tcpr.toggleVisibility(' + course.id+location + ')');

          sp1.textContent = course.title;
          
          sp2.setAttribute('style', 'margin:1em;font-family:sans-serif;text-decoration:none');
          sp2.textContent = course.cost;

          div0.appendChild(div1);
          console.log("https://trianglecpr.enrollware.com/registration/schedule-feed.ashx?courseid="+course.id+"&locationid="+location);
          
          $("div#"+course.id+location).enrollware({
           feed:"https://trianglecpr.enrollware.com/registration/schedule-feed.ashx?courseid="+course.id+"&locationid="+location});
        }
      }
  };

  return {
    coursesByCategoryandLocation: coursesByCategoryandLocation,
    coursesByLocation: coursesByLocation,
    toggleVisibility: toggleVisibility
  };
}());
