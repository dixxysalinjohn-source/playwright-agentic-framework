const { FrameworkAgent } = require('./FrameworkAgent');
const fs = require('fs');
const path = require('path');

const PAGE_NAME = process.argv[2] || 'LoginPage';
const SITE_URL = process.argv[3] || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

const agent = new FrameworkAgent();
const prompt = agent.generatePrompt(SITE_URL, PAGE_NAME);

console.log(`=== FOR ${PAGE_NAME} at ${SITE_URL} ===`);
console.log(prompt);

const skeleton = `const { BasePage } = require('./BasePage');
class ${PAGE_NAME} extends BasePage {
  constructor(page) {
    super(page);
    this.pageUrl = '${SITE_URL}';
    // TODO: Add locators for ${SITE_URL}
  }
  async goto() { 
    await this.page.goto(this.pageUrl); 
  }
}
module.exports = { ${PAGE_NAME} };
`;

const outputPath = path.join(__dirname, '..', 'Pages', `${PAGE_NAME.toLowerCase()}_ai_generated.js`);
fs.writeFileSync(outputPath, skeleton);
console.log(`✅ Created ${outputPath}`);