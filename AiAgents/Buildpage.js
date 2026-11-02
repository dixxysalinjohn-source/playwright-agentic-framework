const { FrameworkAgent } = require('./FrameworkAgent');
const fs = require('fs');

// CHANGE THIS URL TO ANY SITE YOU WANT
const SITE_URL = 'https://opensource-demo.orangehrmlive.com';
const PAGE_NAME = 'LoginPage';

const agent = new FrameworkAgent();

// This generates the prompt that you give to Copilot Chat
const prompt = agent.generatePrompt(SITE_URL);

console.log('=== COPY THIS PROMPT TO COPILOT CHAT ===');
console.log(prompt);
console.log('\n=== INSTRUCTIONS ===');
console.log(`1. Open Copilot Chat in VS Code (Ctrl + I)`);
console.log(`2. Type: @workspace ${prompt}`);
console.log(`3. Tell it: Create pages/${PAGE_NAME.toLowerCase()}.js using BasePage`);
console.log(`4. Copilot will generate the file - Accept it`);

// Also auto-create a skeleton file
const skeleton = `
const { BasePage } = require('./basePage');
class ${PAGE_NAME} extends BasePage {
    constructor(page) {
        super(page);
        // AI will fill these locators after analyzing ${SITE_URL}
        // this.username = page.getByPlaceholder('Username');
    }
    async login(user, pass) {
        // AI will fill steps
    }
}
module.exports = { ${PAGE_NAME} };
`;

fs.writeFileSync(`../pages/${PAGE_NAME.toLowerCase()}_ai_generated.js`, skeleton);
console.log(`\nSkeleton created: pages/${PAGE_NAME.toLowerCase()}_ai_generated.js`);