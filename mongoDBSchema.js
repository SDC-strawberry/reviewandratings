//this is for reviews collection

{
  product: Number,
  results: [
    {
      review_id: Number,
      rating: Number,
      summary: String,
      recommend: Boolean,
      response: String,
      body: String,
      date: Date,
      reviewer_name: String,
      helpfulness: Number,
      photos: [
        {
          id: Number,
          url: String
        }
      ]
    }
  ]
}

//this is for metadata collection

{
  product_id: Number,
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number
  },
  recommend: {
    false: Number,
    true: Number
  },
  characteristics: {
    size: {
      id: Number,
      value: Number
    },
    width: {
      id: Number,
      value: Number
    },
    comfort: {
      id: Number,
      value: Number
    },
    quality: {
      id: Number,
      value: Number
    },
    length: {
      id: Number,
      value: Number
    },
    fit: {
      id: Number,
      value: Number
    }
  }

}