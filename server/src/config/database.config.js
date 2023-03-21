// require("dotenv").config();
module.exports = {
  url:
    'mongodb+srv://ajaykathwate:ajaykathwate@nodejs-tut-cluster.jx2prfi.mongodb.net/?retryWrites=true&w=majority',
  localURL:
    process.env.MongoDB_Compass_URL || "mongodb://localhost:27017/EduTech",
};
