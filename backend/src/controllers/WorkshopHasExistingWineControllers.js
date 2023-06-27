/* eslint-disable camelcase */
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
    .findOneWorkshopHasExistingWine(req.params.id_workshop)
    .then(([rows]) => {
      if (rows == null) {
        res.status(404).send("Not found");
      } else {
        res.status(200).send(rows);
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
    .deleteworkshop(req.params.id_workshop)
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
  add,
  destroy,
};
