import { createHash } from 'node:crypto';
import { U as UNIT_SEPARATOR } from './shared/message-utils.0012eec6.mjs';

const generateMessageId = (msg, context = "") => {
  const hash = createHash("sha256").update(msg + UNIT_SEPARATOR + (context || "")).digest("base64");
  return hash.slice(0, 6);
};

export { generateMessageId };
