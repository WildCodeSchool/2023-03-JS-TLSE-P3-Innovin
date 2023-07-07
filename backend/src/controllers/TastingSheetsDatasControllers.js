const { models } = require("../models");

const findVisualDatas = (req, res) => {
  models.visualData
    .getVisualDatas()
    .then(([results]) => {
      if (results.length) {
        const filteredArray = results.map((obj) => {
          const filteredObj = {};
          Object.keys(obj).forEach((key) => {
            if (obj[key] !== null) {
              filteredObj[key] = obj[key];
            }
          });
          return filteredObj;
        });

        const groupedObj = filteredArray.reduce((acc, obj) => {
          const keysToGroup = ["limpidity", "brightness", "intensity", "tears"];
          const groupKey = keysToGroup.find((key) => key in obj);
          if (groupKey) {
            if (!acc[groupKey]) {
              acc[groupKey] = [];
            }
            acc[groupKey].push(obj);
          }
          return acc;
        }, {});

        res.status(200).json(Object.values(groupedObj));
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
        const filteredArray = results.map((obj) => {
          const filteredObj = {};
          Object.keys(obj).forEach((key) => {
            if (obj[key] !== null) {
              filteredObj[key] = obj[key];
            }
          });
          return filteredObj;
        });

        const groupedObj = filteredArray.reduce((acc, obj) => {
          const keysToGroup = ["intensity_aromas", "complexity", "aromas"];
          const groupKey = keysToGroup.find((key) => key in obj);
          if (groupKey) {
            if (!acc[groupKey]) {
              acc[groupKey] = [];
            }
            acc[groupKey].push(obj);
          }
          return acc;
        }, {});

        res.status(200).json(Object.values(groupedObj));
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
        const filteredArray = results.map((obj) => {
          const filteredObj = {};
          Object.keys(obj).forEach((key) => {
            if (obj[key] !== null) {
              filteredObj[key] = obj[key];
            }
          });
          return filteredObj;
        });

        const groupedObj = filteredArray.reduce((acc, obj) => {
          const keysToGroup = [
            "alcohol",
            "acidity",
            "sweetness",
            "taste_tannin",
          ];
          const groupKey = keysToGroup.find((key) => key in obj);
          if (groupKey) {
            if (!acc[groupKey]) {
              acc[groupKey] = [];
            }
            acc[groupKey].push(obj);
          }
          return acc;
        }, {});

        res.status(200).json(groupedObj);
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
        const filteredArray = results.map((obj) => {
          const filteredObj = {};
          Object.keys(obj).forEach((key) => {
            if (obj[key] !== null) {
              filteredObj[key] = obj[key];
            }
          });
          return filteredObj;
        });

        const groupedObj = filteredArray.reduce((acc, obj) => {
          const keysToGroup = ["intensity", "mouth_feel", "flavor"];
          const groupKey = keysToGroup.find((key) => key in obj);
          if (groupKey) {
            if (!acc[groupKey]) {
              acc[groupKey] = [];
            }
            acc[groupKey].push(obj);
          }
          return acc;
        }, {});

        res.status(200).json(groupedObj);
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
