const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function(req, res) {

  app.use(express.static("public"));

  res.sendFile(__dirname + "/signup.html");


})

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const emailAddress = req.body.email;
  const data = {

    members: [{


        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName

        }
      }

    ]


  };

  const jsonData = JSON.stringify(data);
  const url = "https://us6.api.mailchimp.com/3.0/lists/997e9ba573";
  const options = {

    method: "POST",
    auth: "sachinpatwal07:3e67934cafd303e917dcaf5782135177-us6"
  }

  const request = https.request(url, options, function(respond) {

    respond.on("data", function(data) {

      if (respond.statusCode === 200)

        res.sendFile(__dirname + "/success.html");

      else
        res.sendFile(__dirname + "/failure.html");



    })

  })

  app.post("/failure",function(req,res){
    res.redirect("/");
  })

  request.write(jsonData);
  request.end();

})




app.listen(process.env.PORT || 3000, function() {

  console.log("server running at port no 3000");
})









//api key:  3e67934cafd303e917dcaf5782135177-us6
// unq id : 997e9ba573
