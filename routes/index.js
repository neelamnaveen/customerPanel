var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var cors = require("cors");
var JSAlert = require("js-alert");


router.options('*', cors())

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://naveen:nnaveen@cluster0.u1nx4.mongodb.net/naveen', { useNewUrlParser: true, useUnifiedTopology: true });

// Database connectivity check
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database connected");
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


const customerSchema = {
    name: String,
    email: String,
    contactNo: String,
    address: String
}
const customers = mongoose.model("customers", customerSchema);

router.get("/allCustomers", function(req, res) {
    console.log("Showing all customers");
    customers.find({}, function(err, foundItems) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundItems); // Test
        }
    })
    res.redirect('/')
});


// app.post("/compose", function(req, res){

//     const post = new postsd ({
//     title: req.body.postTitle,
//     content: req.body.postBody
//     });
//     post.save();
//     res.redirect("/");
//   });


router.get("/addCustomer", function(req, res) {
    console.log("Customer adding...");
    const newCustomer = new customers({
        name: req.query.name,
        email: req.query.email,
        contactNo: req.query.contactNo,
        address: req.query.address
    });
    newCustomer.save();
    // Show a plain alert
    JSAlert.alert("Added new customer successfully");
    res.redirect("/");
});


module.exports = router;