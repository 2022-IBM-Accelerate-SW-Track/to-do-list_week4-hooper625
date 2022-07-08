//imports external modules and sets the environment variable
const express = require("express"),
                  app = express(),
                  port = process.env.PORT || 8080,
                  cors = require("cors");
           const bodyParser = require('body-parser');
           const fs = require("fs");

           //sets up express application and returns a message to console
           //once the application is running
           app.use(cors());
           app.use(bodyParser.json({ extended: true }));
           app.listen(port, () => console.log("Backend server live on " + port));

           //returns a message once a GET request to the specific route is made
           app.get("/", (req, res) => {
            res.send({ message: "Connected to Backend server!" });
            });

            //makes a call the addItem function once a post request to the specific route is made
            app.post("/add/item", addItem)

            //takes in a request from the ToDo list application
            //converts a new json object
            //appends the jason list located in the file
            function addItem (request, response) {
                let id = request.body.jsonObject.id
                let task = request.body.jsonObject.task
                let curDate = request.body.jsonObject.currentDate
                let dueDate = request.body.jsonObject.dueDate
                var newTask = {
                  ID: id,
                  Task: task,
                  Current_date: curDate,
                  Due_date: dueDate
                }
                const jsonString = JSON.stringify(newTask)
    
                var data = fs.readFileSync('database.json');
                var json = JSON.parse(data);
                json.push(newTask);
                fs.writeFile("database.json", JSON.stringify(json), function(err, result) {
                  if (err) { console.log('error', err) }
                  else { console.log('Successfully wrote to file') }
                });
                response.send(200)
                }