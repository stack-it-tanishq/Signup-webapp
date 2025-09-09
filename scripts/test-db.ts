import { pgStorage } from '../server/pg-storage';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

async function testDatabaseOperations() {
  try {
    console.log('Starting database operations test...');
    
    // 1. Test inserting a new subscriber
    console.log('\n1. Testing insertSubscriber...');
    const testEmail = `test-${Date.now()}@example.com`;
    const testName = 'Test User';
    
    const newSubscriber = await pgStorage.insertSubscriber(testEmail, testName);
    console.log('New subscriber created:', {
      id: newSubscriber.id,
      email: newSubscriber.email,
      name: newSubscriber.name,
      status: newSubscriber.status,
      hasToken: !!newSubscriber.verificationToken,
      verifiedAt: newSubscriber.verifiedAt
    });

    // 2. Test finding by token
    console.log('\n2. Testing findByToken...');
    const foundByToken = await pgStorage.findByToken(newSubscriber.verificationToken!);
    console.log('Found by token:', {
      found: !!foundByToken,
      email: foundByToken?.email,
      status: foundByToken?.status
    });

    // 3. Test verifying the subscriber
    console.log('\n3. Testing verifySubscriber...');
    const verifiedSubscriber = await pgStorage.verifySubscriber(newSubscriber.verificationToken!);
    console.log('Subscriber verified:', {
      success: !!verifiedSubscriber,
      status: verifiedSubscriber?.status,
      verifiedAt: verifiedSubscriber?.verifiedAt
    });

    // 4. Verify the subscriber is now verified
    console.log('\n4. Verifying subscriber status after verification...');
    const verifiedCheck = await pgStorage.findByToken(newSubscriber.verificationToken!);
    console.log('Subscriber after verification check:', {
      found: !!verifiedCheck,
      shouldBeNull: verifiedCheck === undefined
    });

    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

testDatabaseOperations();
