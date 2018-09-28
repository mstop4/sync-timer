const app = () => {};
const http = require('http').Server(app);
const port = 3001;

// Socket
const io = require('../../middleware/socket')(http);
http.listen(port, () => console.log(`🕒  Test Server listening on port ${port}`));

describe('Socket (Server)', () => {

  after(() => {
    http.close(() => {
      console.log('Test Server shut down');
    });
  });

  it('should work', () => {
    expect(io).to.not.eql(null);
  });
});