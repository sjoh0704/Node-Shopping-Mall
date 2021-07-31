const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  nickname: String,
  password: String,
});
UserSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});
UserSchema.set("toJSON", {
  virtuals: true,
});
// 첫번째 인자는 컬렉션의 단수적 표현으로 컬렉션 생성시 Users로 생성
module.exports = mongoose.model("User", UserSchema);