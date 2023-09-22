import { pool } from '../database/db.js';

export const getReceipt = (req, res) => {
  pool.query('SELECT * FROM receipt ORDER BY date DESC', (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.send(result);
  });
};

export const addReceipt = (req, res) => {
  const {
    fullName,
    phone,
    address,
    email,
    service,
    customFields,
    subTotal,
    chairNo,
  } = req.body;
  const q =
    'INSERT INTO receipt (fullName, phone, address, email, services, customFields, subtotal, chairNo) VALUES (?,?,?,?,?,?,?,?)';

  pool.query(
    q,
    [fullName, phone, address, email, service, customFields, subTotal, chairNo],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
        return;
      }

      res.status(200).json({ msg: `Success of adding ${fullName}` });
    }
  );
};
