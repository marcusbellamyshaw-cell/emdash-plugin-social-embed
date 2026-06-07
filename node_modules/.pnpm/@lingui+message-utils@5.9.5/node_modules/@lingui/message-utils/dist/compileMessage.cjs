'use strict';

const parser = require('@messageformat/parser');

/**
 * Parent class for errors.
 *
 * @remarks
 * Errors with `type: "warning"` do not necessarily indicate that the parser
 * encountered an error. In addition to a human-friendly `message`, may also
 * includes the `token` at which the error was encountered.
 *
 * @public
 */
class DateFormatError extends Error {
    /** @internal */
    constructor(msg, token, type) {
        super(msg);
        this.token = token;
        this.type = type || 'error';
    }
}
const alpha = (width) => width < 4 ? 'short' : width === 4 ? 'long' : 'narrow';
const numeric = (width) => (width % 2 === 0 ? '2-digit' : 'numeric');
function yearOptions(token, onError) {
    switch (token.char) {
        case 'y':
            return { year: numeric(token.width) };
        case 'r':
            return { calendar: 'gregory', year: 'numeric' };
        case 'u':
        case 'U':
        case 'Y':
        default:
            onError(`${token.desc} is not supported; falling back to year:numeric`, DateFormatError.WARNING);
            return { year: 'numeric' };
    }
}
function monthStyle(token, onError) {
    switch (token.width) {
        case 1:
            return 'numeric';
        case 2:
            return '2-digit';
        case 3:
            return 'short';
        case 4:
            return 'long';
        case 5:
            return 'narrow';
        default:
            onError(`${token.desc} is not supported with width ${token.width}`);
            return undefined;
    }
}
function dayStyle(token, onError) {
    const { char, desc, width } = token;
    if (char === 'd') {
        return numeric(width);
    }
    else {
        onError(`${desc} is not supported`);
        return undefined;
    }
}
function weekdayStyle(token, onError) {
    const { char, desc, width } = token;
    if ((char === 'c' || char === 'e') && width < 3) {
        // ignoring stand-alone-ness
        const msg = `Numeric value is not supported for ${desc}; falling back to weekday:short`;
        onError(msg, DateFormatError.WARNING);
    }
    // merging narrow styles
    return alpha(width);
}
function hourOptions(token) {
    const hour = numeric(token.width);
    let hourCycle;
    switch (token.char) {
        case 'h':
            hourCycle = 'h12';
            break;
        case 'H':
            hourCycle = 'h23';
            break;
        case 'k':
            hourCycle = 'h24';
            break;
        case 'K':
            hourCycle = 'h11';
            break;
    }
    return hourCycle ? { hour, hourCycle } : { hour };
}
function timeZoneNameStyle(token, onError) {
    // so much fallback behaviour here
    const { char, desc, width } = token;
    switch (char) {
        case 'v':
        case 'z':
            return width === 4 ? 'long' : 'short';
        case 'V':
            if (width === 4)
                return 'long';
            onError(`${desc} is not supported with width ${width}`);
            return undefined;
        case 'X':
            onError(`${desc} is not supported`);
            return undefined;
    }
    return 'short';
}
function compileOptions(token, onError) {
    switch (token.field) {
        case 'era':
            return { era: alpha(token.width) };
        case 'year':
            return yearOptions(token, onError);
        case 'month':
            return { month: monthStyle(token, onError) };
        case 'day':
            return { day: dayStyle(token, onError) };
        case 'weekday':
            return { weekday: weekdayStyle(token, onError) };
        case 'period':
            return undefined;
        case 'hour':
            return hourOptions(token);
        case 'min':
            return { minute: numeric(token.width) };
        case 'sec':
            return { second: numeric(token.width) };
        case 'tz':
            return { timeZoneName: timeZoneNameStyle(token, onError) };
        case 'quarter':
        case 'week':
        case 'sec-frac':
        case 'ms':
            onError(`${token.desc} is not supported`);
    }
    return undefined;
}
function getDateFormatOptions(tokens, timeZone, onError = error => {
    throw error;
}) {
    const options = {
        timeZone
    };
    const fields = [];
    for (const token of tokens) {
        const { error, field, str } = token;
        if (error) {
            const dte = new DateFormatError(error.message, token);
            dte.stack = error.stack;
            onError(dte);
        }
        if (str) {
            const msg = `Ignoring string part: ${str}`;
            onError(new DateFormatError(msg, token, DateFormatError.WARNING));
        }
        if (field) {
            if (fields.indexOf(field) === -1)
                fields.push(field);
            else
                onError(new DateFormatError(`Duplicate ${field} token`, token));
        }
        const opt = compileOptions(token, (msg, isWarning) => onError(new DateFormatError(msg, token, isWarning)));
        if (opt)
            Object.assign(options, opt);
    }
    return options;
}

const fields = {
    G: { field: 'era', desc: 'Era' },
    y: { field: 'year', desc: 'Year' },
    Y: { field: 'year', desc: 'Year of "Week of Year"' },
    u: { field: 'year', desc: 'Extended year' },
    U: { field: 'year', desc: 'Cyclic year name' },
    r: { field: 'year', desc: 'Related Gregorian year' },
    Q: { field: 'quarter', desc: 'Quarter' },
    q: { field: 'quarter', desc: 'Stand-alone quarter' },
    M: { field: 'month', desc: 'Month in year' },
    L: { field: 'month', desc: 'Stand-alone month in year' },
    w: { field: 'week', desc: 'Week of year' },
    W: { field: 'week', desc: 'Week of month' },
    d: { field: 'day', desc: 'Day in month' },
    D: { field: 'day', desc: 'Day of year' },
    F: { field: 'day', desc: 'Day of week in month' },
    g: { field: 'day', desc: 'Modified julian day' },
    E: { field: 'weekday', desc: 'Day of week' },
    e: { field: 'weekday', desc: 'Local day of week' },
    c: { field: 'weekday', desc: 'Stand-alone local day of week' },
    a: { field: 'period', desc: 'AM/PM marker' },
    b: { field: 'period', desc: 'AM/PM/noon/midnight marker' },
    B: { field: 'period', desc: 'Flexible day period' },
    h: { field: 'hour', desc: 'Hour in AM/PM (1~12)' },
    H: { field: 'hour', desc: 'Hour in day (0~23)' },
    k: { field: 'hour', desc: 'Hour in day (1~24)' },
    K: { field: 'hour', desc: 'Hour in AM/PM (0~11)' },
    j: { field: 'hour', desc: 'Hour in preferred cycle' },
    J: { field: 'hour', desc: 'Hour in preferred cycle without marker' },
    C: { field: 'hour', desc: 'Hour in preferred cycle with flexible marker' },
    m: { field: 'min', desc: 'Minute in hour' },
    s: { field: 'sec', desc: 'Second in minute' },
    S: { field: 'sec-frac', desc: 'Fractional second' },
    A: { field: 'ms', desc: 'Milliseconds in day' },
    z: { field: 'tz', desc: 'Time Zone: specific non-location' },
    Z: { field: 'tz', desc: 'Time Zone' },
    O: { field: 'tz', desc: 'Time Zone: localized' },
    v: { field: 'tz', desc: 'Time Zone: generic non-location' },
    V: { field: 'tz', desc: 'Time Zone: ID' },
    X: { field: 'tz', desc: 'Time Zone: ISO8601 with Z' },
    x: { field: 'tz', desc: 'Time Zone: ISO8601' }
};
const isLetter = (char) => (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
function readFieldToken(src, pos) {
    const char = src[pos];
    let width = 1;
    while (src[++pos] === char)
        ++width;
    const field = fields[char];
    if (!field) {
        const msg = `The letter ${char} is not a valid field identifier`;
        return { char, error: new Error(msg), width };
    }
    return { char, field: field.field, desc: field.desc, width };
}
function readQuotedToken(src, pos) {
    let str = src[++pos];
    let width = 2;
    if (str === "'")
        return { char: "'", str, width };
    while (true) {
        const next = src[++pos];
        ++width;
        if (next === undefined) {
            const msg = `Unterminated quoted literal in pattern: ${str || src}`;
            return { char: "'", error: new Error(msg), str, width };
        }
        else if (next === "'") {
            if (src[++pos] !== "'")
                return { char: "'", str, width };
            else
                ++width;
        }
        str += next;
    }
}
function readToken(src, pos) {
    const char = src[pos];
    if (!char)
        return null;
    if (isLetter(char))
        return readFieldToken(src, pos);
    if (char === "'")
        return readQuotedToken(src, pos);
    let str = char;
    let width = 1;
    while (true) {
        const next = src[++pos];
        if (!next || isLetter(next) || next === "'")
            return { char, str, width };
        str += next;
        width += 1;
    }
}
/**
 * Parse an {@link http://userguide.icu-project.org/formatparse/datetime | ICU
 * DateFormat skeleton} string into a {@link DateToken} array.
 *
 * @remarks
 * Errors will not be thrown, but if encountered are included as the relevant
 * token's `error` value.
 *
 * @public
 * @param src - The skeleton string
 *
 * @example
 * ```js
 * import { parseDateTokens } from '@messageformat/date-skeleton'
 *
 * parseDateTokens('GrMMMdd', console.error)
 * // [
 * //   { char: 'G', field: 'era', desc: 'Era', width: 1 },
 * //   { char: 'r', field: 'year', desc: 'Related Gregorian year', width: 1 },
 * //   { char: 'M', field: 'month', desc: 'Month in year', width: 3 },
 * //   { char: 'd', field: 'day', desc: 'Day in month', width: 2 }
 * // ]
 * ```
 */
function parseDateTokens(src) {
    const tokens = [];
    let pos = 0;
    while (true) {
        const token = readToken(src, pos);
        if (!token)
            return tokens;
        tokens.push(token);
        pos += token.width;
    }
}

function processTokens(tokens, mapText) {
  if (!tokens.filter((token) => token.type !== "content").length) {
    return tokens.map((token) => mapText(token.value));
  }
  return tokens.map((token) => {
    if (token.type === "content") {
      return mapText(token.value);
    } else if (token.type === "octothorpe") {
      return "#";
    } else if (token.type === "argument") {
      return [token.arg];
    } else if (token.type === "function") {
      const _param = token?.param?.[0];
      if (token.key === "date" && _param) {
        const opts = compileDateExpression(_param.value.trim(), (e) => {
          throw new Error(`Unable to compile date expression: ${e.message}`);
        });
        return [token.arg, token.key, opts];
      }
      if (_param) {
        return [token.arg, token.key, _param.value.trim()];
      } else {
        return [token.arg, token.key];
      }
    }
    const offset = token.pluralOffset;
    const formatProps = {};
    token.cases.forEach(({ key, tokens: tokens2 }) => {
      const prop = key[0] === "=" ? key.slice(1) : key;
      formatProps[prop] = processTokens(tokens2, mapText);
    });
    return [
      token.arg,
      token.type,
      {
        offset,
        ...formatProps
      }
    ];
  });
}
function compileDateExpression(format, onError) {
  if (/^::/.test(format)) {
    const tokens = parseDateTokens(format.substring(2));
    return getDateFormatOptions(tokens, void 0, onError);
  }
  return format;
}
function compileMessageOrThrow(message, mapText = (v) => v) {
  return processTokens(parser.parse(message), mapText);
}
function compileMessage(message, mapText = (v) => v) {
  try {
    return compileMessageOrThrow(message, mapText);
  } catch (e) {
    console.error(`${e.message} 

Message: ${message}`);
    return [message];
  }
}

exports.compileMessage = compileMessage;
exports.compileMessageOrThrow = compileMessageOrThrow;
