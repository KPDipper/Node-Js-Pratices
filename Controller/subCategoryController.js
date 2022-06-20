const SubCategory = require("../Model/subCategoryModel");

exports.addsubcategory = async (req, res) => {


  let addsubcat = new SubCategory({
    subcategory_title: req.body.subcategory_title,
    category: req.body.category,
  });

  SubCategory.findOne(
    {
      subcategory_title: addsubcat.subcategory_title,
    },
    async (error, data) => {
      if (data == null) {
        addsubcat = await addsubcat.save();

        if (!addsubcat) {
          return res.status(400).json({ error: "Something went wrong" });
        }

         else {
          res.send(addsubcat);
        }

      } 
      else 
      {
        return res.status(400).json({ error: "Sub categories already exists" });
      }
    }
  );
};


//to find all categories and display i t
exports.showallsubcategories = async(req,res)=>{


  let showallcats = await SubCategory.find().populate('category')

  if(!showallcats){

    return res.status(400).json({error:"Something went wrong"})
  }
  else{
    res.send(showallcats)

  }
}


//to find a single sub category

exports.findsinglesubcategory=async(req,res)=>{

  let findsinglesubcat= await SubCategory.findById(req.params.scid)

  if(!findsinglesubcat){

    return res.status(400).json({error:"Something went wrong"})

  }
  else{
    res.send(findsinglesubcat)
  }
}


//to update single sub category

exports.updatesinglesubcategory=async(req,res)=>{

  let updatesinglesubcat = await SubCategory.findByIdAndUpdate(req.params.scid,{

    subcategory_title:req.body.subcategory_title
  },{
    new:true
  })
  if(!updatesinglesubcat){
    return res.status(400).json({error:"Something went wrong"})

  }
  else{
    res.send(updatesinglesubcat)
  }
}



exports.deletesubcategory=(req,res)=>{
  

  let deletesubcat=  SubCategory.findByIdAndRemove(req.params.scid)

.then(deletesubcat=>{
  if(!deletesubcat){

    return res.status(400).json({error:"Sub category not found"})
  }
  else{

    return res.status(200).json({error:"Category has been succesfully deleted"})
  }
})

.catch(err=>res.status(400).json({error:"Something went wrong"}))
}

