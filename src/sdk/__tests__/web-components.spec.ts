import type { Playground } from '../models';

// ---------------------------------------------------------------------------
// Mock createPlayground
// ---------------------------------------------------------------------------

const mockDestroy = jest.fn(() => Promise.resolve());
const mockSetConfig = jest.fn(() => Promise.resolve());

function createMockSdk(): Playground {
  return {
    load: jest.fn(),
    run: jest.fn(),
    format: jest.fn(),
    getShareUrl: jest.fn(),
    getConfig: jest.fn(),
    setConfig: mockSetConfig,
    getCode: jest.fn(),
    show: jest.fn(),
    runTests: jest.fn(),
    onChange: jest.fn(),
    watch: jest.fn(),
    exec: jest.fn(),
    destroy: mockDestroy,
  } as unknown as Playground;
}

let mockSdk: Playground;
let createPlaygroundMock: jest.Mock;

jest.mock('../index', () => ({
  createPlayground: (...args: any[]) => createPlaygroundMock(...args),
}));

// Import web-components AFTER the mock is in place.
// This triggers `customElements.define('live-codes', ...)`.
beforeAll(async () => {
  await import('../web-components');
});

beforeEach(() => {
  mockSdk = createMockSdk();
  createPlaygroundMock = jest.fn().mockResolvedValue(mockSdk);
  mockDestroy.mockClear();
  mockSetConfig.mockClear();
});

afterEach(() => {
  document.body.innerHTML = '';
});

function flushMicrotasks() {
  return new Promise<void>((r) => setTimeout(r, 50));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('<live-codes> – registration', () => {
  test('is registered as a custom element', () => {
    expect(customElements.get('live-codes')).toBeTruthy();
  });

  test('creates an instance via document.createElement', () => {
    const el = document.createElement('live-codes');
    expect(el).toBeInstanceOf(HTMLElement);
  });
});

describe('<live-codes> – lifecycle', () => {
  test('calls createPlayground when connected to DOM', async () => {
    const el = document.createElement('live-codes');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    // First arg is the element itself (used as container)
    expect(createPlaygroundMock.mock.calls[0][0]).toBe(el);
  });

  test('sets display:block when connected', () => {
    const el = document.createElement('live-codes');
    document.body.appendChild(el);

    expect(el.style.display).toBe('block');
  });

  test('destroys playground when disconnected', async () => {
    const el = document.createElement('live-codes');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    el.remove();
    expect(mockDestroy).toHaveBeenCalled();
  });

  test('does not call createPlayground before connecting', async () => {
    document.createElement('live-codes');
    await flushMicrotasks();

    expect(createPlaygroundMock).not.toHaveBeenCalled();
  });
});

describe('<live-codes> – attributes', () => {
  test('maps template attribute to EmbedOptions', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('template', 'react');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.template).toBe('react');
  });

  test('maps app-url attribute to appUrl option', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('app-url', 'https://example.com');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.appUrl).toBe('https://example.com');
  });

  test('maps import attribute to import option', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('import', 'https://gist.github.com/abc');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.import).toBe('https://gist.github.com/abc');
  });

  test('maps loading attribute to loading option', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('loading', 'eager');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.loading).toBe('eager');
  });

  test('headless attribute sets headless to true', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('headless', '');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.headless).toBe(true);
  });

  test('lite attribute sets lite to true', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('lite', '');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.lite).toBe(true);
  });

  test('height attribute sets element height and data-height', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('height', '500');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(el.style.height).toBe('500px');
    expect(el.dataset.height).toBe('500px');
  });

  test('non-numeric height is applied as-is', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('height', '50vh');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(el.style.height).toBe('50vh');
    expect(el.dataset.height).toBe('50vh');
  });
});

describe('<live-codes> – attribute changes', () => {
  test('changing template recreates playground', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('template', 'react');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    el.setAttribute('template', 'vue');
    await flushMicrotasks();

    expect(mockDestroy).toHaveBeenCalled();
    expect(createPlaygroundMock).toHaveBeenCalledTimes(2);
    expect(createPlaygroundMock.mock.calls[1][1].template).toBe('vue');
  });

  test('setting same attribute value does not trigger update', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('template', 'react');
    document.body.appendChild(el);
    await flushMicrotasks();

    createPlaygroundMock.mockClear();
    el.setAttribute('template', 'react');
    await flushMicrotasks();

    expect(createPlaygroundMock).not.toHaveBeenCalled();
  });

  test('multiple attribute changes in same tick are batched', async () => {
    const el = document.createElement('live-codes');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    createPlaygroundMock.mockClear();
    mockDestroy.mockClear();

    // Change multiple attributes synchronously
    el.setAttribute('template', 'vue');
    el.setAttribute('loading', 'eager');
    await flushMicrotasks();

    // Should only have created one new playground (batched)
    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.template).toBe('vue');
    expect(options.loading).toBe('eager');
  });
});

describe('<live-codes> – properties', () => {
  test('config property triggers update', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    el.config = { title: 'new config' };
    await flushMicrotasks();

    // Config-only change should call setConfig, not recreate
    expect(mockSetConfig).toHaveBeenCalledWith({ title: 'new config' });
  });

  test('config property getter returns the set value', () => {
    const el = document.createElement('live-codes') as any;
    const config = { title: 'test' };
    el.config = config;
    expect(el.config).toBe(config);
  });

  test('params property triggers update', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    mockDestroy.mockClear();

    el.params = { js: 'console.log("hi")' };
    await flushMicrotasks();

    // Params change is an "otherOptions" change, triggers recreation
    expect(mockDestroy).toHaveBeenCalled();
    expect(createPlaygroundMock).toHaveBeenCalledTimes(2);
  });

  test('params property getter returns the set value', () => {
    const el = document.createElement('live-codes') as any;
    const params = { js: 'test' };
    el.params = params;
    expect(el.params).toBe(params);
  });

  test('sdk property is read-only and returns the playground', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(el.sdk).toBe(mockSdk);
  });

  test('sdk is undefined before initialization', () => {
    const el = document.createElement('live-codes') as any;
    expect(el.sdk).toBeUndefined();
  });

  test('setting config before connecting does not trigger update', async () => {
    const el = document.createElement('live-codes') as any;
    el.config = { title: 'pre-connect' };
    await flushMicrotasks();

    expect(createPlaygroundMock).not.toHaveBeenCalled();

    // Connect – should use the pre-set config
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config).toEqual({ title: 'pre-connect' });
  });
});

describe('<live-codes> – sdkready event', () => {
  test('dispatches sdkready event with sdk in detail', async () => {
    const el = document.createElement('live-codes');
    const handler = jest.fn();
    el.addEventListener('sdkready', handler);

    document.body.appendChild(el);
    await flushMicrotasks();

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail.sdk).toBe(mockSdk);
  });

  test('sdkready event bubbles and is composed', async () => {
    const el = document.createElement('live-codes');
    const handler = jest.fn();
    document.body.addEventListener('sdkready', handler);

    document.body.appendChild(el);
    await flushMicrotasks();

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);

    document.body.removeEventListener('sdkready', handler);
  });
});

describe('<live-codes> – destroy method', () => {
  test('destroy() cleans up the playground', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    el.destroy();
    expect(mockDestroy).toHaveBeenCalled();
    expect(el.sdk).toBeUndefined();
  });

  test('destroy() invalidates pending async creation', async () => {
    let resolvePlayground: (sdk: Playground) => void;
    createPlaygroundMock.mockReturnValue(
      new Promise<Playground>((resolve) => {
        resolvePlayground = resolve;
      }),
    );

    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    // Destroy before playground creation resolves
    el.destroy();

    // Now resolve the pending creation
    const lateSdk = createMockSdk();
    resolvePlayground!(lateSdk);
    await flushMicrotasks();

    // The late SDK should be destroyed since generation changed
    expect(lateSdk.destroy as jest.Mock).toHaveBeenCalled();
    expect(el.sdk).toBeUndefined();
  });
});

describe('<live-codes> – generation-based staleness', () => {
  test('rapid attribute changes only keep the last playground', async () => {
    const resolvers: Array<(sdk: Playground) => void> = [];

    createPlaygroundMock.mockImplementation(
      () =>
        new Promise<Playground>((resolve) => {
          resolvers.push(resolve);
        }),
    );

    const el = document.createElement('live-codes');
    el.setAttribute('template', 'react');
    document.body.appendChild(el);
    await flushMicrotasks();

    // First creation is pending
    expect(resolvers).toHaveLength(1);

    // Change attribute while first is still pending
    el.setAttribute('template', 'vue');
    await flushMicrotasks();

    expect(resolvers).toHaveLength(2);

    // Give each SDK its own destroy mock to track independently
    const staleDestroy = jest.fn();
    const staleSdk = { ...createMockSdk(), destroy: staleDestroy } as unknown as Playground;

    const currentDestroy = jest.fn();
    const currentSdk = { ...createMockSdk(), destroy: currentDestroy } as unknown as Playground;

    // Resolve the first (stale) creation
    resolvers[0](staleSdk);
    await flushMicrotasks();

    // The stale SDK should be destroyed
    expect(staleDestroy).toHaveBeenCalled();

    // Resolve the second (current) creation
    resolvers[1](currentSdk);
    await flushMicrotasks();

    // The current SDK should NOT be destroyed and should be accessible
    expect(currentDestroy).not.toHaveBeenCalled();
    expect((el as any).sdk).toBe(currentSdk);
  });
});

describe('<live-codes> – config URL fetch', () => {
  test('config set to URL string fetches JSON and calls setConfig', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    const fetchedConfig = { title: 'fetched' };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(fetchedConfig),
    }) as any;

    el.config = 'https://example.com/config.json';
    await flushMicrotasks();

    expect(global.fetch).toHaveBeenCalledWith('https://example.com/config.json');
    expect(mockSetConfig).toHaveBeenCalledWith(fetchedConfig);

    (global.fetch as jest.Mock).mockRestore?.();
  });
});
