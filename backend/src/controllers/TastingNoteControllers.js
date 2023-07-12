/* eslint-disable no-param-reassign */
const { models } = require("../models");

const browse = (req, res) => {
  models.tastingNote
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getTastingNoteById = (req, res) => {
  const { idworkshop } = req.query;
  models.tastingNote
    .findTastingNoteById(req.params.id, idworkshop)
    .then(([rows]) => {
      if (rows.length) {
        const result = rows.reduce((acc, obj) => {
          const existingObj = acc.find((item) => item.id === obj.id);

          if (existingObj) {
            //  Adds the new value to the existing object
            if (!existingObj.aromas.includes(obj.aromas)) {
              existingObj.aromas.push(obj.aromas);
            }
            if (!existingObj.flavor.includes(obj.flavor)) {
              existingObj.flavor.push(obj.flavor);
            }
          } else {
            // Method that creates a new object with an array containing its values
            acc.push({
              id: obj.id,
              wine_quality: obj.wine_quality,
              rating: obj.rating,
              tasting_commentary: obj.tasting_commentary,
              intensity_aromas: obj.intensity_aromas,
              complexity: obj.complexity,
              color: obj.color,
              visual_intensity: obj.visual_intensity,
              limpidity: obj.limpidity,
              brightness: obj.brightness,
              tears: obj.tears,
              aromas: [obj.aromas],
              taste_intensity: obj.taste_intensity,
              mouth_feel: obj.mouth_feel,
              alcohol: obj.alcohol,
              acidity: obj.acidity,
              sweetness: obj.sweetness,
              taste_tannin: obj.taste_tannin,
              flavor: [obj.flavor],
            });
          }
          return acc;
        }, []);

        // Method that Removes duplicate objects from the aromas and flavor arrays
        result.forEach((obj) => {
          obj.aromas = obj.aromas.filter(
            (value, index, self) => self.indexOf(value) === index
          );
          obj.flavor = obj.flavor.filter(
            (value, index, self) => self.indexOf(value) === index
          );
        });
        res.status(200).json(Object.values(result));
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const tastingNote = req.body;

  models.tastingNote
    .insert(tastingNote)
    .then(([result]) => {
      res.location(`/items/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  browse,
  getTastingNoteById,
};
