const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const Image = require('../models/Image');
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

test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => {
    const category = await Category.create({name: 'test'});
    const body = {
        title: 'Huawei Y9',
        description: 'smartphone',
        brand: 'Huawei',
        price: '1000',
        categoryId: category.id,
    }
    const res = await request(app).post('/products').send(body).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(body.title);
});

test('GET /products/:id', async () => {
    const res = await request(app).get(`/products/${id}`);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
});

test('PUT /products/:id debe actualizar una categoría', async () => {
    const body = {
        title: 'Huawei Y9 updated'
    }
    const res = await request(app).put(`/products/${id}`).send(body).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(body.title);
});

test('POST /products/:id/images', async () => {
    const image = await Image.create({url: 'http://cuaquiercosa.jpg', publicId: 'id'})
    const res = await request(app).post(`/products/${id}/images`).send([image.id]).set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test('DELETE /products', async () => {
    const res = await request(app).delete(`/products/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})
