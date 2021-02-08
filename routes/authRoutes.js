const express = require('express')
const { Router } = require('express');
const Razorpay  = require('razorpay');
const { json } = require('body-parser');
const router = express.Router()
let nodemailer = require('nodemailer');

const cors = require('cors');
multer = require('multer')
multer({
    limits: { fieldSize: 2 * 1024 * 1024 }
  })
    router.use(cors({ origin: true }));
//code for images
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage: storage })
//end code for images
var transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net", 
      port: 587,
      secure: false,
    auth: {
      user: "info@abayakasthaa.com",
      pass: "Giks@123#" 
    }
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log("not verify"+error);
    } else {
      console.log("Server is ready to take our messages!");
    }
  });

  const instance = new Razorpay({
    key_id: 'rzp_test_SdY6h3N8idtwex',
    key_secret: 'y9h7qfG4LDcIznqpAzaGVBHN',
});
router.post("/order", (req, res) => {
  try {
    const options = {
      amount: 10 * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
 // 1 for automatic capture // 0 for manual capture
    };
  instance.orders.create(options, async function (err, order) {
    if (err) {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  return res.status(200).json(order);
 });
} catch (err) {
  return res.status(500).json({
    message: "Something Went Wrong",
  });
 }
});
router.post('/access', upload.single('image'), (req, res, next) => {
  const {name,email,message} = req.body
   
    // var content = `email: ${email} \n message: ${message} `

    var mail = {
      from: "info@abayakasthaa.com", 
      to: "info@abayakasthaa.com",
      subject:"wants to Download Clinical Trial Report", 
      message:"wants to Download Clinical Trial Report",
      html:"<strong>"+"Name : "+"</strong>"+ name+"<br>"+"<strong>"+"Email : "+"</strong>"+email+"<br>"+"<strong>"+"Message : "+"</strong>"+message
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        console.log("mail send")
        res.json({
         status: 'success',
        })
      }
    })
  })


  router.post('/contactaccess', upload.single('image'), (req, res, next) => {
    const {name,email,message} = req.body
     
      // var content = `email: ${email} \n message: ${message} `
  
      var mail = {
        from: "info@abayakasthaa.com", 
        to: "info@abayakasthaa.com",
        subject:"Contact", 
        message: "Contact",
        html:"<strong>"+"Name : "+"</strong>"+ name+"<br>"+"<strong>"+"Email : "+"</strong>"+email+"<br>"+"<strong>"+"Message : "+"</strong>"+message
      }
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            status: 'fail'
          })
        } else {
          console.log("mail send")
          res.json({
           status: 'success',
          })
        }
      })
    })
// end Points
module.exports = router

