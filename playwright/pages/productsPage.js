import BasePage from './basePage'
import { productPageSelectors } from '../pageobjects/productsPage'

export default class ProductsPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async addProduct() {
    
        // Click Add Product button
        await this.waitAndClick(productPageSelectors.addProductButton)

        // Fill product details
        await this.waitAndClick(productPageSelectors.productNameInput)
        await this.waitAndFill(productPageSelectors.productNameInput, 'prod1')
        
        await this.waitAndClick(productPageSelectors.descriptionInput)
        await this.waitAndFill(productPageSelectors.descriptionInput, 'desc1')
        
        await this.waitAndClick(productPageSelectors.priceInput)
        await this.waitAndFill(productPageSelectors.priceInput, '123')
        
        await this.waitAndFill(productPageSelectors.discountInput, '12')

        // Upload image
        await this.waitAndHardClick(productPageSelectors.uploadButton)
        await this.page.setInputFiles(productPageSelectors.fileInput, 'data/test-image.jpg')

        // Submit form
        await this.waitAndClick(productPageSelectors.submitAddProductButton)
        await this.waitAndClick(productPageSelectors.okButton)
    }
}