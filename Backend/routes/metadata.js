const express = require("express");
const app = express();
const router = express.Router();

const {
  createMetadata,
  getAllMetadata,
  getMetadataById,
  updateMetadata,
  updateMetadataById,
  getMetadataByTrait,
  countNumberOfTrait,
  getAllMetadataWithSelectedKeys,
} = require("../services/metadata");

router.get("/getByTrait/:trait", async (req, res, next) => {
  try {
    const students = await getMetadataByTrait(req.params.trait);
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get("/getAllResultWithSpecificData", async (req, res, next) => {
  try {
    const students = await getAllMetadataWithSelectedKeys();
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get("/countNumberOfTrait/:trait", async (req, res, next) => {
  try {
    const students = await countNumberOfTrait(req.params.trait);
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const students = await getAllMetadata();
    res.json(students);
  } catch (error) {
    next(error);
  }
});
router.get("/:name", async (req, res, next) => {
  try {
    const student = await getMetadataById(req.params.name);
    res.json(student);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const student = await createMetadata(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:name",

  async (req, res, next) => {
    try {
      let data = await updateMetadata(req.params.name, req.body);
      res.json({ data, message: "Updated!" });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/updateMetadataById/:id",

  async (req, res, next) => {
    try {
      let data = await updateMetadataById(req.params.id, req.body);
      res.json({ data, message: "Updated!" });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteMetadata(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
