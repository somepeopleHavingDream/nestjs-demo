import Spec from 'pactum/src/models/Spec';

describe('Auth 登录认证 e2e 测试', () => {
  let spec: Spec;

  beforeEach(() => {
    spec = global.pactum;
  });

  // 注册用户
  it('注册用户', () => {
    return spec
      .post('/api/v1/auth/signup')
      .withBody({
        username: '123456',
        password: '123456',
      })
      .expectStatus(201);
  });
});
