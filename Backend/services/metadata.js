const MetadataModel = require("../models/metadata");
const { ApiError } = require("../utils/error");

const createMetadata = async (data) => {
  return await MetadataModel.create({
    Sex: data.Sex,
    image: data.image,
    dna: data.dna,
    edition: data.edition,
    date: data.date,
    attributes: data.attributes,
    compiler: data.compiler,
    name: data.name,
    description: data.description,
  });
};

const getAllMetadataWithSelectedKeys = async () => {
  try {
    // return await MetadataModel.aggregate([
    //   {
    //     $match: {
    //       "attributes.trait_type": "Rarity",
    //       "attributes.trait_type": "Sex",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       attributes: {
    //         $filter: {
    //           input: "$attributes",
    //           as: "attributes",
    //           cond: {
    //             $in: ["$$attributes.trait_type", ["Sex", "Rarity"]],
    //           },
    //         },
    //       },
    //     },
    //   },
    // ]);
    return await MetadataModel.aggregate([
      {
        $match: {
          "attributes.trait_type": "Rarity",
          "attributes.trait_type": "Sex",
        },
      },
      {
        $project: {
          attributes: {
            $filter: {
              input: "$attributes",
              as: "attributes",
              cond: {
                $in: ["$$attributes.trait_type", ["Sex", "Rarity"]],
              },
            },
          },
        },
      },
    ]);
  } catch (err) {
    console.log(err.message);
  }
};

const getAllMetadata = async () => {
  try {
    return await MetadataModel.find();
  } catch (err) {
    console.log(err.message);
  }
};

const getMetadataByTrait = async (trait) => {
  try {
    return await MetadataModel.find({
      $or: [{ "attributes.trait_type": trait }, { "attributes.value": trait }],
    });
  } catch (err) {
    console.log(err.message);
  }
};
const countNumberOfTrait = async (trait) => {
  try {
    return await MetadataModel.find({
      $or: [{ "attributes.trait_type": trait }, { "attributes.value": trait }],
    }).count();
  } catch (err) {
    console.log(err.message);
  }
};

const getMetadataById = async (name) => {
  try {
    name = `Proud Lions Club #${name}`;
    const student = await MetadataModel.findOne({
      name: name,
      $options: "i",
    });

    if (!student) {
      throw new ApiError(404, `Student with id: ${name} not found`);
    }

    return student;
  } catch (err) {
    console.log(err.message);
  }
};

const updateMetadata = async (name, data) => {
  try {
    filterName = `Proud Lions Club #${name}`;

    const filter = { name: filterName };
    const update = {
      $set: {
        Sex: data.searchData.Sex,
        image: data.searchData.image,
        dna: data.searchData.dna,
        edition: data.searchData.edition,
        date: data.searchData.date,
        attributes: data.searchData.attributes,
        compiler: data.searchData.compiler,
        name: data.searchData.name,
        description: data.searchData.description,
      },
    };

    let student = await getMetadataById(name);

    if (!student) {
      throw new ApiError(409, `Student with id: ${name} does not exist!`);
    }

    let result = await MetadataModel.updateOne(filter, update, { new: true });
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const updateMetadataById = async (id, data) => {
  try {
    data.name = `Proud Lions Club #${data.name}`;
    const filter = { _id: id };
    const update = {
      $set: {
        Sex: data.Sex,
        image: data.image,
        dna: data.dna,
        edition: data.edition,
        date: data.date,
        attributes: data.attributes,
        compiler: data.compiler,
        name: data.name,
        description: data.description,
      },
    };

    let result = await MetadataModel.updateOne(filter, update);
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getAllMetadata,
  createMetadata,
  getMetadataById,
  updateMetadata,
  updateMetadataById,
  getMetadataByTrait,
  countNumberOfTrait,
  getAllMetadataWithSelectedKeys,
};
