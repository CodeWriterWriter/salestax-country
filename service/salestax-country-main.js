var WEB_PORT = process.env.WEB_PORT || 51002
var WEB_HOST = process.env.WEB_HOST || 'localhost'
var BS_PORT  = process.env.BS_PORT  || 11300
var BS_HOST  = process.env.BS_HOST  || 'localhost'

var rates = {it:0.22, ie:0.21, uk:0.20, de:0.19}

require('seneca')()
  .use('..', rates )

  .use('beanstalk-transport')
  .listen({
    type: 'beanstalk',
    pin:  'role:salestax,cmd:calculate,country:*',
    port:  BS_PORT,
    host:  BS_HOST  
  })
  .listen({
    port:WEB_PORT, 
    host:WEB_HOST
  })
