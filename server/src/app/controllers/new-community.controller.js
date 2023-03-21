const NewCommunity = require("../models/new-community.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.create = (req, res, next) => { 
  const newCommunity = new NewCommunity({
    _id: new mongoose.Types.ObjectId(),
    communityName: req.body.communityName,
    communityPassword: req.body.communityPassword,
  });
  newCommunity
    .save()
    .then((community) => {
      res.status(201).json({
        message: "New community created successfully!",
        newCommunity: community,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message || "Some error occurred while creating new community!",
      });
    });
};

exports.findAll = (req, res) => {
  NewCommunity.find()
    .select("_id communityName communityPassword")
    .then((communities) => {
      if (communities.length === 0) {
        return res.status(500).json({
          message: "No communities exists!",
        });
      }
      const response = {
        count: communities.length,
        communities: communities.map((community) => {
          return {
            _id: community._id,
            communityName: community.communityName,
            communityPassword: community.communityPassword,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occured while fetching communities",
      });
    });
};

exports.findOne = (req, res, next) => {
  const id = req.params.communityId;
  console.log("findOne id: ", id);
  NewCommunity.findById(id)
    .then((community) => {
      if (!community) {
        return res.status(404).json({
          message: "Community with id not found!",
        });
      }
      res.status(200).json({
        _id: community._id,
        communityName: community.communityName,
        communityPassword: community.communityPassword,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.communityId;
  NewCommunity.findById(id)
    .then((community) => {
      if (!community) {
        return res.status(404).json({
          message: "Community with id not found!",
        });
      }
      NewCommunity.findByIdAndRemove(id)
        .then(() => {
          res.status(200).json({
            message: "Community deleted successfully!",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error:
          err.message || "Some error occured while deleting this community!",
      });
    });
};
