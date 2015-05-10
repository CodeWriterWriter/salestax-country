
var assert = require('assert')

var rates = {ie:0.21, uk:0.20, de:0.19}

var seneca = require('seneca')()
      .use('..', rates )

describe('salestax-country', function(){

  it('happy', function( fin ){
    function check(country) {
      return function(out) {
        try {
          assert.equal( 100*(1+rates[country]), out.total )
        }
        catch(e){ fin(e) }
        return true;
      }
    }

    seneca
      .start(fin)
      .wait('role:salestax,cmd:calculate,country:ie,net:100')
      .step(check('ie'))

      .wait('role:salestax,cmd:calculate,country:uk,net:100')
      .step(check('uk'))

      .wait('role:salestax,cmd:calculate,country:de,net:100')
      .step(check('de'))

      .end(fin)
  })

})
