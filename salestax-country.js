"use strict";


module.exports = function salestax( options ) {
  var seneca = this

  Object.keys( options ).forEach( function( country ){
    seneca.add({
      role:    'salestax',
      cmd:     'calculate',
      country: country

    }, calculate(country))
  })

  function calculate( country ) {
    return function(args, done ) {
      var total = args.net * (1+options[country])
      done( null, { total:total, country:country } )
    }
  }
}
