const request = require('supertest');
const app = require('../app');

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

test('GET /categories debe retornar las categorías', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories debe crear una categoría', async () => {
    const body = {
        name: 'Videogames'
    }
    const res = await request(app).post('/categories').send(body).set('Authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /categories/:id debe actualizar una categoría', async () => {
    const body = {
        name: 'Videogames updated'
    }
    const res = await request(app).put(`/categories/${id}`).send(body).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /categories/:id debe eliminar una categoría', async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});