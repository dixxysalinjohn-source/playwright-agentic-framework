// This agent creates framework for ANY site you give it
class FrameworkAgent {
    
    // Give it a site, it generates POM
    generatePrompt(siteUrl) {
        return `
        Create Playwright JS Page Object for ${siteUrl}
        Requirements:
        - Use BasePage inheritance
        - Use getByRole, getByPlaceholder, getByTestId (rather than XPath)
        - Add methods for main actions
        - Site to analyze: ${siteUrl}
        `;
    }

    // This heals failed tests by reading trace
    async healTest(failedLocator, traceInfo) {
        console.log(`AI Healing: ${failedLocator} failed`);
        console.log(`Trace says: ${traceInfo}`);
        return `Suggestion: Change locator to getByRole with new name`;
    }
}

module.exports = { FrameworkAgent };