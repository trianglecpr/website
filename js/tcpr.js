var tcpr = (function () {
  "use strict";
  var courseIDs = {
    'bls': [
      { 'id': '7276',
        'title': 'Healthcare Provider CPR (BLS) Initial'},
      { 'id': '7275',
        'title': 'Healthcare Provider CPR (BLS) Renewal'},
      { 'id': '52177',
        'title': 'Healthcare Provider CPR (BLS) Skills Check'}
    ],
    'acls': [
      { 'id': '7278',
        'title': 'ACLS- Initial'},
      { 'id': '7277',
        'title': 'ACLS Renewal'},
      { 'id': '7475',
        'title': 'ACLS Skills Check'},
      { 'id': '7280',
        'title': 'ACLS/BLS Initial'},
      { 'id': '7279',
        'title': 'ACLS/BLS Renewal'},
      { 'id': '7284',
        'title': 'PALS Initial'},
      { 'id': '7285',
        'title': 'PALS Renewal'},
      { 'id': '7288',
        'title': 'PALS Skills Check'}
    ],
    'heartsaver': [
      { 'id': '7281',
        'title': 'Heartsaver CPR'},
      { 'id': '31031',
        'title': 'Heartsaver CPR Skills Check'}
    ],
    'heartsaverfirstaid': [
      { 'id': '7282',
        'title': 'Adult First Aid & CPR'},
      { 'id': '7293',
        'title': 'Heartsaver First Aid'},
      { 'id': '7283',
        'title': 'Pediatric First Aid & CPR'},
      { 'id': '31030',
        'title': 'Pediatric First Aid & CPR Skills Check'}
    ]
  };
  
  return { 
    getURL: function (name) {
      return courseIDs[name];
    }
  };
}());

