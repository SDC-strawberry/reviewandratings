//going to have to account for the reviews that show up more than once because there are more than one photo attached
let returnReviews = (array, product_id, page, count, sort) => {
  let results = {
    product: `${product_id}`,
    page: page,
    count: count,
    "results": []
  };

  array.forEach((item) => {
    //I need to check if the review is already there & if there are photos
      //if there then I should just push the photos to
    // console.log('results_Id: ', results['results'][4]);
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

    if (item[10]) {
      reviewObj.photos.push ({
        id: item[10],
        url: item[11]
      })
    }


    // console.log('inside the helper',item[1]);
    for (let i = 0; i < results.results.length; i++) {
      let resultsId = results['results']
      if (resultsId[i].review_id === item[1]) {
        if (item[10]) {
          resultsId[i].photos.push ({
            id: item[10],
            url: item[11]
          })
          return
        }
      }
    }
    results.results.push(reviewObj);


  });
  return results;
};


let returnMeta = (metaObj, product_id) => {
  let results = {
    product_id: product_id,
    ratings: {},
    recommend: {
      false: '',
      true: ''
    },
    characteristics: {}
  }

  metaObj.forEach((item) => {
    //for the ratings section
    if (!results.ratings[item.rating]) {
      results.ratings[item.rating] = "1";
    } else {
      results.ratings[item.rating]++;
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
    results.characteristics[key].value = (results.characteristics[key].value/results.characteristics[key].avg).toString();
    delete results.characteristics[key].avg;
  }
  for (let key in results.ratings) {
    results.ratings[key] = results.ratings[key].toString();
  }

  for (let key in results.recommend) {
    results.recommend[key] = results.recommend[key].toString();
  }
  return results;

};


// let updatePhotos = (review_id, urlsArray) => {

//   let insertPhotoValue = '';

//   urlsArray.forEach((item) => {
//     insertPhotoValue += `(${review_id}, '${item}'),`;
//   });

//   // insertPhotoValue = insertPhotoValue.slice(0, 2);
//   console.log('inside the helper: ', insertPhotoValue);

//   let insertPhotoText = `INSERT INTO reviews_photos (review_id, url) VALUES ${insertPhotoValue}`
//   return insertPhotoText;

// };


module.exports = {
  returnReviews,
  returnMeta,

}