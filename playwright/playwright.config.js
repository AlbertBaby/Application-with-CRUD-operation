export const testDir = 'tests'
export const timeout = 30000
export const retries = 0
export const reporter = [
	['html'],
	['junit', { outputFile: 'results.xml' }],
	['allure-playwright']
]
export const projects = [
	{
		name: `Chrome`,
		use: {
			browserName: `chromium`,
			channel: `chrome`,
			headless: false,
			viewport: { width: 1720, height: 850 },
			screenshot: `only-on-failure`,
			video: `retain-on-failure`,
			trace: `retain-on-failure`
		}
	},
	{
		name: `Firefox`,
		use: {
			browserName: `firefox`,
			viewport: { width: 1720, height: 850 },
			ignoreHTTPSErrors: true,
			headless: true,
			screenshot: `only-on-failure`,
			video: `retain-on-failure`,
			trace: `retain-on-failure`,
			launchOptions: {
				slowMo: 200
			}
		}
	},
	{
		name: `Edge`,
		use: {
			browserName: `chromium`,
			channel: `msedge`,
			viewport: { width: 1720, height: 850 },
			ignoreHTTPSErrors: true,
			screenshot: `only-on-failure`,
			video: `retain-on-failure`,
			trace: `retain-on-failure`,
			launchOptions: {
				slowMo: 100
			}
		}
	}
]
