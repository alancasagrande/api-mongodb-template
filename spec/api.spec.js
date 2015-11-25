import './spec_helper';
import request from './authenticated_request';
import api from '../src/api';


describe('API', function () {

  it('should unauthorize invalid credentials', function (done) {
    request(api, 'root', 'user')
      .get('/login')
      .expect(401)
      .end(done);
  });

  it('should authorize valid credentials', function (done) {
    request(api, 'root', 'root')
      .get('/login')
      .expect(200)
      .end(done);
  });
});
