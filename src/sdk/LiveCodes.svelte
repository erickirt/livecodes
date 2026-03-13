<script lang="ts">
  import { createPlayground, type EmbedOptions, type Playground, type Props } from './svelte.js';

  let {
    class: className = '',
    style = {},
    height = undefined,
    sdkReady = undefined,
    config = undefined,
    appUrl = undefined,
    import: importUrl = undefined,
    headless = undefined,
    lite = undefined,
    loading = undefined,
    params = undefined,
    template = undefined,
    view = undefined,
  }: Props = $props();

  let container: HTMLDivElement;

  // Internal mutable state — intentionally plain variables (not $state)
  // so they don't create reactive dependencies inside the effect.
  // We only want the effect to re-run when *props* change.
  let playground: Playground | undefined;
  let configCache = '';
  let otherOptionsCache = '';

  function buildOtherOptions(): Omit<EmbedOptions, 'config'> {
    const opts: Record<string, unknown> = {};
    if (appUrl !== undefined) opts.appUrl = appUrl;
    if (importUrl !== undefined) opts.import = importUrl;
    if (headless !== undefined) opts.headless = headless;
    if (lite !== undefined) opts.lite = lite;
    if (loading !== undefined) opts.loading = loading;
    if (params !== undefined) opts.params = params;
    if (template !== undefined) opts.template = template;
    if (view !== undefined) opts.view = view;
    return opts as Omit<EmbedOptions, 'config'>;
  }

  function styleToString(obj: Record<string, string>): string {
    return Object.entries(obj)
      .map(([key, val]) => {
        const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${kebab}: ${val}`;
      })
      .join('; ');
  }

  let styleString = $derived(styleToString(style));

  $effect(() => {
    if (!container) return;

    const currentConfig = config;
    const currentSdkReady = sdkReady;
    const otherOptions = buildOtherOptions();
    const otherOptionsStr = JSON.stringify(otherOptions);
    const configStr = JSON.stringify(currentConfig || '');

    if (!playground || otherOptionsCache !== otherOptionsStr) {
      otherOptionsCache = otherOptionsStr;
      playground?.destroy();
      createPlayground(container, { config: currentConfig, ...otherOptions }).then((sdk) => {
        playground = sdk;
        if (typeof currentSdkReady === 'function') {
          currentSdkReady(sdk);
        }
      });
    } else {
      if (configCache === configStr) return;
      configCache = configStr;

      if (typeof currentConfig === 'string') {
        fetch(currentConfig)
          .then((res) => res.json())
          .then((json: Parameters<Playground['setConfig']>[0]) => {
            playground?.setConfig(json);
          });
      } else if (currentConfig) {
        playground.setConfig(currentConfig);
      }
    }
  });

  // Destroy the playground on component teardown.
  // No reactive dependencies are read in the body, so this
  // runs once on mount and its cleanup runs only on unmount.
  $effect(() => {
    return () => {
      playground?.destroy();
    };
  });
</script>

<div bind:this={container} class={className} style={styleString} data-height={height}></div>
