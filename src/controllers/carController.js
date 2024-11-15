// controllers/carController.js
const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  const { title, description, tags } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Ensure path starts with '/uploads'

  try {
    const car = new Car({
      userId: req.user.id,
      title,
      description,
      tags: tags.split(','),
      images: image ? [image] : [], // Store image path as relative to the public directory
    });
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
  const { id } = req.params;

  try {
    let car = await Car.findById(id);
    if (!car || car.userId.toString() !== id) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Handle image update (if any):
    let updatedImage = null;
    if (req.files && req.files.image) { // Check for image upload
      const image = req.files.image;
      updatedImage = image.path; // Get the path of the uploaded image
    }

    // Update car details:
    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags ? tags.split(',') : car.tags;
    if (updatedImage) {
      car.image = updatedImage; // Update image path if uploaded
    }

    await car.save();
    res.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== id) return res.status(404).json({ message: 'Car not found' });
    await car.remove();
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
