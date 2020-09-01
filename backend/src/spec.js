const request = require('supertest')
const app = require('./index')
describe('test update for flight', () => {
    it('My Test Case', async () => {
      const res = await request(app)
        .post('http://localhost:5000/update')
        .send({
          flight_cancel: "True",
          flight_status: "REINSTATE FLIGHT",
          flight_time: "16:33",
          id: 1
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('post')
    });
  });

  describe('test get api ', () => {
    it('My Test Case', async () => {
      const res = await request(app)
        .get('/')

      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('get')
    });
  });
