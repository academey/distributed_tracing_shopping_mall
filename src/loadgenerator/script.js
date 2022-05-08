import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//   vus: 10,
//   duration: '1s',
// };

export default function () {
  const res = http.get(__ENV.API_ENDPOINT);
  sleep(1);
}