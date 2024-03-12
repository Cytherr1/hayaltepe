const request = require('supertest');
const app = require('../app');

describe('POST /admin/auth/login', () => {
    it('should return 200 and the user object if login is successful', async () => {
        const response = await request(app)
            .post('/admin/auth/login')
            .send({ email: 'admin@hayaltepe.com', password: 'admin1234.' });
            
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email', 'admin@hayaltepe.com');
        expect(response.body).toHaveProperty('password', 'admin1234.');
    });

    it('should return 404 if user is not found', async () => {
        const response = await request(app)
            .post('/admin/auth/login')
            .send({ email: 'nonexistent@example.com', password: 'admin1234.' });
            
        expect(response.status).toBe(404);
        expect(response.text).toBe('User not found');
    });

    it('should return 401 if password is invalid', async () => {
        const response = await request(app)
            .post('/admin/auth/login')
            .send({ email: 'admin@hayaltepe.com', password: 'wrongpassword' });
            
        expect(response.status).toBe(401);
        expect(response.text).toBe('Invalid password');
    });
});
