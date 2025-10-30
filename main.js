// Main application entry point
// This file is loaded with cache busting via index.html

console.log('🚀 Application loaded!');
console.log('📦 Build version:', window.__BUILD || 'unknown');

// Example: Initialize your app
function init() {
  console.log('✨ Initializing application...');

  // Your application code here
  // Example: Update UI, set up event listeners, etc.
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for other modules if needed
export { init };
