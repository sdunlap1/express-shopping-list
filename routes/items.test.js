process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

let item = { name: "silly", price: 200 };

beforeEach(() => {
  items.push(item);
});

afterEach(() => {
  items.length = 0; // Clear the array
});

describe("GET /items", () => {
  test("Gets a list of items", async () => {
    const response = await request(app).get(`/items`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
  });
});

describe("GET /items/:name", () => {
  test("Gets a single item", async () => {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async () => {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Creates a new item", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({ name: "Taco", price: 0 });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("Taco");
    expect(response.body.item.price).toEqual(0);
  });
});

describe("PATCH /items/:name", () => {
  test("Updates a single item", async () => {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({ name: "Troll", price: 200 });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({ name: "Troll", price: 200 });
  });

  test("Responds with 404 if can't find item", async () => {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Deletes a single item", async () => {
    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});
