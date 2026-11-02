class BasePage {
    constructor(page) {
        this.page = page;
    }
    async waitForApi(urlPart) {
        await this.page.waitForResponse(r => r.url().includes(urlPart) && r.status() === 200);
    }
}
module.exports = { BasePage };