const WebApp = require('./webapp.model');

// find a web app by id and return
const findWebApp = async (id) => {
  const res = await WebApp.findById(id);
  if (!res) throw new Error('web app not found');
  return res;
};

// make mongoose call to find all web apps and return paginated results
const findWebApps = async (opts = { limit: 10 }, filters = {}) => {
  const filter = {};
  if (filters.search) filter.name = { $regex: filters.search };
  if (filters.category) filter.category = filters.category;

  const res = await WebApp.paginate(filter, {
    ...opts,
    customLabels: {
      docs: 'data',
    },
  });
  return res;
};

// create a new web app and return it
const createWebApp = async (user, data) => {
  const body = {
    ...data,
    submittedBy: user,
  };
  const app = WebApp.create(body);
  return app;
};

module.exports = {
  findWebApp,
  findWebApps,
  createWebApp,
};
