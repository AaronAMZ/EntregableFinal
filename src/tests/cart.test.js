const request = require('supertest');
const app = require('../app');
require('../models')

let id;
let token;

beforeAll( async() => {
    const body = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
});

test('GET /cart', async () => {
    const res = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart', async () => {
    const body= {
        quantity: 1
    }
    const res = await request(app).post('/cart').send(body).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(body.quantity);
});

test('DELETE /cart', async () => {
    const res = await request(app).delete(`/cart/${id}`).set('Authorization', `Bearer ${token}`)
});