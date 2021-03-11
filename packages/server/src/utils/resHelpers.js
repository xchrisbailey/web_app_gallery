const error = async (res, status, message) => {
  res.status(status).json({ status: 'error', data: { message} });
};

const data = async (res, status, data) => {
  res.status(status).json({ status: 'ok', data });
};

module.exports = {
  error,
  data,
};
