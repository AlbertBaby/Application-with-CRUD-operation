import test from '../testFixtures/fixture'

test.describe('Product Management Test Cases', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.openApp();
    });

    test('Should add a new product successfully', async ({ loginPage, productsPage }) => {
        await test.step('Login and add product', async () => {
            await loginPage.loginAsValidUser();
            await productsPage.addProduct();
        });
    });
    test('Should login successfully with valid credentials', async ({ loginPage }) => {
			await test.step(`Open the APP`, async () => {
				await loginPage.openApp()
				await loginPage.loginAsValidUser()
				}
		)


			await test.step(
				`Verify the products page shopping cart icon and product sort container visible `,
				async () => {
					await productsPage.shoppingCartLink()
					await productsPage.productSortContainerVisible()
				}
			)
		})
	}
)