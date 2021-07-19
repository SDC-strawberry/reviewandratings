
let returnReviews = (array, product_id, page, count, sort) => {
  let results = {
    product: `${product_id}`,
    page: page,
    count: count,
    "results": []
  };

  array.forEach((item) => {
    let reviewObj = {
      review_id: item[1],
      rating: item[2],
      summary: item[3],
      recommend: item[4],
      response: item[5],
      body: item[6],
      date: item[7],
      reviewer_name: item[8],
      helpfulness: item[9],
      photos: []

    }

    results.results.push(reviewObj);
    // console.log('inside the helper',item[1]);

  });
  return results;
};


let returnMeta = (metaObj, product_id) => {
  let results = {
    product_id: product_id,
    ratings: {},
    recommend: {
      false: 0,
      true: 0
    },
    characteristics: {}
  }

  metaObj.forEach((item) => {
    //for the ratings section
    if (!results.ratings[item.rating]) {
      results.ratings[item.rating] = '1';
    } else {
      results.ratings[item.rating]++
    }

    //for the recommend section
    if (item.recommend === false) {
      results.recommend.false++
    }
    if (item.recommend === true) {
      results.recommend.true++
    }

    //for the characteristics section
    if (!results.characteristics[item.name]) {
      results.characteristics[item.name] = {
        id: item.id,
        value: item.value,
        avg: 1
      }
    }

    if (results.characteristics[item.name]) {
      results.characteristics[item.name].value += item.value;
      results.characteristics[item.name].avg++;
    }
  });

  for (let key in results.characteristics) {
    results.characteristics[key].value = results.characteristics[key].value/results.characteristics[key].avg;
    delete results.characteristics[key].avg;
  }

  return results;

};





module.exports = {
  returnReviews,
  returnMeta
}