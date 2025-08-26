import { test, expect } from '@playwright/test';

test.describe('ReqRes API', () => {
  test('Retrieve a list of users (page 2)', async ({ request }) => {
    const res = await request.get('/api/users', { params: { page: 2 } });
    expect(res.status(), await res.text()).toBe(200);

    const body = await res.json();
    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('Successful login', async ({ request }) => {
    const email = process.env.REQRES_USER;
    const password = process.env.REQRES_PASS;
    test.skip(!email || !password, 'REQRES_USER/REQRES_PASS not configured');

    const res = await request.post('/api/login', { data: { email, password } });
    expect(res.status(), await res.text()).toBe(200);

    const body = await res.json();
    expect(body.token).toEqual(expect.stringMatching(/\S+/));
  });

  test('Update user (PUT)', async ({ request }) => {
    const payload = { name: 'morpheus', job: 'zion resident' };
    const res = await request.put('/api/users/2', { data: payload });
    expect(res.status(), await res.text()).toBe(200);

    const body = await res.json();
    expect(body).toEqual(
      expect.objectContaining({
        name: payload.name,
        job: payload.job,
        updatedAt: expect.any(String),
      }),
    );
    expect(new Date(body.updatedAt).toString()).not.toBe('Invalid Date');
  });

  test('Delete user', async ({ request }) => {
    const res = await request.delete('/api/users/2');
    expect(res.status(), await res.text()).toBe(204);

    const text = await res.text();
    expect(text === '' || text === undefined).toBeTruthy();
  });

  test('Negative: login without password returns 400', async ({ request }) => {
    const res = await request.post('/api/login', { data: { email: 'peter@klaven' } });
    expect(res.status(), await res.text()).toBe(400);

    const body = await res.json();
    expect(body.error).toMatch(/missing password/i);
  });

  test('Negative: user not found returns 404', async ({ request }) => {
    const res = await request.get('/api/users/23');
    expect(res.status(), await res.text()).toBe(404);

    const raw = await res.text();
    expect(raw === '' || raw === '{}').toBeTruthy();
  });

  test('Delayed response (<= 3s) and duration measurement', async ({ request }, info) => {
    const start = Date.now();
    const res = await request.get('/api/users', { params: { delay: 3 } });
    const durationMs = Date.now() - start;

    expect(res.status(), await res.text()).toBe(200);
    expect(durationMs).toBeGreaterThanOrEqual(3000);
    expect(durationMs).toBeLessThanOrEqual(3400);

    info.annotations.push({ type: 'timing', description: `Response in ${durationMs} ms` });

    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
  });
});
