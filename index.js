require("dotenv").config(); 
const express = require("express");
const app = express();


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/users",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const employeeSchema = new mongoose.Schema({
    employeeId: Number,
    employeeName: String,
    employeeDesignation: String
});

const Employee = mongoose.model('Employee', employeeSchema);

const emp = new Employee({
    employeeId: 123,
    employeeName: "Yashika",
    employeeDesignation: "Student"
});
emp.save().then(() => console.log("One entry added"));

app.post('/', (req,res) => {
    const emp = new Employee();
    emp.employeeId = req.body.employeeId;
    emp.employeeName = req.body.employeeName;
    emp.employeeDesignation = req.body.employeeDesignation;
    emp.save( (err, data) => {
        if(err){
            console.log(error);
        }
        else{
            res.send("Data Inserted")
        }
    });
})

app.get('/', (req, res) => {
    Employee.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        }
        console.log(err);
        res.send("Some error occured!")
    })
});

app.delete('/delete', (req,res) => {
    Employee.remove({employeeId: 17035},
     (err, data) => {
         if(err){
             console.log(err);
         }
         else{
             res.send(data);
         }
     })
})
 
app.post('/delete', function(req, res) {
    Employee.findByIdAndDelete((req.body.employeeId), 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data Deleted!");
        }
    });  
});

app.post('/update', function(req, res) {
    Employee.findByIdAndUpdate(req.body.employeeId, 
    {employeeName:req.body.employeeName}, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data updated!");
        }
    });  
});

app.listen(3000, () => console.log("Server is running"));