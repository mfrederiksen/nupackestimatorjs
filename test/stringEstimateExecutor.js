const             should = require('chai').should(),
  stringEstimateExecutor = require('../lib/stringEstimateExecutor');

describe('stringEstimateExecutor', () => {

  function createExecutorFn(expectedPrice, expectedPeople, expectedType, returns) {
    return (price, people, type) => {
      price.should.equal(expectedPrice);
      people.should.equal(expectedPeople);
      type.should.equal(expectedType);
      return returns;
    }
  }

  it('Should format the returned price to currency', () => {
    stringEstimateExecutor(() => 10.00, '$1, 1 person, food').should.equal('$10.00');
  });

  it('Should call the executor with the correct arguments', () => {
    stringEstimateExecutor(createExecutorFn(1299.99, 3, 'food', 10.00), '$1,299.99, 3 people, food').should.equal('$10.00');
  });

});