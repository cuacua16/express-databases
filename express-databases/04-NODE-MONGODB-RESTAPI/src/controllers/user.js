const User = require("../models/user.js");
const Car = require("../models/car.js");

module.exports = {
  index: async function (req, res, next) {
    const users = await User.find({});
    res.json(users);
  },
  newUser: async function (req, res, next) {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(200).json(user);
  },
  getUser: async function (req, res, next) {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  },
  replaceUser: async function (req, res, next) {
    const newUser = req.body;
    const oldUser = await User.findByIdAndUpdate(req.params.id, newUser);
    res.status(200).json({ success: true });
  },
  updateUser: async function (req, res, next) {
    const newUser = req.body;
    const oldUser = await User.findByIdAndUpdate(req.params.id, newUser);
    res.status(200).json({ success: true });
  },
  deleteUser: async function (req, res, next) {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true });
  },
  getUserCars: async function (req, res, next) {
    const user = await User.findById(req.params.id).populate("cars");
    res.status(200).json(user);
  },
  newUserCar: async function (req, res, next) {
    const newCar = new Car(req.body);
    const user = await User.findById(req.params.id);
    newCar.seller = user;
    await newCar.save();
    user.cars.push(newCar);
    await user.save();
    res.status(200).json(newCar);
  },
};
