const Instr = require('./instructorsHelper.js');
const db = require('../../data/dbConfig.js');

describe('insert', () => {
    afterEach(async () => {
        await db('instructors').truncate();
     })

    it('should insert an instructor', async () => {
        const instr = ({ username: 'A new instructor', password: '1234' });
        const res = await Instr.register(instr);
        expect(res.username).toBe('A new instructor');
        expect(res.id).toBe(1);
    });

    it('should return an array of instructors', async () => {
        let inst = await Instr.getInstructors();
        expect(inst.length).toBe(0);

        const instr = ({ username: 'A new instructor', password: '1234' });
        const instr2 = ({ username: 'inst2', password: '1234' });
        await Instr.register(instr);
        await Instr.register(instr2);

        inst = await Instr.getInstructors();
        expect(inst.length).toBe(2);
        expect(inst[1].username).toBe('inst2');
    });
 });