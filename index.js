const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/Emp",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if(!err)
    {
        console.log("connected to db")
    }
    else{
        console.log("error connecting to db")
    }
});

const employeeSchema = new mongoose.Schema({
    employeeId: Number,
    employeeName: String,
    employeeDesignation: String
});

const Employee = mongoose.model('Employee', employeeSchema);

app.post('/insert', async(req,res) => {
    const emp = new Employee({
        employeeId:req.body.employeeId,
        employeeName:req.body.employeeName,
        employeeDesignation:req.body.employeeDesignation
    })
    
    const val = await emp.save();
             res.json(val);
})

app.get('/fetch/:employeeId', (req, res) => {
    fetchId=req.params.employeeId;
    Employee.find(({employeeId:fetchId}), function(err,val){
        if(err){
            res.send("ERROR")
        }
        else{
        if(val.length == 0){
            res.send("Data does not Exist")
        }
        else{
            res.send(val);
        }
    }
    })
});


app.get('/fetchAll', (req, res) => {
    Employee.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        }
        console.log(err);
        res.send("Some error occured!")
    })
});


app.delete('/delete/:employeeId', function(req, res) {
    let delId = req.params.employeeId;
    Employee.findOneAndDelete(({employeeId:delId}), 
    function(err, data) {
        if(err){
            res.send("Error")
        }else{
        if(data==null){
            res.send("ID does not exist")
        }
      else{
            res.send(data);
      }
    }
    });  
});

app.put('/update/:employeeId', async(req, res) => {
    let upId = req.params.employeeId;
    let newId=req.body.employeeId;
    let upName = req.body.employeeName;
    let upDesignation = req.body.employeeDesignation;
    Employee.findOneAndUpdate({employeeId:upId},{$set:{employeeId:newId,employeeName:upName,employeeDesignation:upDesignation}},
         {new:true}, (err,data)=>{
        if(err){
            res.send("ERROR")
        }else{
        if(data==null)
        {
            res.send("Nothing found")
        }
        else{
            res.send(data)
        }
    }
    })
 
});


app.listen(3000, () => console.log("Server is running on port 3000"));