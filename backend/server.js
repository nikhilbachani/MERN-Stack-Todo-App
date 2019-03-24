const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
   console.log("MongoDB database connected successfully."); 
});

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if(err) {
           console.log(err);
        } 
        else {
            res.status(200).json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if(!todo){
            res.status(404).send("Todo not found.");
        }
        else {
            res.status(200).json(todo);
        }
    });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if(!todo){
            res.status(404).send("Todo not found.");
        }
        else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            
            todo.save().then(todo => {
                res.status(200).json("Todo updated successfully.");
            })
            .catch(err => {
                res.status(400).send("Update could not be applied.");
            });
        }
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.header('Location', todo._id);
            res.status(201).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new todo failed');
        }); 
});

todoRoutes.route('/delete/:id').delete(function(req, res) {
        Todo.findByIdAndDelete(req.params.id, function(err, todo) {
        if(!todo) {
            res.status(204);
        }
        else if(err) {
            res.status(400).json(err);
        }
        else {
             res.status(200).json({ 'message': 'Todo deleted!'});
        }
    });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
   console.log("Server is running on port: " + PORT); 
});