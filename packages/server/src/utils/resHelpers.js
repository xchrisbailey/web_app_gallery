const error = async (res, status, message) => {
  res.status(status).json({ status: 'error', message });
};

const data = async (res, status, data) => {
  res.status(status).json({ status: 'ok', data });
};

const success = async (res, status, message) => {
  res.status(status).json({ status: 'ok', message });
};

const pageData = async (res, status, data) => {
  res.status(status).json({ status: 'ok', ...data });
};

module.exports = {
  error,
  data,
  pageData,
  success,
};
