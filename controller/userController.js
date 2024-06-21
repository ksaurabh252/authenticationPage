// import pageAuthentication from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticationPage from "../models/User.js";

//Users Sign up
export const signup = async (req, res) => {
  const {
    // fullName, email, password, confirmPassword, tc } = req.body;
    fullName,
    email,
    password,
    confirmPassword,
  } = req.body;
  const user = await authenticationPage.findOne({
    email: email,
  });
  if (user) {
    res.send({
      status: "Failed",
      message: "User already exists",
    });
  } else {
    // if (fullName && email && password && confirmPassword && tc) {
    if (fullName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const salt = await bcrypt.genSalt(8);
          const hashPassword = await bcrypt.hash(password, salt);
          const savedUser = new authenticationPage({
            fullName: fullName,
            email: email,
            password: hashPassword,
          });

          await savedUser.save();

          // Generate JWT token
          const token = jwt.sign(
            {
              id: savedUser._id,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );
          // res.send({
          //   status: "Success",
          //   message: "Registration successful",
          //   "token": token
          // });
          res.redirect("/login");
        } catch (error) {
          res.send({
            status: "Failed",
            message: "Registration failed",
          });
        }
      } else {
        res.send({
          status: "Failed",
          message: "Password and confirm password are not same",
        });
      }
    } else {
      res.send({
        status: "Failed",
        message: "All Field required",
      });
    }
  }
};
//Users Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await authenticationPage.findOne({
        email: email,
      });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          // Generate JWT token
          const token = jwt.sign(
            {
              id: user._id,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );
          res.send({
            status: "Success",
            message: "Login successfull",
            token: token,
          });
        } else {
          res.send({
            status: "Failed",
            message: "Email or paswword does not match ",
          });
        }
      } else {
        res.send({
          status: "Failed",
          message: "User not registered",
        });
      }
    } else {
      res.send({
        status: "Failed",
        message: "Email or paswword is empty",
      });
    }
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Login Failed",
    });
  }
};

//change user password
const changeUserPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password && confirmPassword) {
    if (password === confirmPassword) {
    } else {
      res.send({
        status: "Failed",
        message: "Password and confirm password are not same",
      });
    }
  } else {
    res.send({
      status: "Failed",
      message: "All Field required",
    });
  }
};
