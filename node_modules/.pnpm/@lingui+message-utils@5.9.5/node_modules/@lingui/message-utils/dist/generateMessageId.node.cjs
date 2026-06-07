'use strict';

const node_crypto = require('node:crypto');
const constants = require('./shared/message-utils.43a3d79e.cjs');

const generateMessageId = (msg, context = "") => {
  const hash = node_crypto.createHash("sha256").update(msg + constants.UNIT_SEPARATOR + (context || "")).digest("base64");
  return hash.slice(0, 6);
};

exports.generateMessageId = generateMessageId;
