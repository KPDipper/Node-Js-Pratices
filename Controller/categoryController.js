const Category = require("../Model/categoryModel"); //here  Category bhane tai model bhyo ra yeslai hamile import gareko bhyo

exports.addsingleCategory = async (req, res) => {
  //category tai hamile bhanko object bhyo
  //req aye pachi tai garne kam ho
  let addcat = new Category(req.body); //req.body tai hamro form bata import garera aucha nivalue haru tyo tai req.body bhyo

  Category.findOne(
    { category_title: addcat.category_title }, //yo agadi ma tai table schema bata ako value ho ra second ko(addcat ma value aucha and we access from category_title) tai mathi bata value ho
    async (error, data) => {
      if (data == null) {
        //here yedi kojeko data chaina bhane matra data save hunu paryo

        addcat = await addcat.save(); //input bhako data save garna ko lagi

        //here async await le tai yesma jaba sama cat save hunna kurdai basnu parcha

        if (!addcat) {
          //yedi cat ma kei ni value ayena kei pani value chaina,save garda kheri kei pani save bhayena bahne chai tai yo tala ko error aucha

          return res.status(400).json({ error: "Something went wrong" });
          //hamro sabai mongodb ma json data nai huncha//so output ni jjson mai aucha
        } else {
          //yedi value cha bhane chai
          res.send(addcat); //if cat ma data cha bhane
        }
      }
      else{
        return res.status(400).json({error:"Category already Exists"})
      }
    }
  );
  //compare garne tehn duita value bich
};



exports.showAllCategories = async (req, res) => {
  let showcats = await Category.find(); //category.find le tai table ma bhayeko sabai data showcats ma rakhne bhyo

  if (!showcats) {
    //yedhi showcats ma kei ni ayena hhane yo code ho
    return res.status(400).json({ error: "Something went wrong" });
  } else {
    res.send(showcats); //ayo bhane yo garne
  }
};

//to view a single category

exports.findsinglecategory = async(req,res) => {


  let showcat = await Category.findById(req.params.cid)//here hami individual category tai hamile url bata access garcyoum which is done by params 

  if(!showcat){
    return res.status(400).json({error:"something went wrong"})
  }
  else{
    res.send(showcat)
  }
}


exports.updateCategory=async(req,res)=>{

  let updatecat = await Category.findByIdAndUpdate(req.params.cid,//req.params.id tai kun category lai update garne 
    {//arko tai update garera value k rakhne
    
    category_title:req.body.category_title//here pachadi ko tai update gareko value bhyo

  },{//yesle tai hammile jun tai update garchyoum tyo tai view garune ko lagi

    new:true
  })
  if(!updatecat){
    return res.status(400).json({error:"something went wrong"})
  }
  else{
    res.send(updatecat)
  }
 //yesma 3 ta parameter cha
 //first url bata aune id aucha kunalai uodate garne bhanera
 //second ma tai kun value halne bhanera
 //jun value update garya cha teslai view garna ko lagi
}


exports.deleteCategory= (req,res)=>{

  let deletecat= Category.findByIdAndDelete(req.params.cid)

  .then(deletecat=>{
    if(!deletecat){//deletecat ma value khali cha bhane //yedi mathi kei ni deletecat ma ayena bhane
      //yedi database sanga connect bhyo bhane matra ho
     
      res.status(400).json({error:"Category not found"})
    }
    else{
       
      return res.status(200).json({msg:"Category deleted succesfully"})
    }
  })
  .catch(error=>res.status(400).json({error:"Something went wrong"}))
  //yedi database sanga connect garna sakena bhane yo huncha
}