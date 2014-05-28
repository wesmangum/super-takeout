'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname+'/../models/dish.js');
var User = traceur.require(__dirname+'/../models/user.js');
var Order = traceur.require(__dirname+'/../models/order.js');


exports.new = (req, res)=>{
  Dish.menu(menus=>{
    User.findByUserId(req.session.userId, user=>{
      res.render('orders/new', {title: 'Takeout: New Order', menus: menus, user: user});
    });
  });
};

exports.create = (req, res)=>{
  var dishes = Dish.getDishes(req.body.dishId);
  console.log(dishes);
  var order = new Order(req.session.userId);
  console.log(order);
  // order.totalcost = order.totalCost(req.body, dish=>{
  //   console.log('create xxxxxxxxxxxxxxx');
  //   console.log(dish);
  // });
};
