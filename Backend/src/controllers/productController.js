// controllers/userController.js
import User from '../models/userModel.js';

export const updateProducts = async (req, res) => {
  try {
    const { username } = req;
    const newProduct = req.body.product;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    // Add the new product to the products array
    user.products.push(newProduct);

    // Save the updated user document
    await user.save();

    res.status(200).send({
      message: 'Product added successfully',
      products: user.products,
    });
  } catch (error) {
    console.error('Error updating products:', error);
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { username } = req;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    res.status(200).send({
      products: user.products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};