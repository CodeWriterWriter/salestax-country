var PORT = process.env.PORT || 51002
var rates = {ie:0.21, uk:0.20, de:0.19}

require('seneca')()
  .use('..', rates )
  .listen( PORT )
