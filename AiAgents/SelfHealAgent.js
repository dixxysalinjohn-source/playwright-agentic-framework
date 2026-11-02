const fs = require('fs');
const { execSync } = require('child_process');
const { FrameworkAgent } = require('./FrameworkAgent');

class SelfHealAgent {
  constructor() {
    this.agent = new FrameworkAgent();
  }

  // Run test and heal if fails
  async runAndHeal(testFile) {
    console.log(`[HEAL AGENT] Running ${testFile}`);
    try {
      execSync(`npx playwright test ${testFile} --headed`, { stdio: 'inherit' });
      console.log('✅ Test Passed - No healing needed');
    } catch (error) {
      console.log('❌ Test Failed - Starting Self Healing...');
      
      const errorLog = error.message;
      // Extract failed locator from error
      const failedLocatorMatch = errorLog.match(/locator\('([^']+)'\)|getBy.*\(.*\)/);
      const failedLocator = failedLocatorMatch ? failedLocatorMatch[0] : 'unknown locator';
      
      const suggestion = await this.agent.healTest(failedLocator, errorLog.slice(0, 500));
      console.log(suggestion);

      // Auto-fix logic - try 3 strategies
      this.healFile('Pages/loginpage_ai_generated.js', failedLocator);
      
      console.log('Retrying test after heal...');
      execSync(`npx playwright test ${testFile} --headed`, { stdio: 'inherit' });
    }
  }

  healFile(filePath, failedLocator) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    // Strategy 1: If id failed, try placeholder
    content = content.replace(`page.locator('${failedLocator}')`, `page.getByPlaceholder('${failedLocator}')`);
    // Strategy 2: If placeholder failed, try Role
    content = content.replace(`getByPlaceholder('${failedLocator}')`, `getByRole('button', {name: '${failedLocator}'})`);
    
    fs.writeFileSync(filePath, content);
    console.log(`[HEAL] Updated ${filePath}`);
  }
}

// HOW TO USE:
// For any test file:
new SelfHealAgent().runAndHeal('Tests/logintest.spec.js');

module.exports = { SelfHealAgent };