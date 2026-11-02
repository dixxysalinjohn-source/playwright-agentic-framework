// This agent creates framework for ANY site you give it
class FrameworkAgent {
    
    // Give it a site, it generates POM
    generatePrompt(siteUrl, pageName) {
        return `
        Create Playwright JS Page Object for ${siteUrl}
        Requirements:
        - Class name: ${pageName}
        - File: Pages/${pageName.toLowerCase()}_ai_generated.js
        - Use BasePage inheritance: const { BasePage } = require('./BasePage');
        - Use getByRole, getByPlaceholder, getByTestId (rather than XPath)
        - Add methods for main actions (login, search, addToCart, etc)
        - Use locators that will not break easily
        - Site to analyze: ${siteUrl}
        - Look at current DOM of ${siteUrl} and generate locators
        `;
    }

    generateTestPrompt(siteUrl, pageName, scenario) {
        return `
        Create Playwright test for ${pageName} from ${siteUrl}
        Requirements:
        - File: Tests/${pageName.toLowerCase()}test.spec.js
        - Use Fixtures: const { test, expect } = require('../Fixtures/fixtures');
        - Use TestData from TestData/datalogin.json
        - Scenario: ${scenario}
        - Use the Page Object Pages/${pageName.toLowerCase()}_ai_generated.js
        `;
    }

    // This heals failed tests by reading trace
    async healTest(failedLocator, traceInfo) {
        console.log(`AI Healing: ${failedLocator} failed`);
        console.log(`Trace says: ${traceInfo}`);
        return `Suggestion: Change locator from ${failedLocator} to getByRole with new name. Check trace: ${traceInfo}`;
    }
}

module.exports = { FrameworkAgent };