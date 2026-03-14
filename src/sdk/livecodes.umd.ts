import * as livecodes from './index';
// eslint-disable-next-line import/order
import type { Config, EmbedOptions } from './models';

declare const globalThis: typeof window & {
  livecodes?: typeof livecodes;
};

globalThis.livecodes = Object.assign(globalThis.livecodes || {}, livecodes);

if (
  globalThis.document && // to escape SSG in docusaurus
  document.currentScript &&
  'prefill' in document.currentScript?.dataset
) {
  window.addEventListener('load', () => {
    document.querySelectorAll<HTMLElement>('.livecodes').forEach((codeblock) => {
      let options: EmbedOptions | undefined;
      const optionsStr = codeblock.dataset.options;
      if (optionsStr) {
        try {
          options = JSON.parse(optionsStr);
        } catch {
          //
        }
      }
      let config: Config | undefined;
      const configStr = codeblock.dataset.config || codeblock.dataset.prefill;
      if (configStr) {
        try {
          config = JSON.parse(configStr);
        } catch {
          //
        }
      }
      const dom = encodeURIComponent(codeblock.outerHTML);
      codeblock.innerHTML = '';
      livecodes.createPlayground(codeblock, {
        import: 'dom/' + dom,
        ...options,
        ...(config ? { config } : {}),
      });
    });
  });
}
