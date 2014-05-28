'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var orders = traceur.require(__dirname + '/../routes/orders.js');
  var dishes = traceur.require(__dirname + '/../routes/dishes.js');



  app.get('/', dbg, orders.new);
  app.get('/login', dbg, users.new);
  app.post('/login', dbg, users.login);

  app.get('/orders', dbg, orders.new);
  app.post('/orders', dbg, orders.create);

  app.get('/dishes/:menu', dbg, dishes.menu);


  app.get('/help', dbg, home.help);
  console.log('Routes Loaded');
  fn();
}
