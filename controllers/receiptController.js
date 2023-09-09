import { pool } from '../database/db.js';

export const addReceipt = (req, res) => {
  const { fullName, phone, address, email, service, customFields } = req.body;
  const q =
    'INSERT INTO receipt (fullName, phone, address, email, services, customFields) VALUES (?,?,?,?,?,?)';

  pool.query(
    q,
    [fullName, phone, address, email, service, customFields],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
        return;
      }

      res.status(200).json({ msg: `Success of adding ${fullName}` });
    }
  );
};
