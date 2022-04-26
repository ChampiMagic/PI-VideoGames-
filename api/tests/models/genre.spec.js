const { Genre, conn } = require('../../src/db.js');
const session = require('supertest-session');
const { expect } = require('chai');


//const agent = session(app);


describe('Test BD', () => {

  let game;
  beforeEach( async () => {
  try {
    await conn.authenticate();
    console.log('Connection has been established successfully.');

    } catch (error) {
       console.error('Unable to connect to the database:', error);
   }

    });
  });

    describe('Create Genre', () => {
      beforeEach(() => { conn.sync({force: true}) });

      describe('Try add genre', () => {
       it('Should add a new genre', async () => {
          const genre = await Genre.create({id: 576, name:"Gore"});
          expect(genre.dataValues).to.eql({id: 576, name:"Gore"})
        });
        it('Should add a new genre', async () => {
          const genre2 = await Genre.create({name: "MMORPG", id: 678})
          expect(genre2.dataValues).to.eql({name: "MMORPG", id: 678})
        });
        it('Should refuse to add a genre', async (done) => {
          try {
            await Genre.create({})
          } catch (error) {

            done(Error(error));

          }

        });

      });
    });
