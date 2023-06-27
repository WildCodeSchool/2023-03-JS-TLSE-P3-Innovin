const { models } = require("../models");

const findVisualDatas = (req, res) => {
  models.visualData
    .getVisualDatas()
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findOlfactiveDatas = (req, res) => {
  models.olfactiveData
    .getOlfactiveDatas()
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findMouthSlidersDatas = (req, res) => {
  models.tasteSlidersData
    .getMouthSlidersDatas()
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findTasteDatas = (req, res) => {
  models.tasteAromasData
    .getTastingDatas()
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  findVisualDatas,
  findOlfactiveDatas,
  findMouthSlidersDatas,
  findTasteDatas,
};
