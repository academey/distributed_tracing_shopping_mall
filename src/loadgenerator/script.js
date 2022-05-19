import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 1,
      maxDuration: '30s',
    },
  },
};

const SLEEP_DURATION = 0.1;

export default function () {
  // http.get(checkout -> 장바구니 결제);
  // http.get(checkout -> 바로 결제);
  // http.get(광고 조회);
  // const res = http.get("http://localhost:8008/cart");
  // sleep(1);

  group('cite3 shopping mall scenario', (_) => {
    // Login request
    const login_response = http.get('http://localhost:8008/cart', params);  
    sleep(SLEEP_DURATION);

    // Get user profile request
    const user_profile_response = http.get(
      'http://localhost:8008/cart',
      params
    );
    sleep(SLEEP_DURATION);

    // Update user profile request
    params.tags.name = 'update-user-profile';
    const update_profile_response = http.post(
      'http://localhost:8008/cart',
      params
    );
    sleep(SLEEP_DURATION);

    // Logout request
    params.tags.name = 'logout';
    const logout_response = http.get('http://localhost:8008/cart', params);
    sleep(SLEEP_DURATION);
  });

}