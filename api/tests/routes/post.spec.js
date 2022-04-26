const session = require('supertest-session');
const app = require('../../src/routes/index'); 

const agent = session(app);


describe('Test de POST', () => {

  let game;
  beforeEach(() => {
    game = [
      {name: "Champi2",description: "disparate esta",release: "03/1997",rating: 3,platforms: "PC",genres:["RPG"]},
      {name: "Champi2",description: "disparate esta",release: "03/1997",rating: "hola",platforms: "PC",genres:["RPG"]},
      {name: "Champi2",description: "disparate esta",release: "03/1997",rating: 3,platforms: "PC",genres:undefined},
    ]

    });


  it('responds with 201', () => {agent.post('/videogames')
  .send(game[0])
  .expect(201)
  })

  it('responds with 400', () => {agent.post('/videogames')
  .send(game[1])
  .expect(201)
  })

  it('responds with 400', () => {agent.post('/videogames')
  .send(game[2])
  .expect(201)
  })





})
