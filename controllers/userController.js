// const User=require("../models/User");

// const createUser= async(req,res)=>{
//     const {name,email,password}=req.body;
//     try{

//         const user=new User({name,email,password});
//         await user.save();
//         res.json(user);
//     }catch(error){
//         res.status(500).send("server error");
//     }
// }

// const getUser=async(req,res)=>{
//     try{
//      const user=await User.findById(req.params.id);
//      res.json(user);
//     }catch(error){
//     res.status(500).send("server error");
//     }
// }

// module.exports={createUser,getUser};


const User = require("../models/User");

const createUser = async (req, res) => {
    const { name, email, password,amount } = req.body || {};
    
    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    try {
        const user = new User({ name, email, password ,amount});
        await user.save();
        res.status(201).json(user); // Return 201 status code for created user
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).send("Server error");
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        // Handle case when user is not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).send("Server error");
    }
};



const getAllUser=async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


  const getUserByEmail = async (req,res) => {
    const { email } = req.params;

    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return { error: 'User not found', status: 404 };
      }
  
      res.json(user); // Return user and status if found
    } catch (error) {
      console.error('Error fetching user details:', error);
      return { error: 'Server error', status: 500 };
    }
  };




module.exports = { createUser, getUser,getAllUser, getUserByEmail};
