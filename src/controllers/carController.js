// controllers/carController.js
const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files ? req.files.map(file => file.path) : [];
  try {
    const car = new Car({ userId: req.user.id, title, description, tags: tags.split(','), images });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user.id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== req.user.id) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCar = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== req.user.id) return res.status(404).json({ message: 'Car not found' });

    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags ? tags.split(',') : car.tags;
    await car.save();
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== req.user.id) return res.status(404).json({ message: 'Car not found' });
    await car.remove();
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
