import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
  stages: [
    { duration: '1m30s', target: 1000}
  ]
};


export default function () {
  for (let id = 1; id < 120; id++) {
    http.get(`http://localhost:3000/reviews/meta?product_id=${id}`, {
      tags: { name: 'getMeta'},
    });
    sleep(1);
  }
};

// export default function () {
//   for (let id = 1; id < 120; id++) {
//     http.get(`http://localhost:3000/reviews?product_id=${id}`, {
//       tags: { name: 'getReviews'},
//     });
//     sleep(1);
//   }
// };