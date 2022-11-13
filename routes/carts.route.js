const express = require("express");
const { CartModel } = require("../models/cart.model.js");
const { ProductModel } = require("../models/Product.model");
const cartsRouter=express.Router()


cartsRouter.get("/",async(req,res)=>{
           const data=await CartModel.find()
           res.send({"data":data})
})

cartsRouter.post("/addtocart", async(req,res)=>{
    const {user_id,product_id,quantity}=req.body
    const data=await ProductModel.findOne({_id:product_id})
    const new_product = new CartModel({
        title:data.title,
        gender:data.gender,
        name:data.name,
        sub_type:data.sub_type,
        category:data.sub_type,
        colour:data.colour,
        price:data.price,
        quantity:quantity,
        brand:data.brand,
        discription:data.discription,
        image1:data.image1,
        image2:data.image2,
        image3:data.image3,
        user_id:user_id
    })
    await new_product.save()
    res.send({"new_product":new_product})
})

cartsRouter.delete("/deleteorder/:id",async(req,res)=>{
    const {id}=req.params
    const data=await CartModel.findOne({_id:id})
    if(data){
        await CartModel.deleteOne({_id:id})
        res.send({"msg":"product is deleted","data":data})
    }
    else{
        res.send({"msg":"product not exist more"})   
    }

})

// cartsRouter.patch("/orderupdate/:id",async(req,res)=>{
//     const _id=req.params
//     // const {quantity}=req.body
//     const data=await CartModel.findOne({_id:_id})
//     const new_note = await CartModel.findByIdAndUpdate(_id,req.body);
//         res.send({ message: "updated", new_note })
// })

module.exports={cartsRouter}




// notesRouter.patch("/:userId/update/:notesId", async (req, res) => {
//     const userId = req.params.userId;
//     const notesId = req.params.notesId;
//     const note = await NotesModel.findOne({ _id: notesId });
  
//     if (note.userId !== userId) {
//       return res.send("You are not authorized");
//     }
//     const new_note = await NotesModel.findByIdAndUpdate(notesId, req.body);
//     res.send({ message: "updated", new_note });
//   });


// app.patch("/todos/update", async (req, res) => {
//     const {taskname, status, tag, user_id } = req.body;
  
//     const todos = await TodoModel.findByIdAndUpdate({ user_id: user_id });
//     if(todos){
//    todos.taskname = taskname;
//    todos.status = status;
//    todos.tag = tag; 
//    const updateTodo = await todos.save( )
//    res.json(updateTodo)
//     }
//     else{
//    res.status(400).send("Not found ")
//     }
//     res.send("getTodo");
//   });
  
  