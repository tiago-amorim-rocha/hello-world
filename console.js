// Simple in-page console for debugging
// Captures console.log, console.warn, console.error and displays in UI

let isOpen = false;
const messages = [];
const MAX_MESSAGES = 100;

// Store original console methods
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

function init() {
  const toggle = document.getElementById('console-toggle');
  const panel = document.getElementById('console-panel');
  const output = document.getElementById('console-output');
  const clear = document.getElementById('console-clear');

  // Toggle console visibility
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    panel.style.display = isOpen ? 'flex' : 'none';
    toggle.textContent = isOpen ? '✕' : '🐛';
  });

  // Clear console
  clear.addEventListener('click', () => {
    messages.length = 0;
    output.innerHTML = '';
  });

  // Intercept console methods
  console.log = (...args) => {
    originalLog(...args);
    addMessage('log', args);
  };

  console.warn = (...args) => {
    originalWarn(...args);
    addMessage('warn', args);
  };

  console.error = (...args) => {
    originalError(...args);
    addMessage('error', args);
  };

  function addMessage(type, args) {
    const text = args.map(arg =>
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ');

    messages.push({ type, text, time: new Date().toLocaleTimeString() });

    // Limit message history
    if (messages.length > MAX_MESSAGES) {
      messages.shift();
    }

    // Update UI if console is open
    if (isOpen) {
      renderMessages();
    }
  }

  function renderMessages() {
    output.innerHTML = messages.map(msg =>
      `<div class="console-message console-${msg.type}">
        <span class="console-time">[${msg.time}]</span>
        <span class="console-text">${escapeHtml(msg.text)}</span>
      </div>`
    ).join('');

    // Auto-scroll to bottom
    output.scrollTop = output.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export { init };
