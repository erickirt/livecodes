/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { createPlayground } from './index';
// eslint-disable-next-line import/order
import type { EmbedOptions, Playground, TemplateName } from './models';
export type { Code, Config, EmbedOptions, Language, Playground } from './models';

export interface Props extends EmbedOptions {
  height?: string;
  sdk?: Playground;
}

/**
 * A Web Component that renders a LiveCodes playground.
 *
 * Acts as a wrapper for the [LiveCodes JS SDK](https://livecodes.io/docs/sdk/js-ts).
 * @see {@link https://livecodes.io/docs/sdk/web-components}
 *
 * @attr {string} app-url - The URL of the LiveCodes app. Defaults to `https://livecodes.io/`.
 * @attr {string} import - A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).
 * @attr {boolean} headless - Whether to use the headless mode of LiveCodes.
 * @attr {boolean} lite - Deprecated! Use `config.mode = "lite"` instead - Whether to use the lite mode of LiveCodes.
 * @attr {string} loading - When to load the playground.
 * @attr {string} template - A [starter template](https://livecodes.io/docs/features/templates) to load.
 * @attr {string} view - Deprecated! The `view` option has been moved to `config.view`. For headless mode use `headless` attribute - The [default view](https://livecodes.io/docs/features/default-view) for the playground.
 * @attr {string} height - Sets the [height of playground container](https://livecodes.io/docs/sdk/js-ts#height) element.
 * @attr {string} data-default-styles - If set to `"false"`, disables the default styles applied to the playground container element.
 *
 * @prop {object|string} config - The [config object](https://livecodes.io/docs/api/interfaces/Config) for the playground or the URL of the config file.
 * @prop {object} params - An object that represents [URL Query parameters](https://livecodes.io/docs/configuration/query-params).
 * @prop {Playground} sdk - (Read-only) The playground SDK instance, if initialized.
 *
 * @fires sdkready - Fired when the SDK is ready. Access the SDK via `event.detail.sdk`.
 *
 * @example
 * ```html
 * <live-codes template="react"></live-codes>
 *
 * <script type="module">
 *   import 'livecodes/web-components';
 *
 *   const el = document.querySelector('live-codes');
 *   el.config = {
 *     markup: {
 *       language: 'markdown',
 *       content: '# Hello World!',
 *     },
 *   };
 *   el.addEventListener('sdkready', (e) => {
 *     const sdk = e.detail.sdk;
 *     // use sdk ...
 *   });
 * </script>
 * ```
 */
class LiveCodesElement extends HTMLElement {
  private _playground: Playground | undefined;
  private _config: EmbedOptions['config'];
  private _params: EmbedOptions['params'];
  private _configCache = '';
  private _otherOptionsCache = '';
  private _connected = false;
  private _updateScheduled = false;
  private _generation = 0;

  public static get observedAttributes(): string[] {
    return ['app-url', 'import', 'loading', 'template', 'view', 'height', 'headless', 'lite'];
  }

  public connectedCallback(): void {
    this._connected = true;
    this._scheduleUpdate();
    this.style.display = 'block';
  }

  public disconnectedCallback(): void {
    this._connected = false;
    ++this._generation; // invalidate pending async callbacks
    this._playground?.destroy();
    this._playground = undefined;
  }

  public attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (oldValue !== newValue && this._connected) {
      this._scheduleUpdate();
    }
  }

  /** The config object or URL of the config file. */
  public get config(): EmbedOptions['config'] {
    return this._config;
  }

  public set config(value: EmbedOptions['config']) {
    this._config = value;
    if (this._connected) {
      this._scheduleUpdate();
    }
  }

  /** An object that represents URL Query parameters. */
  public get params(): EmbedOptions['params'] {
    return this._params;
  }

  public set params(value: EmbedOptions['params']) {
    this._params = value;
    if (this._connected) {
      this._scheduleUpdate();
    }
  }

  /** The playground SDK instance (read-only). Available after initialization. */
  public get sdk(): Playground | undefined {
    return this._playground;
  }

  /**
   * Destroys the playground instance and cleans up resources.
   */
  public destroy(): void {
    ++this._generation;
    this._playground?.destroy();
    this._playground = undefined;
  }

  private _scheduleUpdate(): void {
    if (this._updateScheduled) return;
    this._updateScheduled = true;
    queueMicrotask(() => {
      this._updateScheduled = false;
      if (this._connected) {
        this._update();
      }
    });
  }

  private _getEmbedOptions(): EmbedOptions {
    const options: EmbedOptions = {};

    const appUrl = this.getAttribute('app-url');
    if (appUrl != null) options.appUrl = appUrl;

    const importAttr = this.getAttribute('import');
    if (importAttr != null) options.import = importAttr;

    const loading = this.getAttribute('loading') as EmbedOptions['loading'];
    if (loading != null) options.loading = loading;

    const template = this.getAttribute('template');
    if (template != null) options.template = template as TemplateName;

    const view = this.getAttribute('view') as EmbedOptions['view'];
    if (view != null) options.view = view;

    if (this.hasAttribute('headless')) options.headless = true;
    if (this.hasAttribute('lite')) options.lite = true;

    if (this._config !== undefined) options.config = this._config;
    if (this._params !== undefined) options.params = this._params;

    return options;
  }

  private _update(): void {
    const { config, ...otherOptions } = this._getEmbedOptions();
    const otherOptionsStr = JSON.stringify(otherOptions);
    const configStr = JSON.stringify(config || '');

    const height = this.getAttribute('height');
    if (height != null) {
      const ht = Number(height) ? `${height}px` : height;
      this.dataset.height = ht;
      this.style.height = ht;
    }

    if (!this._playground || this._otherOptionsCache !== otherOptionsStr) {
      const currentGeneration = ++this._generation;
      this._otherOptionsCache = otherOptionsStr;
      this._configCache = configStr;
      this._playground?.destroy();
      this._playground = undefined;

      createPlayground(this, { config, ...otherOptions }).then((sdk: Playground) => {
        if (this._generation !== currentGeneration) {
          sdk.destroy();
          return;
        }
        this._playground = sdk;

        this.dispatchEvent(
          new CustomEvent('sdkready', {
            detail: { sdk },
            bubbles: true,
            composed: true,
          }),
        );
      });
    } else {
      if (this._configCache === configStr) return;
      this._configCache = configStr;

      if (typeof config === 'string') {
        const gen = this._generation;
        fetch(config)
          .then((res) => res.json())
          .then((json) => {
            if (this._generation !== gen) return;
            this._playground?.setConfig(json);
          });
      } else if (config) {
        this._playground.setConfig(config);
      }
    }
  }
}

if (!customElements.get('live-codes')) {
  customElements.define('live-codes', LiveCodesElement);
}
