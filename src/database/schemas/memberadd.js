const { Schema, model } = require("mongoose");

const MemberAdd = Schema({
    userId: String,
    banCentral: Boolean,
    alertCentral: Number,
    joinedDate: String,
    central: Boolean,
})

module.exports = model("MemberAdd", MemberAdd);