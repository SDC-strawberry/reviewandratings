const db = require('../sqlQueries.js');
const axios = require('axios');

jest.mock('axios');

it('returns something', async () => {
  axios.get.mockResolvedValue({data: {product_id: '7'}});

  const some = await db.getReviews();
  expect(some).toStrictEqual(
      {
        "product": "7",
        "page": 0,
        "count": 5,
        "results": [
            {
                "review_id": 13,
                "rating": 5,
                "summary": "Ye is good at everything",
                "recommend": true,
                "response": "null",
                "body": "I mortgaged my house to pay for these",
                "date": " 2020-10-15T00:29:50.544Z",
                "reviewer_name": "yecrazy",
                "helpfulness": 2,
                "photos": []
            }
        ]
    }
  )
});
