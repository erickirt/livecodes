/**
 * This module contains internal functions and types used by the LiveCodes SDK.
 * These are not part of the public API and should not be exported from SDK modules.
 *
 * @module
 */

/**
 * Custom events emitted by LiveCodes playground.
 */
export interface CustomEvents {
  init: 'livecodes-init';
  /** @deprecated config is sent in hash params */
  getConfig: 'livecodes-get-config';
  /** @deprecated config is sent in hash params */
  config: 'livecodes-config';
  load: 'livecodes-load';
  appLoaded: 'livecodes-app-loaded';
  ready: 'livecodes-ready';
  change: 'livecodes-change';
  testResults: 'livecodes-test-results';
  console: 'livecodes-console';
  destroy: 'livecodes-destroy';
  resizeEditor: 'livecodes-resize-editor';
  apiResponse: 'livecodes-api-response';
  i18n: 'livecodes-i18n';
}

// https://blog.codepen.io/2025/10/20/google-chrome-iframe-allow-permissions-problems/
// https://blog.codepen.io/2025/11/18/417-iframe-allow-attribute-saga/
const allowAttributes: Record<'chrome' | 'firefox' | 'default', string[]> = {
  chrome: [
    'accelerometer',
    'bluetooth',
    'camera',
    'clipboard-read',
    'clipboard-write',
    'display-capture',
    'encrypted-media',
    'geolocation',
    'gyroscope',
    'language-detector',
    'language-model',
    'local-network-access',
    'microphone',
    'midi',
    'proofreader',
    'rewriter',
    'serial',
    'summarizer',
    'translator',
    'web-share',
    'writer',
    'window-placement',
    'xr-spatial-tracking',
  ],
  firefox: ['camera', 'display-capture', 'geolocation', 'microphone', 'web-share'],
  default: [
    'accelerometer',
    'ambient-light-sensor',
    'camera',
    'display-capture',
    'encrypted-media',
    'geolocation',
    'gyroscope',
    'microphone',
    'midi',
    'payment',
    'serial',
    'vr',
    'web-share',
    'xr-spatial-tracking',
  ],
};

/**
 * Detects the current browser type.
 *
 * @returns 'chrome', 'firefox', or 'default' based on user agent detection
 */
export const detectBrowser = (): 'chrome' | 'firefox' | 'default' => {
  if (typeof navigator === 'undefined') return 'default';
  const ua = navigator.userAgent;
  if (/Firefox\//i.test(ua)) return 'firefox';
  if (/Chrome\//i.test(ua)) return 'chrome';
  return 'default';
};

/**
 * Generates the iframe allow attribute value based on detected browser capabilities.
 *
 * @returns A semicolon-separated string of allowed features for the iframe
 */
export const getIframeAllowAttribute = (): string =>
  allowAttributes[detectBrowser()]
    .filter((feature) => {
      const supportedFeatures = (globalThis.document as any)?.featurePolicy?.features?.();
      if (!supportedFeatures) return true;
      return supportedFeatures.includes(feature);
    })
    .join('; ');
