const Instr = require('../instructors/instructorsHelper.js');
const Clss = require('./classesHelper.js');
const db = require('../../data/dbConfig.js');

describe('insert', () => {
    afterEach(async () => {
        await db('classes').truncate();
        await db('instructors').truncate();
     })

    it('should insert an instructor', async () => {
        const instr = ({ username: 'inst1', password: '1234' });
        const res = await Instr.register(instr);
        expect(res.id).toBe(1);
    });

    it('should return an empty array', async () => {
        const cls = await Clss.getClasses();
        expect(cls).toEqual([]);
    });

    it('should return an empty array', async () => {
        const instr = ({ username: 'inst1', password: '1234' });
        await Instr.register(instr);
        const addClass = {
            "instructorId": 1,
            "price":100.29,
            "times":"Around noon",
            "class_name":"a",
            "location":"kansas"
        }
        const cls = await Clss.addClass(addClass);
        expect(cls.class_name).toEqual("a");
        expect(cls.location).toEqual("kansas");
    });
 });