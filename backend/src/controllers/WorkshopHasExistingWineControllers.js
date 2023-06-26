const { models } = require("../models");

const browse = (req, res) => {
  models.workshopHasExistingWine
    .findAllWorkshopHasExistingWine()
    .then(([rows]) => {
      if (rows.length) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const read = (req, res) => {
  models.workshopHasExistingWine
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.status(404).send("Not found");
      } else {
        res.status(200).send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const workshopHasExistingWine = req.body;

  // TODO validations (length, format...)

  workshopHasExistingWine.id = parseInt(req.params.id, 10);

  models.workshopHasExistingWine
    .update(workshopHasExistingWine)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const workshopHasExistingWine = req.body;

  // TODO validations (length, format...)

  models.workshopHasExistingWine
    .insert(workshopHasExistingWine)
    .then(([result]) => {
      res
        .location(`/workshophasexistingwine/${result.insertId}`)
        .sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.workshopHasExistingWine
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
