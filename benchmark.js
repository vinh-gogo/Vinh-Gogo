const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.addInitScript(() => {
    window.mousemoveTime = 0;
    window.mousemoveCount = 0;
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = function(type, listener, options) {
      if (type === 'mousemove') {
        const wrappedListener = (e) => {
          const start = performance.now();
          listener(e);
          window.mousemoveTime += (performance.now() - start);
          window.mousemoveCount++;
        };
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  });

  await page.goto('file://' + path.resolve('index.html'));

  // Simulate mouse movements
  const steps = 2000;
  for (let i = 0; i < steps; i++) {
    await page.mouse.move(Math.random() * 800, Math.random() * 600);
  }

  const results = await page.evaluate(() => {
    return {
      totalTimeMs: window.mousemoveTime,
      count: window.mousemoveCount,
      avgTimeMs: window.mousemoveTime / window.mousemoveCount
    };
  });

  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
