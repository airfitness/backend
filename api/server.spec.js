const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('./server.js');

describe('server.js', () => {
    afterEach(async () => {
        await db('instructors').truncate();
        await db('classes').truncate();
        await db('users').truncate();
     })

    it('should set testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /classes', () => {
        it('should return 200 ok', async () => {
            const res = await request(server).get('/api/classes');
        expect(res.status).toEqual(200);
        });
    
        it('should return an empty array', async () => {
            const res = await request(server).get('/api/classes');
        expect(res.body.classes).toEqual([]);
        });
    
        it('should return JSON', async () => {
            const res = await request(server).get('/api/classes');
        expect(res.type).toBe('application/json');
        });
    });

    describe('GET /instructors/', () => {
        it('should return 200 ok', async () => {
            const res = await request(server).get('/api/instructors');
        expect(res.status).toEqual(200);
        });
    
        it('should return an empty array', async () => {
            const res = await request(server).get('/api/instructors');
        expect(res.body.instructors).toEqual([]);
        });
    
        it('should return JSON', async () => {
            const res = await request(server).get('/api/instructors');
        expect(res.type).toBe('application/json');
        });
    });

    describe('POST /instructors/register and login', () => {
        it('should return 201 status code', async () => {
            const instr = ({ username: 'A new instructor', password: '1234' });
            const res = await request(server).post('/api/instructors/register').send(instr);
            expect(res.status).toEqual(201);
        });

        // it('login should return a token', async () => {
        //     const instr = ({ username: 'A new instructor', password: '1234' });
        //     const res = await request(server).post('/api/instructors/login').send(instr);
        //     expect(res.status).toBe(400);
        // });
    });
});

