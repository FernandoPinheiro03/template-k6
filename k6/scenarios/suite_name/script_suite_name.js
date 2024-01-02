import script from '../authorization/script_authorization.js';
import http from 'k6/http';
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, sleep } from 'k6';
import payload1 from '../../payloads/suite_name/payload1.json'
const url = ""
var token


export const options = {
  stages: [
    { duration: '2s', target: 10 },
    { duration: '5s', target: 10 },
    { duration: '7s', target: 10 },
  ],
};

export function setup() {
  token = script()
  return token
}

export function handleSummary(data) {
  return {
    "summary_suite_name.html": htmlReport(data),
  };
}

export default function (token) {
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    setTimeout: 10
  };

  describe('01 - Test Case X', () => {

    var request = payload1()

    const res = http.post(url, JSON.stringify(request), params);
    check(res, { 'criar status was 201': (r) => r.status == 201 });
    let id = res.json('id');
    sleep(1);
  });

}
