// types that should not be exported from the SDK

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
