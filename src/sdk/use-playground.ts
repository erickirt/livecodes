import { createPlayground } from './index';
// eslint-disable-next-line import/order
import type { EmbedOptions, Playground } from './models';

interface Props extends EmbedOptions {
  className?: string;
  style?: Record<string, string>;
  height?: string;
  sdkReady?: (sdk: Playground) => void;
}

interface Ref<T> {
  current: T;
}

interface Hooks {
  useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  useRef<T>(initial: T): Ref<T>;
}

interface PlaygroundHandle {
  containerRef: Ref<HTMLDivElement | null>;
  className: string;
  style: Record<string, string>;
  height: string | undefined;
}

export function createUsePlayground(hooks: Hooks) {
  const { useEffect, useRef } = hooks;

  return function usePlayground(props: Props): PlaygroundHandle {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const playgroundRef = useRef<Playground | undefined>(undefined);
    const configCacheRef = useRef('');
    const otherOptionsCacheRef = useRef('');
    const generationRef = useRef(0);
    const unmountedRef = useRef(false);

    const className = props.className || '';
    const style = props.style || {};
    const height = props.height && Number(props.height) ? `${props.height}px` : props.height;

    useEffect(() => {
      if (!containerRef.current) return;

      const {
        className: _className,
        style: _style,
        height: _height,
        sdkReady,
        config,
        ...otherOptions
      } = props;

      // avoid race conditions if props change while doing async operations
      // (e.g. creating playground or fetching config json)
      const generation = ++generationRef.current;
      const isStale = () => generationRef.current !== generation || unmountedRef.current;

      const otherOptionsStr = JSON.stringify(otherOptions);

      if (!playgroundRef.current || otherOptionsCacheRef.current !== otherOptionsStr) {
        otherOptionsCacheRef.current = otherOptionsStr;
        configCacheRef.current = JSON.stringify(config);
        playgroundRef.current?.destroy();
        playgroundRef.current = undefined;

        createPlayground(containerRef.current, { config, ...otherOptions }).then((sdk) => {
          if (isStale()) {
            sdk.destroy();
            return;
          }
          playgroundRef.current = sdk;
          if (typeof sdkReady === 'function') {
            sdkReady(sdk);
          }
        });
      } else {
        const configStr = JSON.stringify(config);
        if (configCacheRef.current === configStr) return;
        configCacheRef.current = configStr;

        if (typeof config === 'string') {
          fetch(config)
            .then((res) => res.json())
            .then((json) => {
              if (isStale()) return;
              playgroundRef.current?.setConfig(json);
            });
        } else if (config) {
          playgroundRef.current.setConfig(config);
        }
      }
    }, [props]);

    useEffect(
      () => () => {
        unmountedRef.current = true;
        playgroundRef.current?.destroy();
        playgroundRef.current = undefined;
      },
      [],
    );

    return { containerRef, className, style, height };
  };
}
