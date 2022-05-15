require("dotenv").config();
let mongodb = require("mongodb");
let mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  //useUnifiedTopology: true,
});

//creating schemas
const { Schema } = mongoose;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [{ type: String }],
  birthDate: Date,
  sex: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
});

//creating model
let Person = mongoose.model("Person", personSchema);

//creating records
const person1 = new Person({
  name: "John Doe",
  age: 26,
  favoriteFoods: ["apples", "meat", "bananas"],
  sex: "male",
});

const person2 = new Person({
  name: "Jane Doe",
  age: 28,
  favoriteFoods: ["oranges", "sugar", "John Doe"],
  sex: "female",
});

const createAndSavePerson = (done) => {
  person1.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, docs) => {
    done(err, docs);
  });
  //done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, doc) => {
    done(err, doc);
  });
  //done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, doc) => {
    done(err, doc);
  });
  //done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, doc) => {
    doc.favoriteFoods.push(foodToAdd);
    doc.save((err, data) => {
      done(err, data);
    });
  });
  //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, doc) => {
      done(err, doc);
    }
  );
  //done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    done(err, data);
  });
  //done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    done(err, data);
  });
  //done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
