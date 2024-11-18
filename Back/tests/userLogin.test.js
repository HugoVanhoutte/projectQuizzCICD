const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock your database query function
const dbQuery = jest.fn();

// Set up the express app with the router
const app = express();
app.use(express.json());

const router = express.Router();
router.post('/login', async (req, res) => {
    console.log('login en cours')
    console.log(req.body)
    const sql = 'SELECT * FROM users WHERE username = ?';
    const results = await dbQuery(sql, [req.body.username]);

    if ((!results[0])) {
        return res.status(401).send({ "message": "No such username" });
    } else if (!await bcrypt.compare(req.body.password, results[0].password)) {
        return res.status(401).send({ "message": "Wrong password" });
    }

    const token = jwt.sign({ "id": results[0].id, "username": results[0].username, "role": results[0].role }, process.env.JWT_SECRET, { subject: "authentification" });
    res.status(200).send({ "token": token });
});

app.use(router);

// Now the actual test
describe('POST /login', () => {
    it('should return 401 if username is not found', async () => {
        dbQuery.mockResolvedValueOnce([]); // No user found

        const response = await request(app)
            .post('/login')
            .send({ username: 'nonexistentuser', password: 'somepassword' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('No such username');
    });

    it('should return 401 if the password is incorrect', async () => {
        // Mock database result
        dbQuery.mockResolvedValueOnce([{ username: 'validuser', password: 'hashedpassword' }]);

        // Mock bcrypt comparison
        bcrypt.compare = jest.fn().mockResolvedValueOnce(false); // Password doesn't match

        const response = await request(app)
            .post('/login')
            .send({ username: 'validuser', password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Wrong password');
    });

    it('should return 200 and a token if login is successful', async () => {
        // Mock database result
        dbQuery.mockResolvedValueOnce([{ id: 1, username: 'validuser', password: 'hashedpassword', role: 'user' }]);

        // Mock bcrypt comparison
        bcrypt.compare = jest.fn().mockResolvedValueOnce(true); // Password matches

        // Mock jwt sign
        const mockToken = 'mockToken123';
        jwt.sign = jest.fn().mockReturnValue(mockToken);

        const response = await request(app)
            .post('/login')
            .send({ username: 'validuser', password: 'correctpassword' });

        expect(response.status).toBe(200);
        expect(response.body.token).toBe(mockToken);
    });
});
