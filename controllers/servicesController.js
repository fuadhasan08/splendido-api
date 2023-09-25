import { pool } from '../database/db.js';

export const getServices = (req, res) => {
  pool.query('SELECT * FROM services', (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.send(result);
  });
};

export const addService = (req, res) => {
  const { title, price, category } = req.body;
  const q = 'INSERT INTO services (title, price, category) VALUES (?,?,?)';

  pool.query(q, [title, price, category], (err, result) => {
    if (err) {
      res.status(500).json({ err });
      return;
    }

    res.status(200).json({ msg: `Success of adding ${title}` });
  });
};

export const updateService = (req, res) => {
  const { id, title, price } = req.body;
  const q = 'UPDATE services SET title = ? , price= ? WHERE id = ?';

  pool.query(q, [title, price, id], (err, result) => {
    if (err) {
      res.status(500).json({ err });
      return;
    }

    res.status(200).json({ msg: `Success of updating ${title}` });
  });
};

export const deleteService = (req, res) => {
  const { id } = req.body;
  const q = 'DELETE FROM services WHERE id = ?';

  pool.query(q, [id], (err, result) => {
    if (err) {
      res.status(500).json({ err });
      return;
    }

    res.status(200).json({ msg: `Successfully deleted id ${id}` });
  });
};
