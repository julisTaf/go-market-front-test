import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true
};

export const serverHost = {
  EndPoint : 'http://localhost:8089/api',
  headers: new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*'),
}
