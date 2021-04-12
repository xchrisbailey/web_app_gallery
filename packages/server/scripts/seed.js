require('dotenv').config();
const faker = require('faker');

const db = require('../src/utils/db');
const User = require('../src/user/user.model');
const WebApp = require('../src/webapp/webapp.model');

const seedDB = async () => {
  const user1 = await User.create({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'qwe123',
  });

  const user2 = await User.create({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'qwe123',
  });

  for (let i = 0; i < 10; i++) {
    await WebApp.create({
      manifestURL: faker.internet.url(),
      startURL: faker.internet.url(),
      name: faker.company.companyName(),
      description: faker.company.catchPhraseDescriptor(),
      category: 'news',
      themeColor: faker.internet.color(),
      backgroundColor: faker.internet.color(),
      submittedBy: user1,
    });

    await WebApp.create({
      manifestURL: faker.internet.url(),
      startURL: faker.internet.url(),
      name: faker.company.companyName(),
      description: faker.company.catchPhraseDescriptor(),
      category: 'shopping',
      themeColor: faker.internet.color(),
      backgroundColor: faker.internet.color(),
      submittedBy: user1,
    });
    await WebApp.create({
      manifestURL: faker.internet.url(),
      startURL: faker.internet.url(),
      name: faker.company.companyName(),
      description: faker.company.catchPhraseDescriptor(),
      category: 'photo',
      themeColor: faker.internet.color(),
      backgroundColor: faker.internet.color(),
      submittedBy: user2,
    });
    await WebApp.create({
      manifestURL: faker.internet.url(),
      startURL: faker.internet.url(),
      name: faker.company.companyName(),
      description: faker.company.catchPhraseDescriptor(),
      category: 'kids',
      themeColor: faker.internet.color(),
      backgroundColor: faker.internet.color(),
      submittedBy: user1,
    });
  }
};

db.connect()
  .then(() => {
    console.log('🥭 mongo connected');
    seedDB()
      .then(() => {
        console.log('database seeded');
        process.exit(1);
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => {
    console.log(e);
  });
