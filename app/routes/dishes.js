'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname+'/../models/dish.js');
// var User = traceur.require(__dirname+'/../models/user.js');


exports.menu = (req, res)=>{

  Dish.findDishesByMenu(req.params.menu, dishes=>{
    res.render('orders/menu', {dishes: dishes}, (err, html)=>{
      res.send(html);
    });
  });
};
