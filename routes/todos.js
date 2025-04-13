 
// backend/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Import the model

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc    Add a new todo
// @route   POST /api/todos
// @access  Public
router.post('/', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ msg: 'Please include text for the todo' });
  }

  try {
    const newTodo = new Todo({
      text, // isCompleted defaults to false
    });

    const todo = await newTodo.save();
    res.status(201).json(todo); // 201 Created status
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});





router.put('/:id', async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    // Toggle the isCompleted status
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { isCompleted: !todo.isCompleted },
      { new: true } // Return the updated document
    );

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    // Handle potential CastError if ID format is invalid
    if (err.kind === 'ObjectId') {
       return res.status(404).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
     // Handle potential CastError if ID format is invalid
     if (err.kind === 'ObjectId') {
       return res.status(404).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Server Error');
  }
});



module.exports = router;
