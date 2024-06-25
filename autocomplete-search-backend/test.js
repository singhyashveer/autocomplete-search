const axios = require("axios");
const apiUrl = "http://localhost:5000";

test("Test case for search querry", async () => {
  const search = "History";
  const response = await axios.post(`${apiUrl}/search`, { search });

  expect(response.status).toBe(200);
  expect(response.data).toBeDefined();
  expect(typeof response.data).toBe("object");
  expect(response.data[24]).toBe("Guns, Germs, and Steel");
  expect(response.data[44]).toBe("On the Shortness of Life");
});

test("Test case to get details of book by id", async () => {
  const search = "History";
  const response = await axios.get(`${apiUrl}/getBookData?id=1`);

  expect(response.status).toBe(200);
  expect(response.data).toBeDefined();
  expect(typeof response.data).toBe("object");
  expect(response.data.title).toBe("The Richest Man in Babylon");
  expect(response.data.summary).toBe(
    "The Book in Three Sentences: The 10X Rule says that 1) you should set targets for yourself that are 10X greater than what you believe you can achieve and 2) you should take actions that are 10X greater than what you believe are necessary to achieve your goals. The biggest mistake most people make in life is not setting goals high enough. Taking massive action is the only way to fulfill your true potential."
  );
  expect(response.data.author).toBe("Grant Cardone");
});
