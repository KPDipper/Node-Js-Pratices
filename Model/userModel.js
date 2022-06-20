const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;
const uuidv1 = require("uuidv1"); //encrypt garna lai id generate garcha mtyo id tai uuid bata generate huncha
//here uuid ko id tai generate bhayepachi ra hasehed _password jun save garchyoum tya tai crypto le encrypt garcha
//it generate for hashing
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },

    // date_of_birth: {
    //   type: Date,
    //   required: true,
    // },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default: 0,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    salt: String, //yo tai unique no. generator ho
  },
  { timestamps: true }
);

//crypto le tai encrypt garne kam garcha
//encryt garna lai id generate garchatyo id tai uuid bata generate huncha

//password tai hamro user bata aucha ni jun
//teslai suru ma virtual field ma rakhnu paryo
//tya bata tai hased password generate garne
//ani tespachi hami lai jun password aucha tyo tai virtual password ma sabe hune

userSchema
  .virtual("password")
  .set(function (password) {
    //hash password save garna kamsyeta huncha
    this._password = password; //virtual field ma gayera basyo that means its(_password) temporary
    //user ko password this._password yeta ayera set huncha

    this.salt = uuidv1(); //uuidv1 le tai unique key generate garcha yo tai salt ma ayera bascha

    this.hashed_password = this.encryptPassword(password); //hasshed password tai model ko password ho
    //encryptPassword tai method bhyo
    //hashed_password le tala ko method lai call agryo
  })

  .get(function () {
    //yesle tai return garne bhyos//this._password tai virtual field ko password ho
    //_password yo tai temporary field ho

    return this._password;
  });

//method:

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) {
      //yedi user  bata kei ni password ako chaina bhane
      return ""; //jasta ko jastai return gardyio
    } else {
      try {
        return (
          crypto
            .createHmac("sha256", this.salt)
            //sha256 encryption ko algorthim ho, this.salt ra sha256 create garera hami ecnryption create gacryou
            .update(password)//yo tai abha mati hashed password ma return huncha update bhayera
            .digest("hex")
        );
      } catch (error) {
        return error;
      }
    }
  },


authenticate: function(plaintext){

    return this.encryptPassword(plaintext)===this.hashed_password
    //here plaintext tau form bata encrypt bhayera datbase ma saved bhako hashed_password sanga check garcha for authentication 
     //used it in login

    //user le k password pathyo check garcha jun plaintext bhyo ra database ma hashed password bhyo so they are comapre to each other
}

}
module.exports = mongoose.model("User", userSchema);
