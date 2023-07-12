const { models } = require("../models");

const browse = (req, res) => {
  models.workshop
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
  models.workshop
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

const getWorkshopByDate = (req, res) => {
  const { date } = req.params;

  models.workshop
    .findWorkshopByDate(date)
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
  const workshop = req.body;

  // TODO validations (length, format...)

  workshop.id = parseInt(req.params.id, 10);

  models.workshop
    .update(workshop)
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
  const workshop = req.body;

  // TODO validations (length, format...)

  models.workshop
    .insert(workshop)
    .then(([result]) => {
      res.location(`/workshop/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.workshop
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
  getWorkshopByDate,
};
