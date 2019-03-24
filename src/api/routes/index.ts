import express from "express";
const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.status(200).send("OK"));
/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

export default router;
