const { models } = require("../models");

const browse = (req, res) => {
  models.existingWine
    .findAllExistingWines()
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

const getOneExistingWineByTastingNoteId = (req, res) => {
  models.existingWine
    .findOneExistingWineByTastingNoteId(req.params.id)
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

const refactorWinesData = (req, res) => {
  models.existingWine
    .findAllExistingWines()
    .then(([rows]) => {
      if (rows.length) {
        const groupedData = rows.reduce((acc, obj) => {
          const { id } = obj;
          if (!acc[id]) {
            acc[id] = { ...obj, appellation_name: [obj.appellation_name] };
          } else {
            acc[id].appellation_name.push(obj.appellation_name);
          }
          return acc;
        }, {});

        const groupedArray = Object.values(groupedData);

        res.status(200).send(groupedArray);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getExistingWineById = (req, res) => {
  models.existingWine
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

const read = (req, res) => {
  models.existingWine
    .findOneExistingWine(req.params.id)
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
  const existingWine = req.body;

  // TODO validations (length, format...)

  const id = parseInt(req.params.id, 10);

  models.existingWine
    .update(existingWine, id)
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
  const existingWine = req.body;

  models.existingWine
    .insert(existingWine)
    .then(([result]) => {
      res.location(`/existingwine/${result.insertId}`).status(201).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const addEwHasAppellation = (req, res) => {
  const ids = req.body;
  models.existingWine
    .insertEwHasAppellation(ids)
    .then(([result]) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const destroy = (req, res) => {
  models.existingWine
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
  getExistingWineById,
  getOneExistingWineByTastingNoteId,
  refactorWinesData,
  read,
  edit,
  add,
  addEwHasAppellation,
  destroy,
};
