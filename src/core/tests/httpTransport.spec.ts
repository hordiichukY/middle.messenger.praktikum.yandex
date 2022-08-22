import { expect } from 'chai';
import { HTTPTransport } from '../htttpTransport';
global.XMLHttpRequest = require('xhr2');
global.FormData = require('form-data');

describe('HTTP', () => {
  const baseUrl = 'https://httpbin.org';
  const http = new HTTPTransport('', baseUrl);

  it('should send get request', async () => {
    const response = await http.get('/get');
    expect(response).to.be.ok;
  });

  it('should send post request', async () => {
    const response = await http.post('/post');
    expect(response).to.be.ok;
  });

  it('should send put request', async () => {
    const response = await http.put('/put');
    expect(response).to.be.ok;
  });

  it('should send delete request', async () => {
    const response = await http.delete('/delete');
    expect(response).to.be.ok;
  });
});
