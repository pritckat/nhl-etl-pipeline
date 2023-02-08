const app = require('../app.js');
const request = require('supertest');

describe("POST /playersubmit", () => {

    describe("given a year and id", () => {
        // should download a csv with corresponding information
        test("not sure what happens here", async () => {
            const response = await request(app).post("/playersubmit").send({
              playerId: "8476792",
              playerYear: "2023"
            })
            expect(response.statusCode).toBe(200)
          })

          test("should specify csv in the content type header", async () => {
            const response = await request(app).post("/playersubmit").send({
              playerId: "8476792",
              playerYear: "2023"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("text/csv"))
          })
    })

    describe("when year or id is missing", () => {
        // should prompt user for missing information
        test("not sure what happens here", async () => {
          const response = await request(app).post("/playersubmit").send({

          })
          expect(response.statusCode).toBe(400)
        })
    })
})

describe("POST /teamsubmit", () => {

  describe("given a year and id", () => {
      // should download a csv with corresponding information
      test("not sure what happens here", async () => {
          const response = await request(app).post("/teamsubmit").send({
            teamId: "1",
            teamYear: "2023"
          })
          expect(response.statusCode).toBe(200)
        })

        test("should specify csv in the content type header", async () => {
          const response = await request(app).post("/teamsubmit").send({
            teamId: "1",
            teamYear: "2023"
          })
          expect(response.headers['content-type']).toEqual(expect.stringContaining("text/csv"))
        })
  })

  describe("when year or id is missing", () => {
      // should prompt user for missing information
      test("not sure what happens here", async () => {
        const response = await request(app).post("/teamsubmit").send({

        })
        expect(response.statusCode).toBe(400)
      })
  })
})