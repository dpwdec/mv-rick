const Reception = require('../reception');

describe("Test Framework", () => {
  var reception;
  beforeAll(() => {
    reception = new Reception('emojiReception.json');
  })

it("loads a file", () => {
    expect(reception.receptionMap['😘']).toEqual('p');
  });

  it("returns a positive reaction", () => {
    const emoji = { '😘':1, '🤩':1, '😊':1 };
    expect(reception.getReception(emoji)).toEqual('positive');
  });

  it("returns mostly positive if there is at least one negative reaction", () => {
    const emoji = { '😘':1, '🤩':1, '😊':1, '👺':1 };
    expect(reception.getReception(emoji)).toEqual('mostly positive');
  })

  it("returns a positive when there are many negatives but a big single positive", () => {
    const emoji = {'🤬':1, '👺':1, '😩':1, '😘':4};
    expect(reception.getReception(emoji)).toEqual('mostly positive');
  });

  it('should return mostly positive', () => {
    const emoji = {'🤬':1, '😊':1, '😘':1};
    expect(reception.getReception(emoji)).toEqual('mostly positive');
  })

  it("returns a negative reaction", () => {
    const emoji = {'🤬':1, '👺':1, '😩':1 };
    expect(reception.getReception(emoji)).toEqual('negative');
  });

  it("returns a negative when there are many positives but a big single negative", () => {
    const emoji = {'😘':1, '🤩':1, '😊':1, '🤬':4};
    expect(reception.getReception(emoji)).toEqual('mostly negative');
  });

  it("returns mostly negative if there is at least one positive reaction", () => {
    const emoji = {'🤬':1, '👺':1, '😩':1, '😊':1};
    expect(reception.getReception(emoji)).toEqual('mostly negative');
  });

  it("returns mixed if negative and positive reactions are equal", () => {
    const emoji = {'🤬':1, '👺':1, '😘':1, '😊':1};
    expect(reception.getReception(emoji)).toEqual('mixed');
  });
})