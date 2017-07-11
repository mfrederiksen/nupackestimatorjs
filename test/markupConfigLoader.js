const         should = require('chai').should(),
  markupConfigLoader = require('../lib/markupConfigLoader');

describe('markupConfigLoader', () => {
  it('Should default to default_markup.json when no override is supplied', () => {
    markupConfigLoader().should.equal(require('../default_markup.json'));
  });

  it('Should use override config when supplied', () => {
    const override = {
      "flat": 1,
      "labour": 2,
      "materials": {
        "food" : 3
      }
    };
    markupConfigLoader(override).should.equal(override);
  });

  it('Should not allow missing flat rate', () => {
    (() => markupConfigLoader({labour: 2, materials: { food : 3 }})).should.throw(Error);
  });

  it('Should not allow invalid flat rate', () => {
    (() => markupConfigLoader({flat: 'one', labour: 2, materials: { food : 3 }})).should.throw(Error);
  });

  it('Should not allow missing labour rate', () => {
    (() => markupConfigLoader({flat: 1, materials: { food : 3 }})).should.throw(Error);
  });

  it('Should not allow invalid labour rate', () => {
    (() => markupConfigLoader({flat: 1, labour: 'two', materials: { food : 3 }})).should.throw(Error);
  });

  it('Should not allow missing materials map', () => {
    (() => markupConfigLoader({flat: 1, labour: 2})).should.throw(Error);
  });

  it('Should not allow invalid materials map', () => {
    (() => markupConfigLoader({flat: 1, labour: 2, materials: 'object'})).should.throw(Error);
  });

  it('Should allow empty materials map', () => {
    (() => markupConfigLoader({flat: 1, labour: 2, materials: {}})).should.not.throw(Error);
  });
});