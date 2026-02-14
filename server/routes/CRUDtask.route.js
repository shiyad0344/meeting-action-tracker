import express from "express";
import { Action } from "../model/action.model.js";
import { Transcript } from "../model/transcript.model.js";

const router=express.Router();

router.get("/", async (req, res) => {
  const tasks = await Action.find().sort({ createdAt: -1 });
  res.json(tasks);
});

router.put("/:id", async (req, res) => {
  const updated = await Action.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  await Action.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.get("/history", async (req, res) => {
  const transcripts = await Transcript.find()
    .sort({ createdAt: -1 })
    .limit(5);
  res.json(transcripts);
});

export default router;