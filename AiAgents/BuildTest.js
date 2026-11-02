const { FrameworkAgent } = require('./FrameworkAgent');
const fs = require('fs');

// USAGE: node AiAgents/BuildTest.js DashboardPage "verify dashboard loads" https://.../dashboard

const PAGE_NAME = process.argv[2] || 'LoginPage';
const SCENARIO = process.argv[3] || 'valid login and invalid login';
const SITE_URL = process.argv[4] || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

const agent = new FrameworkAgent();
const prompt = agent.generateTestPrompt(SITE_URL, PAGE_NAME, SCENARIO);

console.log(`=== TEST FOR ${PAGE_NAME} - ${SCENARIO} ===`);
console.log(prompt);

const skeleton = `const { test, expect } = require('../Fixtures/fixtures');
const { ${PAGE_NAME} } = require('../Pages/${PAGE_NAME.toLowerCase()}_ai_generated.js');

test.describe('${PAGE_NAME} - ${SCENARIO}', () => {
  test('${SCENARIO}', async ({ page }) => {
    const pageObj = new ${PAGE_NAME}(page);
    await page.goto('${SITE_URL}');
    // Scenario: ${SCENARIO}
    await expect(page).toHaveURL(/.*/);
  });
});
`;

fs.writeFileSync(`Tests/${PAGE_NAME.toLowerCase()}test.spec.js`, skeleton);
console.log(`✅ Created Tests/${PAGE_NAME.toLowerCase()}test.spec.js`);