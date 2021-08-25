describe('Login and Logout', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should have login screen', async () => {
    await expect(element(by.id('loginScreen'))).toBeVisible();
  });

  it('should fill login form', async () => {
    await element(by.id('email')).typeText('chirag.infynno@gmail.com');
    await element(by.id('password')).typeText('123456\n');
    await element(by.id('loginButton')).tap();
  });

  it('should show projects screen', async () => {
    await expect(element(by.id('projectscreen'))).toBeVisible();
  });

  it('should logout', async () => {
    await expect(element(by.id('logoutButton'))).toBeVisible();
    await element(by.id('logoutButton')).tap();
  });
});

describe('Forgot Password', () => {
  it('should go to forgot password screen', async () => {
    await element(by.id('forgotLink')).tap();
    await expect(element(by.id('forgotScreen'))).toBeVisible();
  });
});
