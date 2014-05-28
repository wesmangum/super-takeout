'user strict';

var dishes = global.nss.db.collection('dish');
var _ = require('lodash');
var Mongo = require('mongodb');
var async = require('async');

class Dish{
  static findAll(fn){
    dishes.find().toArray((err,d)=>{
      fn(d);
    });
  }

  static menu(fn){
    Dish.findAll(dishes=>{
      var menus = _(dishes).map(d=>d.menu).uniq().value();
      fn(menus);
    });
  }

  static findDishesByMenu(menu, fn){
    dishes.find({menu: menu}).toArray((err, dishes)=>{
      fn(dishes);
    });
  }

  static getDishes(dishIds){
    dishIds = this.makeArray(dishIds);
    var dishArray = [];
    async.each(dishIds, (id, callback)=>{
      id = Mongo.ObjectID(id);
      dishes.findOne({_id: id}, (err, dish)=>{
        // console.log(dish);
        dishArray.push(dish);
        callback();
      });
    }, (err)=>{
      console.log(dishArray);
      return dishArray;
    });
  }

  static makeArray(obj){
    if(Array.isArray(obj)){
      // console.log(obj);
      return obj;
    }else{
      // console.log([obj]);
      return [obj];
    }
  }
}

module.exports = Dish;
