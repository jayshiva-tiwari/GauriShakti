const fs = require('fs');
const path = require('path');
const routes = [
  'about', 'mission', 'vision', 'careers',
  'products', 'products/dairy-feed', 'products/calf-feed', 'products/mineral-mixture', 'products/supplements',
  'faq', 'contact', 'dealers', 'shipping', 'privacy-policy', 'terms-and-conditions', 'testimonials', 'login'
];
for(const route of routes) {
  const dir = path.join('d:\\pankaj-sir\\src\\app', route);
  fs.mkdirSync(dir, { recursive: true });
  let compName = route.split('/').pop().replace(/-./g, x=>x[1].toUpperCase());
  if(!compName) compName = 'Page';
  const cap = compName.charAt(0).toUpperCase() + compName.slice(1);
  fs.writeFileSync(path.join(dir, 'page.tsx'), `export default function ${cap}() { return <div style={{padding: "100px 5%"}}>${cap} Page</div>; }\n`);
}
