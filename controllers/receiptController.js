import { pool } from '../database/db.js';

export const getReceipt = (req, res) => {
  const chairNoFilter = req.query.chairNo || '';
  const startDateFilter = req.query.startDate; // Add this line
  const endDateFilter = req.query.endDate; // Add this line

  let sql = 'SELECT * FROM receipt';

  if (chairNoFilter) {
    if (sql.includes('WHERE')) {
      sql += ` AND chairNo = '${chairNoFilter}'`;
    } else {
      sql += ` WHERE chairNo = '${chairNoFilter}'`;
    }
  }

  if (startDateFilter && endDateFilter) {
    // Add this block
    if (sql.includes('WHERE')) {
      sql += ` AND DATE(date) BETWEEN DATE('${startDateFilter}') AND DATE('${endDateFilter}')`;
    } else {
      sql += ` WHERE DATE(date) BETWEEN DATE('${startDateFilter}') AND DATE('${endDateFilter}')`;
    }
  }

  sql += ' ORDER BY date DESC';

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
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
    discount,
    tax,
    subTotal,
    chairNo,
  } = req.body;
  const q =
    'INSERT INTO receipt (fullName, phone, address, email, services, customFields, discount, tax, subtotal, chairNo) VALUES (?,?,?,?,?,?,?,?,?,?)';

  pool.query(
    q,
    [
      fullName,
      phone,
      address,
      email,
      service,
      customFields,
      discount,
      tax,
      subTotal,
      chairNo,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ err });
        return;
      }

      res.status(200).json({ msg: `Success of adding ${fullName}` });
    }
  );
};

export const deleteReceipt = (req, res) => {
  const { id } = req.body;
  const q = 'DELETE FROM receipt WHERE id = ?';

  pool.query(q, [id], (err, result) => {
    if (err) {
      res.status(500).json({ err });
      return;
    }

    res.status(200).json({ msg: `Successfully deleted id ${id}` });
  });
};

export const searchByName = (req, res) => {
  const { name } = req.query;
  const q =
    'SELECT * FROM receipt WHERE LOWER(fullName) Like ? OR phone LIKE ?';

  const query = '%' + name.toLowerCase() + '%';

  pool.query(q, [query, query], (err, result) => {
    if (err) {
      res.status(500).json({ err });
      return;
    }

    res.send(result);
  });
};
