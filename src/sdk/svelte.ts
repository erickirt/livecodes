import type { EmbedOptions, Playground } from './models';
export { createPlayground } from './index';
export type { EmbedOptions, Playground };
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
