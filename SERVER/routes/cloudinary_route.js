import express from "express";
import cloudinary from "cloudinary"; 
import multipart from "connect-multiparty";

const router = express.Router();
const multipartMiddleware = multipart();


//Enter credentials below                                              
cloudinary.config({
    cloud_name: "voke",
    api_key: "146586867451971",
    api_secret: "ZKdVZgEc-NY7qUnL9jXNnRuZQWw"
});

router.post("/car/upload", multipartMiddleware, function (req, res) {
    let filename = req.files.dataFile.path;
    cloudinary.uploader.upload(filename, { tags: "gotemps", resource_type: "auto" })
        .then(function (file) {
            console.log("Public id of the file is  " + file.public_id);
            console.log("Url of the file is  " + file.url);
           // template.dataFile = file.url;  
           // template.save()
            res.redirect("./model/cloudinary_model")
        })
        .catch(function (err) {
            if (err) {
                console.warn(err);
            }
            res.redirect("./model/cloudinary_model");
        })
    })

module.exports = router;