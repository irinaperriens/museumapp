var iso = new Isotope( '.grid', {
  itemSelector: '.werkcontainer',
  layoutMode: 'fitRows',
  getSortData: {
    title: '.title',
    program: '[data-program]',
    category: '[data-category]'
  }
});


//filter
var filterFns = {
    popart: function( itemElem ) {
      var time = itemElem.querySelector('.time').textContent;
      return time.match(/popart/);
    },
    surrealisme: function( itemElem ) {
      var time = itemElem.querySelector('.time').textContent;
      return time.match(/surrealisme/);
    },
    magischrealisme: function( itemElem ) {
      var time = itemElem.querySelector('.time').textContent;
      return time.match(/Magisch realisme/);
    },
    futurisme: function( itemElem ) {
      var time = itemElem.querySelector('.time').textContent;
      return time.match(/futurisme/);
    }
  };


  var filtersElem = document.querySelector('.filters-button-group');
  filtersElem.addEventListener( 'click', function( event ) {
    // only work with buttons
    if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
    var filterValue = event.target.getAttribute('data-filter');
    // use matching filter function
    filterValue = filterFns[ filterValue ] || filterValue;
    iso.arrange({ filter: filterValue });
  });


  // change is-checked class on buttons
          var buttonGroups = document.querySelectorAll('.button-group');
          for ( var i=0; i < buttonGroups.length; i++ ) {
            buttonGroups[i].addEventListener( 'click', onButtonGroupClick );
          }

          function onButtonGroupClick( event ) {
            // only button clicks
            if ( !matchesSelector( event.target, '.button' ) ) {
              return;
            }
            var button = event.target;
            button.parentNode.querySelector('.is-checked').classList.remove('is-checked');
            button.classList.add('is-checked');
          }
