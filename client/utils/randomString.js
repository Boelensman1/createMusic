/* eslint prefer-spread: 0 */

// See http://stackoverflow.com/questions/134940j

/**
 * Generate a short random string of lower/upper case letters and numbers.
 *
 * @param {number} len - Length if string to generate
 * @returns {string} Random string, length len.
 */
module.exports = (len) => Math.random().toString(36).substring(7);
