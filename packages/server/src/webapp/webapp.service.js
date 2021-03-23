const WebApp = require('./webapp.model');

// find a web app by id and return
const findWebApp = async (id) => {
  const res = await WebApp.findById(id);
  return res;
};

// make mongoose call to find all web apps and return paginated response
const findWebApps = async () => {
  const res = await WebApp.find({});
  return res;
};

// create a new web app and return it
const createWebApp = async (data) => {
  return await WebApp.create(data);
};

module.exports = {
  findWebApp,
  findWebApps,
  createWebApp,
};
