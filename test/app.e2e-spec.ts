describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return global.pactum
      .get('/api/v1/auth')
      .expectStatus(200)
      .expectBodyContains('Hello World!');
  });
});
