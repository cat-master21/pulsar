let config = {
  testDir: 'integration',
  timeout: 240000,
  expect: {
    timeout: 60000,
    toMatchSnapshot: {threshold: 0.2},
  }
}

if(process.env.CI) {
  config.retries = 3
}

module.exports = config
