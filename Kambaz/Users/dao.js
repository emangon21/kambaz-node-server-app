import model from "./model.js";

// Create a new user
export const createUser = (user) => model.create(user);

// Retrieve all users
export const findAllUsers = () => model.find();

// Retrieve users by role
export const findUsersByRole = (role) => model.find({ role });

// Retrieve by primary key
export const findUserById = (userId) => model.findById(userId);

// Retrieve by unique username
export const findUserByUsername = (username) => model.findOne({ username });

// Retrieve by credentials
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

// Update a user
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

// Delete a user
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
