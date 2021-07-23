const help = require('../helpers.js');
const mock = require('./apiMockData.js')

describe("tests out the review return function", () => {


  test("Should return an empty object when no product is passed", () => {
    expect(help.returnReviews([])).toStrictEqual({"product": "undefined","page": undefined,"count": undefined,"results": []});
  });


  test("Should return propery formatted object when a product number is passed & no photos", () => {
    expect(help.returnReviews(mock.array, 1234, 2, 5)).toStrictEqual({"product": "1234","page": 2,"count": 5,"results": [
      {
        review_id: 12345,
        rating: 2,
        summary: "summary",
        recommend: true,
        response: null,
        body: "body",
        date: "1905",
        reviewer_name: "timmyu",
        helpfulness: 9,
        photos: []
      }
    ]});
  });

  test("Should return propery formatted object when a product number is passed & photos", () => {
    expect(help.returnReviews(mock.arrayPhotos, 1234, 2, 5)).toStrictEqual({"product": "1234","page": 2,"count": 5,"results": [
      {
        review_id: 12345,
        rating: 2,
        summary: "summary",
        recommend: true,
        response: null,
        body: "body",
        date: "1905",
        reviewer_name: "timmyu",
        helpfulness: 9,
        photos: [
          {
            id: 1,
            url: "https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
          }
        ]
      }
    ]});
  });

  test("Should return propery formatted object when a product number is passed the same review with different photos", () => {
    expect(help.returnReviews(mock.arrayMulti, 1234, 2, 5)).toStrictEqual({"product": "1234","page": 2,"count": 5,"results": [
      {
        review_id: 12345,
        rating: 2,
        summary: "summary",
        recommend: true,
        response: null,
        body: "body",
        date: "1905",
        reviewer_name: "timmyu",
        helpfulness: 9,
        photos: [
          {
            id: 1,
            url: "https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
          },
          {
            id: 2,
            url: "https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
          }
        ]
      }
    ]});
  });
});


describe("tests out the metadata return function", () => {

  test("Should return propery formatted metadata object when an product number is passed in ", () => {
    expect(help.returnMeta(mock.metadata, 28212)).toStrictEqual({"product_id": 28212,
    "ratings": {
        "1": "4",
        "2": "4"
    },
    "recommend": {
        "false": "4",
        "true": "4"
    },
    "characteristics": {
        "Size": {
            "id": 94374,
            "value": "1.3333333333333333"
        },
        "Width": {
            "id": 94375,
            "value": "3.3333333333333335"
        },
        "Comfort": {
            "id": 94376,
            "value": "2.3333333333333335"
        },
        "Quality": {
            "id": 94377,
            "value": "3.3333333333333335"
        }
    }});
  });


  // test("Should return empty object when no product is passed in ", () => {
  //   expect(help.returnMeta([])).toStrictEqual({
  //     "ratings": {},
  //     "recommend": {
  //         "false": "",
  //         "true": ""
  //     },
  //     "characteristics": {}
  //   });
  // });
});

