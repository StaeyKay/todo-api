import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserModel } from "../models/user_model.js";
import { loginValidator, userValidator } from "../validators/user_validator.js";

// Endpoint for user sign up/register
export const register = async (req, res) => {
  try {
    // Validate user request
    const validationResult = userValidator.safeParse(req.body);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(({ message }) => message).join('. ');
      return res.status(400).json({error: errors});
    }

    const data = validationResult.data;
    // Proceed if validation succeeds
    const email = data.email;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Create the user
    const addUser = await UserModel.create(data);

    return res.status(201).json("You have registered successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
};

// Endpoint for user login/signin
export const login = async (req, res) => {
  try {
    // Validate the request
    const validationResult = loginValidator.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json(validationResult.error.issues[0].message);
    }

    const data = validationResult.data;
    // Check if user exists
    const user = await UserModel.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (!user) {
      return res.status(401).json("User not found");
    }

    const correctPassword = await bcrypt.compare(data.password, user.password);
    if (!correctPassword) {
      return res.status(401).json("Invalid credentials");
    }
    // Generate token for user
    const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "3h",
    });
    console.log("jwt private key:", process.env.JWT_PRIVATE_KEY)
    console.log("token:", token)


    // Return response
    return res.status(201).json({
      message: "User logged in",
      accessToken: token,
      expiresIn: token.expiresIn,
      user: {
        fullname: user.fullname,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};
