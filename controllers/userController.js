const mongoose = require("mongoose");
const dbConn = require("../db/database");
const userModel = require("../model/userModel");

const bcrypt = require("bcryptjs");

const utils = require("../utils/utils");

module.exports = {
  get: {},
  post: {
    signup: async(req,res)=>{
      const {name, email, password} = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, 10)
      const userResutl = await userModel.findOne({ email: email })
      if(userResutl){
        return res.json({
          status: 404,
          message: "User alreay exists with this email",
        })
      }
     const data = {
        name: name,
        email: email,
        password: hash,
        created_at: utils.getCurrentDate(),
        modified_at: utils.getCurrentDate(),
      };
      userModel.create(data)
      .then((result) =>{
        return res.json({
          status: 200,
            message: "User created successfully",
            data: result,
        })
      })
      .catch((err) => {
        return res.json({ status: 500, message: "Error " + err });
      });
    },
    // LOGIN API
    signin: async (req, res) => {
      const { email, password } = req.body;

      // Check the user first
      const userResult = await userModel.findOne({ email: email });

      if (!userResult) {
        return res.json({
          status: 404,
          message: "User not available with this email",
        });
      }

      const preHash = userResult.password;
      if (bcrypt.compareSync(password, preHash)) {
        let jsonToken = utils.generateAccessToken(userResult);

        return res.json({
          status: 200,
          message: "Login successful!",
          name: userResult.name,
          token: jsonToken,
        });
      } else {
        return res.json({ status: 503, message: "Invalid credentials!" });
      }
    },
  },
};