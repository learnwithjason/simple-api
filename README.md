# Simple API Example

This is a demo to go along with a tutorial for teaching devs how to stand up simple APIs, whether for proofs of concept or for production needs.

## Endpoints

### `/api/food`

Returns a list of foods, along with details about the restaurant and a rating.

#### Example response

```json
// 20230606104914
// http://localhost:8888/api/food

[
  {
    "id": "b8c8511d-ffab-4fac-b12c-c557e661b72e",
    "title": "Carnitas Burrito",
    "restaurant": {
      "name": "Taco Gang",
      "link": "https://tacogangpdx.com",
      "location": "Portland, OR"
    },
    "categories": [
      "lunch",
      "dinner",
      "heavy",
      "mexican"
    ],
    "rating": 4.8
  },
  {
    "id": "61eefe6b-0089-4a94-b828-1f8867384062",
    "title": "White Brisket Curry",
    "restaurant": {
      "name": "Eem",
      "link": "https://www.eempdx.com/",
      "location": "Portland, OR"
    },
    "categories": [
      "dinner",
      "heavy",
      "thai",
      "bbq"
    ],
    "rating": 5
  },
  {
    "id": "799747ed-22b0-419f-b1a8-2fd4afb2a912",
    "title": "Jerk Chicken",
    "restaurant": {
      "name": "The Real Jerk",
      "link": "https://www.therealjerk.com/",
      "location": "Toronto, ON"
    },
    "categories": [
      "lunch",
      "dinner",
      "carribean"
    ],
    "rating": 4.9
  }
]
```

#### Filters

- `rating` (number, default `0`, max `5`) — only return foods with a rating over this number
- `location` (string) — only return foods that are available in the given location
- `category` (string) — only return foods that match the given category
 
##### Examples

Only return foods with a rating of 4.9 or higher:

```
/api/food?rating=4.9
```

Only return foods available in Portland, OR:

```
/api/food?location=Portland,%20OR
```

Only return foods with a rating of 4.9 or higher with the category lunch:

```
/api/food?rating=4.9&category=lunch
```