// controllers/carController.js
const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  const { title, description, tags } = req.body;

  console.log('Received data:', { title, description, tags });

  try {
    // Check if tags are defined, and set a default value if not
    const tagsArray = tags ? tags.split(',') : [];

    const car = new Car({
      userId: req.user.id,
      title,
      description,
      tags: tagsArray,
    });

    console.log('Car to be saved:', car);

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error.message);
    res.status(500).json({ error: 'Server error. Unable to create car.' });
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
    if (!car || car.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.updateCar = async (req, res) => {
  const { title, description, tags } = req.body;
  const { id } = req.params;

  try {
    const car = await Car.findById(id);

    if (!car || car.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Car not found or unauthorized' });
    }

    // Update fields
    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags ? tags.split(',') : car.tags;

    // Save the car and log the updated data
    await car.save();
    console.log('Updated car:', car);  // Log the updated car data

    res.status(200).json(car); // Return the updated car in the response
  } catch (error) {
    console.error('Error updating car:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};




const mongoose=require('mongoose');


exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid car ID format' });
  }
  

  try {
    const car = await Car.findById(id);
    // console.log(car.userId);
    // console.log(req.user.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (car.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this car' });
    }

    await Car.findByIdAndDelete(id);
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Server error. Unable to delete car.' });
  }
};






