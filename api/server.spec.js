const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('./server.js');

describe('server.js', () => {
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
});

