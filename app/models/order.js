'user strict';

var dishes = global.nss.db.collection('dish');
// var orders = global.nss.db.collection('orders');
// var _ = require('lodash');
var Mongo = require('mongodb');

class Order{
  constructor(userId) {
    this.userId = userId;
    this.date = new Date();
  }

  totalCost(obj, fn){
    // var quantities = dishes.quantity;
    var dishIds = obj.dishId;

    // console.log(typeof dishes.quantity);
    console.log(dishIds);

    this.findAllById(dishIds, dish=>{
      console.log('totalcost xxxxxxxxxxxxxxx');
      console.log(dish);
      fn(dish);
    });
  }

  findAllById(dishId, fn){
    if (typeof dishId === 'object') {
      dishId = $(dishId).toArray();
      dishes.find({_id: {$in: dishId}}).toArray((err, dishes)=>{
        console.log(dishes);
      });

    }else{
      dishId = Mongo.ObjectID(dishId);
      dishes.findOne({_id: dishId}, (err, dish)=>{
        fn(dish);
      });
    }
  }


}

module.exports = Order;
