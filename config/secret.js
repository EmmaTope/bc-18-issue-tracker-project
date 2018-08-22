require('dotenv').config();

module.exports = {
  secretKey: process.env.SECRET_KEY,
  url: process.env.SECRET_DB_URL
};

// "rules": {
//   ".read": "auth != null",
//       ".write": "auth != null"
// }
