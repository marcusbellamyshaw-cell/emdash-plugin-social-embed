import { sha256 } from 'js-sha256';
import { U as UNIT_SEPARATOR } from './shared/message-utils.0012eec6.mjs';

function generateMessageId(msg, context = "") {
  const hashBytes = sha256.array(msg + UNIT_SEPARATOR + (context || ""));
  return btoa(String.fromCharCode(...hashBytes)).slice(0, 6);
}

export { generateMessageId };
