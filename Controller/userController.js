const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const cookieParser = require("cookie-parser");

//jsonweb token le tai certain page haru accessed garna paucha ki paudena bhanera
//tesko lagi token save garnu paryo
//here jaba hami login hunchyou tesko lagi token save hunu paryo
//jsonweb token tai authentication ko lagi
//express jwt tai authorziation ko lagi//here yo tai login bhaye pachi kun ku npage usel edit garna paucha
//ani last ma tai cookie parser yo tai cookie ma save garna ko lagi

exports.addUser = async (req, res) => {

    // here adduser is an object
  let adduser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    // date_of_birth:req.body.date_of_birth,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne({ email: adduser.email }, async (error, data) => {
    if (data == null) {//yo tai yedi database ma same email already cha bahne already registered bhannu paryo
      adduser = await adduser.save();
      if (!adduser) {
        return res.status(400).json({ error: "Something went wrong." });
      } else {
        return res.send(adduser);
      }
    } else {
      return res.status(400).json({ error: "Email already registered" });
    }
  });
};

//signin:

exports.userSignin = async (req, res) => {
  //check if email is registered or not
  //that means user can only use this only he has registered an account(you can see in addUser code that is the resgistred)
  //login garda kheri euta email aunu paryo arko password aunu paryo yo tai req.body bata aucha
  const { email, password } = req.body;//yeta tai email check garda kheri tai email chaina bhane user doesnt exist bhannu paryo

//here yeslai hamile body bata ako lai tai destructuring gareko ho

  const usersignin = await User.findOne({ email });
  if (!usersignin) {
    return res.status(400).json({ error: "Email not found/registered" });
  } 
  //check password to autheticate
  if(!usersignin.authenticate(password)){//yo password tai abha hamro userModel ko autheticate ma jancha ra tyo plain text ma gayera bascha
    
    return res.status(400).json({error:"Email and Password doesn't match."})
  }
  //check if user is verfied or not:

  if(!usersignin.isVerified){
    return res.status(400).json({error:"User not verified.Please Verified to continue."})
  }

  //verfied bhaye pachi matra token generate garcha
  //generate token using user._id and jwt

  const token = jwt.sign(
    { _id: usersignin._id, user: usersignin.role },
    process.env.JWT_SECRET
  ); //id ra user ko role chainccha //ra proccess env jwt_secret haile env bata call garya ho.

  res.cookie("myCookie", token, { expire: Date.now() + 9999999 }); //here to save the token in cookie name "mycookie" where it's expiry date will be 99999999ms later


  //return information to front end
  //user le login garna kojyo bhane  yo  code le check garcha yedi yo user right cha ki chaina
  const { _id, name, role } = usersignin; //de-structuring gareko//so display huda kheri id,name ra user role matra huncha
  return res.json({ token, usersignin: { name, email, role, _id } });
  //user le athawa browser le kunai page accessed ganra paucha ki paudena bhanera esle herne ho


};
