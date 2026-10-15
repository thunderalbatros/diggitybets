import http from 'node:http';

console.log('--- HuntHub Event & Webhook Simulator ---');

const PORT = 3001;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function sendTestWebhook(payload: Record<string, unknown>, eventType: string = 'channel.reward.redemption.updated') {
  const json = JSON.stringify(payload);
  const options = {
    hostname: '127.0.0.1',
    port: PORT,
    path: '/api/webhooks/kick',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(json),
      'x-hunthub-test': 'true', // Bypasses RSA signature check in local dev
      'kick-event-type': eventType,
      'kick-event-message-id': `test_msg_${Date.now()}`,
      'kick-event-message-timestamp': new Date().toISOString(),
      'kick-event-signature': 'mock_signature',
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(json);
    req.end();
  });
}

async function triggerSpin(endpoint: string) {
  return new Promise((resolve, reject) => {
    const req = http.request(`${BASE_URL}${endpoint}`, { method: 'POST' }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function runSimulation() {
  console.log(`Checking connection to HuntHub Core at ${BASE_URL}...`);
  try {
    const statusRes = await fetch(`${BASE_URL}/api/status`);
    const statusData = await statusRes.json();
    console.log('✅ HuntHub Core Status:', statusData);
  } catch (err: any) {
    console.error('❌ Could not connect to HuntHub Core. Is "npm start" running in core/? Error:', err.message);
    process.exit(1);
  }

  // 1. Simulate Channel Points Redemption (5,000 points)
  console.log('\n[Sim 1] Simulating Channel Points Redemption: @VegasWinner claims 5,000 credits...');
  const redemptionPayload = {
    event: 'channel.reward.redemption.updated',
    data: {
      id: `sim_rdm_${Date.now()}`,
      reward_id: 'kick_reward_credits_5k',
      user_id: 99887766,
      user_login: 'vegaswinner',
      user_name: 'VegasWinner',
      status: 'unfulfilled',
    },
  };

  const res1: any = await sendTestWebhook(redemptionPayload);
  console.log('Response:', res1);

  // 2. Query user balance in API
  console.log('\n[Sim 2] Checking User Balance via API (/api/user/vegaswinner)...');
  const userRes = await fetch(`${BASE_URL}/api/user/vegaswinner`);
  const userData = await userRes.json();
  console.log('User Account Data:', userData);

  // 3. Trigger CS:GO Giveaway Wheel Demo Spin
  console.log('\n[Sim 3] Triggering CS:GO Giveaway Wheel Demo Spin (/api/spin?demo=true)...');
  const spinRes: any = await triggerSpin('/api/spin?demo=true');
  console.log('Spin Dispatch Result:', spinRes);

  // 4. Trigger Random Slot Wheel Spin (Hacksaw Gaming)
  console.log('\n[Sim 4] Triggering Slot Wheel Spin (/api/spin-slot?cat=hacksaw&demo=true)...');
  const slotRes: any = await triggerSpin('/api/spin-slot?cat=hacksaw&demo=true');
  console.log('Slot Spin Dispatch Result:', slotRes);

  console.log('\n🎉 Simulation completed successfully!');
}

runSimulation();
