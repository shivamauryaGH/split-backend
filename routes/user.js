const express=require("express");

const router=express.Router();
const { createUser, getUser,getAllUser,getUserByEmail } = require('../controllers/userController');
router.post("/signup",createUser)
router.get("/:id",getUser);
router.get("/",getAllUser);
router.get("/email/:email",getUserByEmail);


module.exports=router;