const express=require('express');
const router=express.Router();


router.get('/todo',(req,res)=>{
    res.json({
      data:"server started"
    })
})

module.exports=router