'user strict';

var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');

class User{
  constructor(obj){
    this.email = obj.email;
    this.password = obj.password;
  }

  login(fn){
    console.log('HELLO DO I WORK??????');
    users.findOne({email: this.email}, (err,u)=>{
      if(u){
        console.log(this.password);
        console.log(u.password);
        var isMatch = bcrypt.compareSync(this.password, u.password);
        console.log(isMatch);
        if (isMatch) {
          fn(u);
        }else{
          fn(null);
        }
      }else{
        this.password = bcrypt.hashSync(this.password, 8);
        users.save(this, (err, u)=>{
          fn(u);
        });
      }
    });
  }

  static findByUserId(id, fn){
    id = Mongo.ObjectID(id);
    users.findOne({_id: id}, (err,u)=>{
      fn(u);
    });
  }
}

module.exports = User;
