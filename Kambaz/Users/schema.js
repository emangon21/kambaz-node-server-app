// Kambaz/Users/schema.js.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:    { type: String, required: true, unique: true },
        password:    { type: String, required: true },
        firstName:   String,
        lastName:    String,
        email:       String,
        dob:         Date,
        role:        { type: String, enum: ["STUDENT", "FACULTY", "TA", "ADMIN"] },
        loginId:     { type: String, default: "" },
        section:     { type: String, default: "" },
        lastActivity:{ type: String, default: "" },
        totalActivity:{ type: String, default: "0" },

    },
    { collection: "users" }
);

export default UserSchema;
