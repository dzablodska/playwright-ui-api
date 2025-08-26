import { test } from './fixtures/ui.fixtures';
import { expectFailedLogin } from './steps/login.steps';

test('Failed login shows an error and stays on login page', async ({ login }) => {
  await expectFailedLogin(login, {
    username: 'locked_out_user',
    password: 'wrong_password',
  });
});
