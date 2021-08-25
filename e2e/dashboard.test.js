describe('Dashboard', () => {
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

  it('should go to dashboard', async () => {
    await element(by.id('Dashboard')).tap();
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  it('should have punch option', async () => {
    await expect(element(by.id('punchCard'))).toBeVisible();
  });

  it('should log punch start and stop', async () => {
    await element(by.id('startButton')).tap();
    await expect(element(by.id('stopButton'))).toBeVisible();
    await element(by.id('stopButton')).tap();
  });

  it('should have leaves count', async () => {
    await expect(element(by.id('leavesCount'))).toBeVisible();
  });

  it('should have average punchlog', async () => {
    await expect(element(by.id('averagePunchlog'))).toBeVisible();
  });

  it('should have average worklog', async () => {
    await expect(element(by.id('averageWorklog'))).toBeVisible();
  });
});
