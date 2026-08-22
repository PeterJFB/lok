import { execSync } from 'child_process';

async function globalTeardown() {
  console.log('⏳ Preparing test database...');

  execSync('rm tests.db');
}

export default globalTeardown;
