var Sequence = require("../models/sequence");

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

const sequenceGenerator = {
  async init() {
    try {
      const sequence = await Sequence.findOne({}).exec(); //"exec()" here has to do with Mongoose and async functions. Not sure if it's entirely necessary, but it works with it in there.
      if (!sequence) {
        throw new Error("Sequence not found");
      }
      sequenceId = sequence._id;
      // maxDocumentId = sequence.maxDocumentId;
      // maxMessageId = sequence.maxMessageId;
      // maxContactId = sequence.maxContactId;
    } catch (err) {
      console.error("Error initializing SequenceGenerator:", err);
      throw err;
    }
  },
  async nextId(collectionType) {
    // Ensure the generator is initialized. If not, call the init() function above.
    if (!this.sequenceId) {
      await this.init();
    }
    let updateObject = {};
    let nextId;

    try {
      switch (collectionType) {
        case "documents":
          maxDocumentId++;
          updateObject = { maxDocumentId: maxDocumentId };
          nextId = maxDocumentId;
          break;
        case "messages":
          maxMessageId++;
          updateObject = { maxMessageId: maxMessageId };
          nextId = maxMessageId;
          break;
        case "contacts":
          maxContactId++;
          updateObject = { maxContactId: maxContactId };
          nextId = maxContactId;
          break;
        default:
          return -1;
      }

      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
      return nextId;
    } catch (err) {
      console.log("nextId error = " + err);
      return null;
    }
  },

  async nextDocumentId() {
    const sequence = await Sequence.findOneAndUpdate(
      {},
      { $inc: { maxDocumentId: 1 } },
      { new: true }
    );
    return sequence.maxDocumentId;
  },

  async nextMessageId() {
    const sequence = await Sequence.findOneAndUpdate(
      {},
      { $inc: { maxMessageId: 1 } },
      { new: true }
    );
    return sequence.maxMessageId;
  },

  async nextContactId() {
    const sequence = await Sequence.findOneAndUpdate(
      {},
      { $inc: { maxContactId: 1 } },
      { new: true }
    );
    return sequence.maxContactId;
  },
};

module.exports = sequenceGenerator;
