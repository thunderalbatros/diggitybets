import fs from 'fs';
import vm from 'vm';

// Create a DOM-like environment to simulate browser execution of the site scripts
const html = fs.readFileSync('index.html', 'utf8');

console.log('Testing JS execution as loaded by index.html...');

const windowMock = {
  document: {
    addEventListener: (event, cb) => {
      console.log('Registered document listener:', event);
      if (event === 'DOMContentLoaded') {
        setTimeout(cb, 10);
      }
    },
    getElementById: (id) => {
      // Return dummy element if id exists in html
      if (html.includes(`id="${id}"`) || html.includes(`id='${id}'`)) {
        return {
          id,
          style: {},
          classList: { add: () => {}, remove: () => {}, toggle: () => {} },
          addEventListener: () => {},
          setAttribute: () => {},
          getAttribute: () => null,
          appendChild: () => {},
          querySelectorAll: () => [],
          querySelector: () => null,
          innerHTML: '',
          textContent: ''
        };
      }
      return null;
    },
    querySelectorAll: (selector) => {
      console.log('querySelectorAll called with:', selector);
      return [];
    },
    querySelector: (selector) => null,
    createElement: (tag) => ({
      tagName: tag,
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      setAttribute: () => {}
    })
  },
  location: { hash: '#tournament' },
  history: { pushState: () => {} },
  scrollTo: () => {},
  addEventListener: () => {},
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  console: console
};
windowMock.window = windowMock;

const scriptTags = [...html.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/g)].map(m => m[1]);
console.log('Scripts in index.html in order:', scriptTags);

const context = vm.createContext(windowMock);

for (const src of scriptTags) {
  try {
    const cleanPath = src.split('?')[0].replace(/^\//, '');
    const code = fs.readFileSync(cleanPath, 'utf8');
    vm.runInContext(code, context);
    console.log(`[PASS] Loaded ${src}`);
  } catch (err) {
    console.error(`[FAIL] Error loading ${src}:`, err.message);
  }
}
