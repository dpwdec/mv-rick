describe("Test Framework", () => {
  it("has a working test framework", () => {
    expect(true).toBe(true);
  });

  it("loads a file", () => {
    const reception = require('../reception');
    const receptionMap = reception.getJSONFile('emojiReception.json');
    expect(receptionMap['😘']).toEqual('p');
  })
})