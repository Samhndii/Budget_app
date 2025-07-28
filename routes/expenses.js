const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Add a new expense (linked to logged-in user)
router.post('/add', (req, res) => {
  const { amount, category, description = '', date } = req.body;
  const userId = req.session?.user?.id;

  if (!userId) {
    req.session.message = '❗ You must be logged in to add expenses.';
    return res.redirect('/login');
  }

  if (!amount || !category || !date) {
    req.session.message = '⚠️ All fields except description are required.';
    return res.redirect('/add');
  }

  const query = `
    INSERT INTO expenses (amount, category, description, date, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [parseFloat(amount), category, description, date, userId], (err) => {
    if (err) {
      console.error('❌ DB Error (Add Expense):', err);
      req.session.message = '❌ Error adding expense.';
    } else {
      req.session.message = '✅ Expense added successfully!';
    }
    res.redirect('/add');
  });
});

// ✅ JSON summary by category (total across all time)
router.get('/summary', (req, res) => {
  const userId = req.session?.user?.id;
  if (!userId) return res.status(401).send('Unauthorized');

  const query = `
    SELECT category, SUM(amount) AS total 
    FROM expenses 
    WHERE user_id = ?
    GROUP BY category
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('❌ DB Error (Summary):', err);
      return res.status(500).send('Error retrieving summary');
    }
    res.json(results);
  });
});

// ✅ Filtered total expenses for a specific month and category (used by summary)
router.get('/filtered-summary', (req, res) => {
  const userId = req.session?.user?.id;
  if (!userId) return res.status(401).send('Unauthorized');

  const { month, category } = req.query;

  const isValidMonth = /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
  if (!month || !isValidMonth) {
    return res.status(400).send('Invalid month format (expected YYYY-MM)');
  }

  let query = `
    SELECT SUM(amount) AS total 
    FROM expenses 
    WHERE user_id = ? AND DATE_FORMAT(date, '%Y-%m') = ?
  `;
  const params = [userId, month];

  if (category && category.trim() !== '') {
    query += ' AND category = ?';
    params.push(category.trim());
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('❌ DB Error (Filtered Summary):', err);
      return res.status(500).send('Error calculating filtered summary');
    }
    res.json({ total: results[0]?.total || 0 });
  });
});

// ✅ Edit existing expense
router.post('/edit', (req, res) => {
  const { id, date, category, amount } = req.body;
  const userId = req.session?.user?.id;

  if (!userId) {
    req.session.message = '❗ You must be logged in.';
    return res.redirect('/login');
  }

  if (!id || !date || !category || !amount) {
    req.session.message = '⚠️ Missing required fields for editing.';
    return res.redirect('/summary');
  }

  const query = `
    UPDATE expenses 
    SET date = ?, category = ?, amount = ? 
    WHERE id = ? AND user_id = ?
  `;

  db.query(query, [date, category, parseFloat(amount), id, userId], (err) => {
    if (err) {
      console.error('❌ DB Error (Edit Expense):', err);
      req.session.message = '❌ Failed to update expense.';
    } else {
      req.session.message = '✅ Expense updated successfully!';
    }
    res.redirect('/summary');
  });
});

// ✅ Delete an expense
router.post('/delete/:id', (req, res) => {
  const expenseId = req.params.id;
  const userId = req.session?.user?.id;

  if (!userId) {
    req.session.message = '❗ You must be logged in.';
    return res.redirect('/login');
  }

  const query = `DELETE FROM expenses WHERE id = ? AND user_id = ?`;

  db.query(query, [expenseId, userId], (err) => {
    if (err) {
      console.error('❌ DB Error (Delete Expense):', err);
      req.session.message = '❌ Failed to delete expense.';
    } else {
      req.session.message = '✅ Expense deleted successfully!';
    }
    res.redirect('/summary');
  });
});

// ✅ Export expenses to CSV
router.get('/export', async (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) return res.redirect('/login');

  const { from, to, category } = req.query;

  let query = `SELECT date, category, amount FROM expenses WHERE user_id = ?`;
  const params = [userId];

  if (from && to) {
    query += ` AND DATE(date) BETWEEN ? AND ?`;
    params.push(from, to);
  }
  if (category) {
    query += ` AND category = ?`;
    params.push(category);
  }

  try {
    const [rows] = await db.promise().query(query, params);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"');

    const csv = [
      'Date,Category,Amount',
      ...rows.map(r => `${r.date},${r.category},${r.amount}`)
    ].join('\n');

    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send("Export failed");
  }
});

module.exports = router;

