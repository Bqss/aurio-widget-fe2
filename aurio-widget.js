/**
 * Aurio Widget Helper Script
 * Provides easy integration for the Aurio consultation widget
 */
class AurioWidget {
  constructor(options = {}) {
    this.options = {
      containerId: 'aurio-widget',
      cssPath: './dist/widget.css',
      jsPath: './dist/widget.js',
      autoInit: true,
      ...options
    };
    
    this.container = null;
    this.cssLoaded = false;
    this.jsLoaded = false;
    this.widgetInstance = null;
    
    if (this.options.autoInit) {
      this.init();
    }
  }
  
  async init() {
    try {
      await this.setupContainer();
      await this.loadCSS();
      await this.loadJS();
      console.log('Aurio Widget initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Aurio Widget:', error);
    }
  }
  
  async setupContainer() {
    return new Promise((resolve, reject) => {
      const container = document.getElementById(this.options.containerId);
      if (!container) {
        reject(new Error(`Container with id '${this.options.containerId}' not found`));
        return;
      }
      
      this.container = container;
      resolve();
    });
  }
  
  async loadCSS() {
    if (this.cssLoaded) return;
    
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.options.cssPath;
      link.onload = () => {
        this.cssLoaded = true;
        resolve();
      };
      link.onerror = () => reject(new Error(`Failed to load CSS: ${this.options.cssPath}`));
      document.head.appendChild(link);
    });
  }
  
  async loadJS() {
    if (this.jsLoaded) return;
    
    try {
      const widgetModule = await import(this.options.jsPath);
      
      if (typeof widgetModule.initAurioWidget === 'function') {
        this.widgetInstance = widgetModule.initAurioWidget(this.container);
        this.jsLoaded = true;
      } else {
        throw new Error('initAurioWidget function not found in widget module');
      }
    } catch (error) {
      throw new Error(`Failed to load or initialize widget: ${error.message}`);
    }
  }
  
  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.widgetInstance = null;
    this.jsLoaded = false;
  }
  
  // Static method for quick initialization
  static init(options = {}) {
    return new AurioWidget(options);
  }
}

// Auto-initialize if container exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('aurio-widget')) {
      window.aurioWidget = AurioWidget.init();
    }
  });
} else {
  if (document.getElementById('aurio-widget')) {
    window.aurioWidget = AurioWidget.init();
  }
}

// Make AurioWidget available globally
window.AurioWidget = AurioWidget;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AurioWidget;
}