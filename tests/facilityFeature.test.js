const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(html.includes('cabOptions'), 'Missing cabOptions for destinations');
assert(html.includes('stayOptions'), 'Missing stayOptions for destinations');
assert(html.includes('modalFacilities'), 'Missing modal facilities section');

console.log('Facility feature checks passed');
