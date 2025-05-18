const db = require("../config/db");

exports.create = (req, res) => {
    const results = req.body;

    if (!Array.isArray(results)) {
        return res.status(400).json({ error: "Expected an array of results" });
    }

    const values = results.map((r) => [r.supplier_id, r.score, r.ranking]);

    const sql = "INSERT INTO results (supplier_id, score, ranking) VALUES ?";
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("MySQL Error:", err); // Tambahkan ini
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Results inserted successfully",
            insertedCount: result.affectedRows,
        });
    });
};

exports.getAll = (req, res) => {
    const { date } = req.query;

    let sql = "SELECT * FROM results";
    const params = [];

    if (date) {
        sql += " WHERE DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') = ?";
        params.push(date);
    }

    sql += " ORDER BY ranking ASC";

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getDates = (req, res) => {
    db.query(
        `SELECT DISTINCT DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM results ORDER BY created_at DESC;`,
        (err, rows) => {
            if (err) {
                console.error("Gagal ambil dates:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            res.json(rows.map((row) => row.created_at));
        }
    );
};
