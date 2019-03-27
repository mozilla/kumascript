/**
 * @prettier
 */

/**
 * @param {string} source
 * @param {string|RegExp} pattern
 * @param {function(...any):Promise<string>} asyncReplacer
 * @return {Promise<string>}
 */
async function asyncReplace(source, pattern, asyncReplacer) {
    // Find all the matches, replace with "", and discard the result
    /** @type {Array<[string, ...any[]]>} */
    let matches = [];
    source.replace(pattern, (...match) => {
        matches.push(match);
        return '';
    });

    // Now loop through those matches and create an array of alternating
    // string and Promise<string> elements corresponding to the unreplaced
    // parts of the osurce string and the async replacements for the
    // replaced parts
    let parts = [];
    let lastMatchEnd = 0;
    for (let i = 0; i < matches.length; i++) {
        let match = matches[i];
        let matchIndex = match[match.length - 2];
        // Add any text before the first match to the parts array
        if (matchIndex > lastMatchEnd) {
            parts.push(source.substring(lastMatchEnd, matchIndex));
        }
        lastMatchEnd = matchIndex + match[0].length;

        // Now push a promise on the stack for this match.
        // Note that we don't await it now; we'll do that with
        // Promise.all(). Note that if the replace function isn't
        // actually async and just returns a string, that is okay, too.
        parts.push(asyncReplacer(...match));
    }
    // If there is any non-matched text at the end of the strings, add
    // that to the parts array as well
    if (lastMatchEnd < source.length) {
        parts.push(source.substring(lastMatchEnd));
    }

    // Now wait for all the promises to resolve
    let strings = await Promise.all(parts);

    // Join it all together and return it
    return strings.join('');
}

/**
 * @param {string} str
 * @param {string} sub_str
 * @return {boolean}
 */
function startsWith(str, sub_str) {
    return String(str).startsWith(sub_str);
}

/**
 * @param {string} str
 * @param {string} suffix
 * @return {boolean}
 */
function endsWith(str, suffix) {
    return String(str).endsWith(suffix);
}

/**
 * @param {string} str
 * @param {string} sub_str
 * @return {boolean}
 */
function contains(str, sub_str) {
    return String(str).includes(sub_str);
}

/**
 * @param {string} str
 * @return {any}
 */
function deserialize(str) {
    return JSON.parse(str);
}

/**
 * Check if first character in string is a decimal digit.
 *
 * @param {string} str
 * @return {boolean}
 */
function isDigit(str) {
    return /^\d/.test(str);
}

/**
 * Check if first character in string is an alphabetic character.
 *
 * @param {string} str
 * @return {boolean}
 */
function isLetter(str) {
    return /^[a-zA-Z]/.test(str);
}

/**
 * @param {string} val
 * @return {string}
 */
function serialize(val) {
    return JSON.stringify(val);
}

/**
 * @param {string} str
 * @param {number} start
 * @param {number} [length]
 * @return {string}
 */
function substr(str, start, length) {
    str = String(str);
    if (length) {
        return str.substr(start, length);
    } else {
        return str.substr(start);
    }
}

/**
 * @param {string} str
 * @return {string}
 */
function toLower(str) {
    return String(str).toLowerCase();
}

/**
 * @param {string} str
 * @return {string}
 */
function toUpperFirst(str) {
    str = String(str);
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @param {string} str
 * @return {string}
 */
function trim(str) {
    return String(str).trim();
}

/**
 * @param {string} str
 * @param {number} index
 * @param {number} [count]
 * @return {string}
 */
function remove(str, index, count) {
    str = String(str);
    var out = str.substring(0, Number(index));
    if (count) {
        out += str.substring(Number(index) + Number(count));
    }
    return out;
}

/**
 * @param {string} str
 * @param {string|RegExp} from
 * @param {string} to
 * @return {string}
 */
function replace(str, from, to) {
    return String(str).replace(RegExp(from, 'g'), to);
}

/**
 * @param {any[]} list
 * @param {string} [sep]
 * @return {string}
 */
function join(list, sep) {
    return list.join(sep);
}

/**
 * @param {string} str
 * @return {number}
 */
function length(str) {
    return String(str).length;
}

module.exports = {
    asyncReplace,
    startsWith,
    endsWith,
    contains,
    deserialize,
    isDigit,
    isLetter,
    serialize,
    substr,
    toLower,
    toUpperFirst,
    trim,
    remove,
    replace,
    join,
    length
};
