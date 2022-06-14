const User = require('../models/User')


const userCtrl = {
    updateUser: async (req,res,next)=>{
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    },

    deleteUser: async (req,res,next)=>{
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("L'utilisateur a été supprimé.");
      } catch (err) {
        next(err);
      }
    },

    getUser: async (req,res,next)=>{
      try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
    },

    getAllUsers: async (req,res,next)=>{
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        next(err);
      }
    }
}

module.exports = userCtrl