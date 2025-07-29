export const productPageSelectors = {
    // Buttons
    addProductButton: 'button:has-text("Add Product")',
    uploadButton: 'input[type="file"]',
    okButton: 'button:has-text("OK")',
    submitAddProductButton: 'div[role="dialog"] button:has-text("Add Product")',
    
    // Input Fields
    productNameInput: '[placeholder="Product Name"]',
    descriptionInput: '[placeholder="Description"]',
    priceInput: '[placeholder="Price"]',
    discountInput: '[placeholder="Discount"]',
    fileInput: 'input[type="file"]',
    
    // Messages
    noProductMessage: 'text="There is no product!"',
    
    // Dialog
    addProductDialog: 'div[role="dialog"]'
};
