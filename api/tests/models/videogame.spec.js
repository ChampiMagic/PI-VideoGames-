const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  });
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    });
    describe("name", () => {
      it("should work when its a valid name", () => {
        Videogame.create({ name: "Emmanuel", description: "description", platforms:"PC, PS4" });
      });
      it("should return name not found", (done) => {
        Videogame.findAll()
          .then((r) => expect(r[1].name).to.be.false("NameNotFound"))
          .catch(() => done());
      });
    });
