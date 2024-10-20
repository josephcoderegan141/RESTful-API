const express = require("express");
const app = express();
const fs = require('fs');
const csv = require('csv-parser');

let Employee  = [];

app.use(express.json());//can recieve post requests in json format

//read in file reference medium 
fs.createReadStream('C:/Users/eganj/OneDrive - Maynooth University/Personal projects/internchallenge_Joseph_Egan/Book(Sheet1).csv')
.pipe(csv())  // Set the separator to comma
.on('data', (data) => Employee.push(data))//adds data to array 
.on('end', () => {
console.log('CSV file successfully processed');
console.log(Employee);

})


app.get('/',(req,res)=>{//first para is location second is call back function
    res.send('Hello its working!!');
});


app.get('/employees', (req, res) => {// returns all employees
    res.send(Employee);
});


app.post('/newEmp',(req,res)=>{//create new user 

    res.send("reached");
    console.log(req.body);
    const newEmp = req.body;
    Employee.push(newEmp);
});


app.get('/:id',(req,res)=>{//search user by id 

    const  val = req.params.id;
    const founduser = Employee.find((user) => user.id === val);
    
    if (founduser) {
      res.send(founduser);
    } else {
      res.send('Employee not found');
    }
});

app.delete('/:id',(req,res)=>{// delete user 

    const  val = req.params.id;

    Employee = Employee.filter((user) => user.id !== val);// filter funtion works by removing given elemnt if parameters return false

    res.send('Employee Deleted ');
})

app.patch('/:id',(req,res)=>{//update user 

    const  val = req.params.id;
    const { name, position,salary} = req.body;//values that get passed in through postman 
    const toupdate = Employee.find((user) => user.id === val);

    if(name){
        toupdate.name = name;
    }
    if(position){
        toupdate.position = position;
    }
    if(salary){
        toupdate.salary = salary;
    }
    res.send('has been updated');
});


app.listen(5000, ()=>{
    console.log('Server is running');
});