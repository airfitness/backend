const Users = require('./usersHelper.js');
const db = require('../../data/dbConfig.js');

describe('insert', () => {
    afterEach(async () => {
        await db('users').truncate();
     })

    it('should insert an user', async () => {
        const user = ({ username: 'A new user', password: '1234' });
        const res = await Users.register(user);
        expect(res.username).toBe('A new user');
        expect(res.id).toBe(1);
    });
 });