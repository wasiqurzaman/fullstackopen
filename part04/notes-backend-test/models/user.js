const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true  // this ensures the uniqueness of usernames
  },
  name: String,
  passwordHash: String,
  //information about the notes created by the user (reference)
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note"
    }
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
