import app from './app';

const server = app.listen(app.get('port'), function () {
  console.log(`listening on port ${app.get('port')}`);
});

export default server;
