import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'https://www.site.com.br';
  const params = {
    headers: {
      'Content-Type': 'application/JSON',
    },
  };

  const data = {
    "client_id": "test",
    "client_secret": "123",
  };

  const res = http.post(url, JSON.stringify(data), params);

  let token = res.json("access_token");
  check(token, { 'Authorization successfully': () => token !== '' });
  sleep(1);
  return token;
}
