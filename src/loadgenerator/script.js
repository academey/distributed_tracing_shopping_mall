import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//   vus: 10,
//   duration: '1s',
// };

export default function () {
  // http.get(checkout -> 장바구니 결제);
  // http.get(checkout -> 바로 결제);
  // http.get(광고 조회);
  const res = http.get(__ENV.API_ENDPOINT);
  sleep(1);
}