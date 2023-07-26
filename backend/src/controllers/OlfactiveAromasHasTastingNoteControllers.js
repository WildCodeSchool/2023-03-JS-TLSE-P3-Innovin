/* eslint-disable camelcase */
const { models } = require("../models");

const browse = (req, res) => {
  models.olfactiveAromasHasTastingNote
    .findAll()
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
  models.olfactiveAromasHasTastingNote
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
      res.status(500).send("Error retrieving data from database");
    });
};

const edit = (req, res) => {
  const olfactiveAromasHasTastingNote = req.body;

  // TODO validations (length, format...)

  const id = parseInt(req.params.id, 10);

  models.olfactiveAromasHasTastingNote
    .update(olfactiveAromasHasTastingNote, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(400).send("Bad request");
      } else {
        res.status(204).send("Updated");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const add = (req, res) => {
  const { id_tasting_note, id_olfactive } = req.body;

  // TODO validations (length, format...)

  models.olfactiveAromasHasTastingNote
    .insert(id_tasting_note, id_olfactive)
    .then(([result]) => {
      res
        .location(`/olfactivearomashastastingnote/${result.insertId}`)
        .status(201)
        .send("Created");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const destroy = (req, res) => {
  models.olfactiveAromasHasTastingNote
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
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
