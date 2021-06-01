var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var cors = require("cors");
var JSAlert = require("js-alert");
require('dotenv').config()

router.options('*', cors())

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
const mongoose = require('mongoose');

var DATABASE_URI=process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Database connectivity check
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database connected");
});

/* GET home page. */
router.get('/', function(req, res, next) {
    alert("Hi");
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