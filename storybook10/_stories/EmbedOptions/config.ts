import type { StoryDef } from '../../common';

export const storyDef: StoryDef = {
  SelectLanguage: {
    options: {
      config: { markup: { language: 'javascript' } },
    },
  },

  LanguageAndContent: {
    options: {
      config: { script: { language: 'javascript', content: 'console.log("hi",' } },
    },
  },

  LanguagesAndContent: {
    options: {
      config: {
        markup: { language: 'html', content: 'hello world!' },
        script: { language: 'javascript', content: 'console.log("hi",' },
      },
    },
  },

  NonDefaultLanguage: {
    options: {
      config: { script: { language: 'typescript' } },
    },
  },

  MultipleLanguages: {
    options: {
      config: {
        markup: { language: 'mdx' },
        style: { language: 'stylus' },
        script: { language: 'jsx' },
      },
    },
  },

  MultipleLanguagesAndContent: {
    options: {
      config: {
        markup: { language: 'html', content: 'hi' },
        style: { language: 'scss' },
        script: { language: 'livescript' },
      },
    },
  },

  MultipleWithSelectedLanguage: {
    options: {
      config: {
        markup: { language: 'html', content: 'hi' },
        style: { language: 'scss', content: 'body {color:blue;}' },
        script: { language: 'typescript' },
        activeEditor: 'style',
      },
    },
  },

  // TODO: fix
  Languages: {
    options: {
      config: {
        languages: ['html', 'md', 'css', 'ts'],
      },
    },
  },

  ActiveEditor: {
    options: {
      config: {
        activeEditor: 'style',
      },
    },
  },

  Tags: {
    options: {
      config: {
        tags: ['js', 'advanced', 'proof-of-concept'],
      },
    },
  },

  Stylesheets: {
    options: {
      config: {
        stylesheets: [
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
        ],
      },
    },
  },

  Scripts: {
    options: {
      config: {
        scripts: [
          'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js',
          'https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
        ],
      },
    },
  },

  ToolsNone: {
    options: {
      config: {
        tools: {
          enabled: [],
          active: '',
          status: 'none',
        },
      },
    },
  },

  ToolsOpen: {
    options: {
      config: {
        tools: {
          enabled: 'all',
          active: '',
          status: 'open',
        },
      },
    },
  },

  ConsoleOpen: {
    options: {
      config: {
        tools: {
          enabled: 'all',
          active: 'console',
          status: 'open',
        },
      },
    },
  },

  CompiledFull: {
    options: {
      config: {
        tools: {
          enabled: 'all',
          active: 'compiled',
          status: 'full',
        },
      },
    },
  },

  ConsoleEnabled: {
    options: {
      config: {
        tools: {
          enabled: ['console'],
          active: '',
          status: 'open',
        },
      },
    },
  },

  Tests: {
    options: {
      template: 'jest',
      config: {
        tools: {
          enabled: 'all',
          active: 'tests',
          status: 'open',
        },
      },
    },
  },

  TestsEnabled: {
    options: {
      template: 'jest',
      config: {
        tools: {
          enabled: ['tests'],
          active: 'tests',
          status: 'open',
        },
      },
    },
  },

  ModeResult: {
    options: {
      template: 'javascript',
      config: {
        mode: 'result',
      },
    },
  },

  ModeEditor: {
    options: {
      template: 'javascript',
      config: {
        mode: 'editor',
      },
    },
  },

  ModeCodeblock: {
    options: {
      template: 'javascript',
      config: {
        mode: 'codeblock',
      },
    },
  },

  ModeFull: {
    options: {
      template: 'javascript',
      config: {
        mode: 'full',
      },
    },
  },

  ModeResultConsoleClosed: {
    options: {
      template: 'javascript',
      config: {
        mode: 'result',
        tools: {
          enabled: 'all',
          active: 'console',
          status: 'closed',
        },
      },
    },
  },

  ModeResultConsoleOpen: {
    options: {
      template: 'javascript',
      config: {
        mode: 'result',
        tools: {
          enabled: 'all',
          active: 'console',
          status: 'open',
        },
      },
    },
  },

  ModeResultCompiledOpen: {
    options: {
      template: 'javascript',
      config: {
        mode: 'result',
        tools: {
          enabled: 'all',
          active: 'compiled',
          status: 'open',
        },
      },
    },
  },

  ConfigJsonURL: {
    options: {
      config:
        'https://raw.githubusercontent.com/hatemhosny/typescript-demo-for-testing-import-/gh-pages/src/livecodes.json',
    },
    storyName: 'Config JSON URL',
  },
};

export default storyDef;
