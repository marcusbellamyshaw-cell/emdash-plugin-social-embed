'use strict';

const jsSha256 = require('js-sha256');
const constants = require('./shared/message-utils.43a3d79e.cjs');

function generateMessageId(msg, context = "") {
  const hashBytes = jsSha256.sha256.array(msg + constants.UNIT_SEPARATOR + (context || ""));
  return btoa(String.fromCharCode(...hashBytes)).slice(0, 6);
}

exports.generateMessageId = generateMessageId;
