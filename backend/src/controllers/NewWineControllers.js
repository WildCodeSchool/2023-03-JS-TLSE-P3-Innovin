const { models } = require("../models");

const browse = (req, res) => {
  models.newWine
    .findNewWine()
    .then(([rows]) => {
      if (rows.length) {
        const result = rows.reduce((acc, obj) => {
          const existingObj = acc.find((item) => item.id === obj.id);

          if (existingObj) {
            //  Adds the new value to the existing object
            if (!existingObj.dosage.includes(obj.dosage)) {
              existingObj.dosage.push(obj.dosage);
            }
            if (!existingObj.grapeVariety.includes(obj.grapeVariety)) {
              existingObj.grapeVariety.push(obj.grapeVariety);
            }
          } else {
            // Method that creates a new object with an array containing its values
            acc.push({
              id: obj.id,
              color: obj.color,
              dosage: [obj.dosage],
              grapeVariety: [obj.grapeVariety],
              selected_for_competition: obj.selected_for_competition,
              commentaryWine: obj.commentaryWine,
              competition_name: obj.competition_name,
              commentary_competition: obj.commentary_competition,
              place: obj.place,
              datetime: obj.datetime,
              id_user: obj.id_user,
              firstname: obj.firstname,
              lastname: obj.lastname,
            });
          }
          return acc;
        }, []);

        // Method that Removes duplicate objects from the aromas and flavor arrays
        result.forEach((obj) => {
          const item = obj;
          item.dosage = obj.dosage.filter(
            (value, index, self) => self.indexOf(value) === index
          );
          item.grapeVariety = obj.grapeVariety.filter(
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

const getNewWineByWorkshopId = (req, res) => {
  models.newWine
    .findNewWineIdByWorskhop(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.status(404).send("Not found");
      } else {
        res.status(200).send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const read = (req, res) => {
  models.newWine
    .find(req.params.id)
    .then(([rows]) => {
      if (rows.length) {
        const result = rows.reduce((acc, obj) => {
          const existingObj = acc.find((item) => item.id === obj.id);

          if (existingObj) {
            //  Adds the new value to the existing object
            if (!existingObj.dosage.includes(obj.dosage)) {
              existingObj.dosage.push(obj.dosage);
            }
            if (!existingObj.grapeVariety.includes(obj.grapeVariety)) {
              existingObj.grapeVariety.push(obj.grapeVariety);
            }
          } else {
            // Method that creates a new object with an array containing its values
            acc.push({
              id: obj.id,
              color: obj.color,
              dosage: [obj.dosage],
              grapeVariety: [obj.grapeVariety],
              selected_for_competition: obj.selected_for_competition,
              commentaryTasting: obj.commentaryTasting,
              commentaryWine: obj.commentaryWine,
              competition_name: obj.competition_name,
              commentary_competition: obj.commentary_competition,
              place: obj.place,
              datetime: obj.datetime,
              id_user: obj.id_user,
              firstname: obj.firstname,
              lastname: obj.lastname,
            });
          }
          return acc;
        }, []);

        // Method that Removes duplicate objects from the aromas and flavor arrays
        result.forEach((obj) => {
          const item = obj;
          item.dosage = obj.dosage.filter(
            (value, index, self) => self.indexOf(value) === index
          );
          item.grapeVariety = obj.grapeVariety.filter(
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

const addNewWine = (req, res) => {
  const { newWine } = req.body;
  // TODO validations (length, format...)

  models.newWine
    .insertNewWine(newWine)
    .then(([result]) => {
      res.location(`/newwine/${result.insertId}`).status(201).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const newWine = req.body;

  // TODO validations (length, format...)

  const id = parseInt(req.params.id, 10);

  models.newWine
    .update(newWine, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(400).send("Bad request");
      } else {
        res.status(204).send("Updated");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const putCommentary = (req, res) => {
  const newWine = req.body;

  // TODO validations (length, format...)

  const id = parseInt(req.params.id, 10);

  models.newWine
    .updateCommentary(newWine, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(400).send("Bad request");
      } else {
        res.status(204).send("Updated");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.newWine
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not found");
      } else {
        res.status(204).send("Deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  getNewWineByWorkshopId,
  read,
  addNewWine,
  edit,
  putCommentary,
  destroy,
};
