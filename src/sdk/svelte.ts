import type { EmbedOptions, Playground } from './models';
export { createPlayground } from './index';
export type { Code, Config, EmbedOptions, Language, Playground } from './models';
export interface Props extends EmbedOptions {
  class?: string;
  style?: Record<string, string>;
  height?: string;
  sdkReady?: (sdk: Playground) => void;
}
// @ts-ignore
declare const LiveCodes: import('svelte').Component<Props, {}, ''>;
// eslint-disable-next-line no-redeclare
type LiveCodes = ReturnType<typeof LiveCodes>;
export default LiveCodes;
