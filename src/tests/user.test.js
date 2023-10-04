const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users debe crear un usuario', async () => {
    const body = {
        firstName: 'Alex',
        lastName: 'Bohorquez',
        email: 'alex@gmail.com',
        password: 'alex1234',
        phone: '123456789'
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.password).toBeFalsy();
});

test('POST /users/login debe loguear un usuario', async () => {
    const body = {
        email: 'alex@gmail.com',
        password: 'alex1234',
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toBeDefined();
});

test('GET /users debe retornar los usuarios', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});



test('PUT /users/:id debe actualizar un usuario', async () => {
    const body = {
        firstName: 'Alex updated'
    }
    const res = await request(app).put(`/users/${id}`).send(body).set('Authorization', `Bearer ${token}`);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});



test('POST /users/login con credenciales inválidas', async () => {
    const body = {
        email: 'invalid@gmail.com',
        password: 'invalid1234'
    }
    const res = await request(app). post('/users/login').send(body);
    expect(res.status).toBe(401);
});

test('DELETE /users/:id debe eliminar un usuario', async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});