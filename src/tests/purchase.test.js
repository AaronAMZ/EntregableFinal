const request = require('supertest');
const app = require('../app');

let token;

beforeAll( async() => {
    const body = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
});

test('GET /purchases', async () => {
    const res = await request(app).get('/purchases').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
})