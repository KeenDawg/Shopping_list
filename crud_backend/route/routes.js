var express = require('express');
var router = express.Router();


const Item = require('../model/shoppingItem');
//retreiving data from database
router.get('/items', (req,res,next)=>{
  Item.find(function(err, items){
    if (err){
      res.json(err);
    }
    else{
      res.json(items);
    }
  });
});

//inserting new data
router.post('/item', (req,res,next)=>{
  let newShoppingItem = new Item({
    itemName: req.body.itemName,
    itemQuantity: req.body.itemQuantity,
    itemBought: req.body.itemBought
  });
  newShoppingItem.save((err,item)=>{
    if(err){
      res.json(err);
    }
    else{
      res.json({msg: "Item has been added successfully"});
    }
  });
});

//route for updating item in the database
router.put('/item/:id' ,(req,res,next)=>{
  Item.findOneAndUpdate({_id:req.params.id}, {
    $set:{
      itemName: req.body.itemName,
      itemQuantity: req.body.itemQuantity,
      itemBought: req.body.itemBought
    }
  },
function(err,result){
  if (err){
    res.json(err);
  }
  else{
    res.json(result);
  }
})
});

//route for deleting item from the database
router.delete('/item/:id', (req,res,next)=>{
  Item.deleteOne({_id: req.params.id}, function(err, result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  });
});


module.exports = router;
