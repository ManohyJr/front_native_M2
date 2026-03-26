const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE
router.post("/inserer", (req, res) => {
  const { num, nom, vol_horaire, taux} = req.body;

  const salaire = vol_horaire*taux;

  const sql = "INSERT INTO enseignant (num, nom, vol_horaire, taux, salaire) VALUES (?,?, ?, ?, ?)";
  db.query(sql, [num, nom, vol_horaire, taux, salaire], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message:"Enseignant ajouté" });
  });
});
// Route analytics : max, min, total salaires
router.get("/stats/salaires", (req, res) => {
  const sql = `
    SELECT 
      MAX(salaire) AS salaire_max, 
      MIN(salaire) AS salaire_min, 
      SUM(salaire) AS salaire_total
    FROM enseignant
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

// READ ALL
router.get("/listes", (req, res) => {
  db.query("SELECT * FROM enseignant", (err, result) => {
    if (err) 
        {
            res.status(500).json({message:"erreur de server et "} +err);
        }
    res.json(result);
  });
});

// READ ONE
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM enseignant WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

// UPDATE
router.put("/modifier/:id", (req, res) => {
  const { num,nom, vol_horaire, taux} = req.body;
  const salaire=vol_horaire*taux;
  const sql = `
    UPDATE enseignant 
    SET num=?, nom=?, vol_horaire=?, taux=?, salaire=? 
    WHERE id=?
  `;

  db.query(sql, [num,nom, vol_horaire, taux, salaire, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Enseignant modifié" });
  });
});

// DELETE
router.delete("/supprimer/:id", (req, res) => {
  db.query("DELETE FROM enseignant WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Enseignant supprimé" });
  });
});

module.exports = router;