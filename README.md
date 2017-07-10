# [Nulogy](http://nulogy.com/)

NuPack Estimator JS is a node library for quickly calculating cost estimates for NuPack.

### Rules

Cost estimates are calculated using the base price, number of people involved and the type of product.  Flat markup is applied to the base, then labor and type markups on top.

| Type            | Rate          |
|-----------------|--------------:|
| Flat (All)      | 5%            |
| Labour (All)    | 1.2% / person |
| Pharmaceuticals | 7.5%          |
| Food            | 13%           |
| Electronics     | 2%            |
| Other           | 0             |

Formula:
```
base_with_flat = base_price X flat_rate 
labour_markup = base_with_flat X #_people X labour_rate
materials_markup = base_with_flat X type_rate_from_table
total_estimate = base_with_flat + labour_markup + materials_markup

```

### Installation

Node version >= 6.11.0 (LTS)

Direct install:
```bash
git clone git@github.com:mfrederiksen/nupackestimatorjs.git
cd nupackestimatorjs
npm install
```

As a dependency:
```bash
npm install git+https://git@github.com:mfrederiksen/nupackestimatorjs.git --save
```

### Library usage

nupackestimatorjs can be used simple and advanced modes.  In simple mode, a calculator function can be required in and used immediately.  Advanced mode gives direct access to the calculator classes.

Simple usage example:
```javascript
// create an estimator using the default markup rates.
const estimator = require('nupackestimatorjs').estimator();

// get an estimate using string syntax
estimator('$5,432.00, 1 person, drugs'); // returns '$6,199.81'

// get an estimate using numeric syntax
estimator(1299.99, 3, 'food'); // returns 1591.58
```

Simple usage with config override:
```javascript
// create an estimator using custom markup rates.  See config format for details.
const estimator = require('nupackestimatorjs').estimator({ flat: 0.1, labour: 0.2, materials: { 'food': 0.3 }});

// get an estimate using numeric syntax
estimator(1.0, 1, 'food'); // returns 1.65
```
Advanced Usage:
```javascript
// require in either EstimateCalculator or StringEstimateCalculator
const EstimateCalculator = require('nupackestimatorjs').EstimateCalculator;

// Create the estimator with the flat rate, labour rate and materials rates 
let estimator = new EstimateCalculator(0.1, 0.2, { 'food': 0.3, 'hats': 0.1 });
estimator.calculate(1.0, 1, 'food'); // returns 1.65
```
### Config Object Format

flat, labour and materials keys are all required.  Rates must be specified as a decimal percentage.  Materials map keys must be lower case.  Materials map may be empty.

```json
{
  "flat": 0.05,
  "labour": 0.012,
  "materials": {
    "drugs" : 0.075,
    "food": 0.13,
    "electronics": 0.02
  }
}
```

### Testing

from direct install:
```bash
npm test
```

from a dependency:
```bash
npm install -g mocha
cd node_modules/nupackestimatorjs
mocha
```
