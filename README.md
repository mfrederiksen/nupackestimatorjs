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
base_with_flat = (base\_price X flat\_rate) 
estimate = (base\_with\_flat X (1.0 + (\#\_people X 0.012))) + (base\_with\_flat X type_rate_from_table);


### Installation

Node version >= 6.11.0 (LTS)

```bash
npm install
```

### Configuration

markup.json defines all markups.  Markups can be set in decimal form (eg 5% should be 0.05).  

The'flat' and 'people' keys define the flat rate markup and per-person labour markup, respectively.

The type object allows for addition of new types.  All type names must be lower case.

example:
```json
{
  "flat": 0.05,
  "people": 0.012,
  "type": {
    "drugs" : 0.075,
    "food": 0.13,
    "electronics": 0.02,
    "hats" : 0.99
  }
}
```

### Testing

```bash
npm test
```