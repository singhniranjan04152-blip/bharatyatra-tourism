const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'frontend', 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'frontend', 'css', 'site.css'), 'utf8');
const clientJs = fs.readFileSync(path.join(__dirname, '..', 'frontend', 'js', 'site.js'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(clientJs.includes('cabOptions'), 'Missing cabOptions for destinations');
assert(clientJs.includes('stayOptions'), 'Missing stayOptions for destinations');
assert(html.includes('modalFacilities'), 'Missing modal facilities section');
assert(html.includes('/css/site.css'), 'Missing external main stylesheet');
assert(html.includes('/js/site.js'), 'Missing external main browser script');
assert(!html.includes('<style>') && !html.includes('<script>'), 'Inline CSS or JavaScript remains in the page');
assert(css.includes('.trip-day-card'), 'Missing trip planner styles');
assert(clientJs.includes('buildTripItinerary'), 'Missing trip itinerary logic');

console.log('Facility feature checks passed');
