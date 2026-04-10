import express from "express";

const router = express.Router();

router.post("/summarize", (req, res) => {
  res.send("Route working");
});

export default router;