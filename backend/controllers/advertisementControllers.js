const Advertisement = require("../models/Advertisement");
const {User} = require('../models/User');

const createAdvert = async (req, res) => {
  try {
    console.log(req.body);

    const userId= req.user._id;
    const user = await User.findById(userId);

    let newAdvert = new Advertisement({
      userId: userId,
      userName: user.name,
      description: req.body.description,
      status: "Pending",
    });

    if (req.file) {
      const serverBaseURL = 'http://localhost:3000';
      newAdvert.banner = `${serverBaseURL}/public/images/${req.file.filename}`;
    }
    const savedAdvert = await newAdvert.save();

    res.status(200).send(savedAdvert);
  } catch (error) {
    console.error("Error creating Advert:", error);
    res.status(500).send("Internal Server Error");
  }
};

const allAdverts= async (req, res)=>{
  try{
    const approvedAdvertisements = await Advertisement.find({
      status: "Approved",
    }).exec();
    return res.status(200).send(approvedAdvertisements);
  } catch{
    console.error("Error retrieving advertisements:", error);
    throw error;
  }
}

const getAdvert = async (req, res) => {
  try {
    const pendingAdvertisements = await Advertisement.find({
      status: "Pending",
    }).exec();
    return res.status(200).send(pendingAdvertisements);
  } catch (error) {
    console.error("Error retrieving advertisements:", error);
    throw error;
  }
};

const changeAdvertStatus = async (req, res) => {
  try {
    const advertId = req.params.id;
    let advert = await Advertisement.findById(advertId);

    if (!advert) {
      return res.status(400).send("THE ADVERTISMENT IS NOT AVAILABLE ");
    }
    advert.status = "Approved";

    advert = await advert.save();
    
    return res.send(advert);
  } catch (error) {
    console.error("Error retrieving advertisements:", error);
    throw error;
  }
};

const deleteAdvert = async (req, res)=>{
  try{
    const advertId=req.params.id;
    const deletedAdvert= await Advertisement.findByIdAndDelete(advertId);
    
    if (!deletedAdvert){
      return res.status(400).send('Product not found');
    }
    return res.status(200).send('product succussfully deleted');
  } catch {
    console.log('Unable to delete product');
    return res.status(500).send("Internal server error");
  }
}

module.exports = { createAdvert, getAdvert, changeAdvertStatus, deleteAdvert, allAdverts };
