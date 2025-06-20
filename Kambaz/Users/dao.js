import model from "./model.js";
import mongoose from "mongoose";

// Grab ObjectId helper
const { ObjectId } = mongoose.Types;

// Create a new user
export const createUser = (user) => model.create(user);

// Retrieve all users
export const findAllUsers = () => model.find();

// Retrieve users by role
export const findUsersByRole = (role) => model.find({ role });

// Retrieve by primary key (handles both real ObjectIds and legacy string _id)
export const findUserById = async (userId) => {
    if (ObjectId.isValid(userId)) {
        try {
            const doc = await model.collection.findOne({ _id: new ObjectId(userId) });
            if (doc) {
                return model.hydrate(doc);
            }
        } catch (err) {
            // ignore cast or lookup errors
        }
    }

    const doc2 = await model.collection.findOne({ _id: userId });
    return doc2 ? model.hydrate(doc2) : null;
};

// Retrieve by unique username
export const findUserByUsername = (username) => model.findOne({ username });

// Retrieve by credentials
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

// Update a user
export const updateUser = async (userId, user) => {
    if (ObjectId.isValid(userId)) {
        try {
            const res = await model.updateOne(
                { _id: new ObjectId(userId) },
                { $set: user }
            );
            if (res.matchedCount > 0 || res.modifiedCount > 0 || res.nModified > 0) {
                return res;
            }
        } catch (err) {
            // ignore
        }
    }

    return await model.collection.updateOne(
        { _id: userId },
        { $set: user }
    );
};

export const deleteUser = async (userId) => {
    if (ObjectId.isValid(userId)) {
        try {
            const res = await model.deleteOne({ _id: new ObjectId(userId) });
            if (res.deletedCount > 0) {
                return res;
            }
        } catch (err) {
            // ignore
        }
    }

    return await model.collection.deleteOne({ _id: userId });
};
