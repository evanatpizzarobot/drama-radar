// Generate VAPID keys for Web Push notifications
// Run: node scripts/generate-vapid-keys.js
// Then add the keys as secrets via wrangler

const webpush = require("web-push");
const keys = webpush.generateVAPIDKeys();

console.log("VAPID Keys Generated");
console.log("====================");
console.log("");
console.log("Public Key (add to frontend constant + worker secret):");
console.log(keys.publicKey);
console.log("");
console.log("Private Key (worker secret only):");
console.log(keys.privateKey);
console.log("");
console.log("Run these commands:");
console.log(`  npx wrangler secret put VAPID_PUBLIC_KEY`);
console.log(`  (paste: ${keys.publicKey})`);
console.log("");
console.log(`  npx wrangler secret put VAPID_PRIVATE_KEY`);
console.log(`  (paste: ${keys.privateKey})`);
console.log("");
console.log(`  npx wrangler secret put VAPID_SUBJECT`);
console.log(`  (paste: mailto:contact@dramaradar.com)`);
