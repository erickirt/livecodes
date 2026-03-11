import type { StoryDef } from '../../common';

export const storyDef: StoryDef = {
  SelectLanguage: {
    options: { params: { js: '' } },
  },

  LanguageAndContent: {
    options: { params: { js: 'console.log("hi");' } },
  },

  LanguagesAndContent: {
    options: {
      params: {
        js: 'console.log("hi");',
        html: 'hello world!',
      },
    },
  },

  NonDefaultLanguage: {
    options: {
      params: {
        ts: '',
      },
    },
  },

  Lang: {
    options: {
      params: {
        lang: 'scss',
      },
    },
  },

  Language: {
    options: {
      params: {
        language: 'md',
      },
    },
  },

  MultipleLanguages: {
    options: {
      params: {
        stylus: '',
        jsx: '',
        mdx: '',
      },
    },
  },

  MultipleLanguagesAndContent: {
    options: {
      params: {
        html: 'hi',
        scss: '',
        ls: '',
      },
    },
  },

  MultipleWithSelectedLanguage: {
    options: {
      params: {
        html: 'hi',
        scss: 'body{color:blue;}',
        ts: '//hi',
        lang: 'scss',
      },
    },
  },

  LanguagesInSameEditor: {
    options: {
      params: {
        html: 'hi',
        md: '# hello',
      },
    },
  },

  LanguagesInSameEditorOrder: {
    options: {
      params: {
        md: '# hello',
        html: 'hi',
      },
    },
  },
  // TODO: fix
  Languages: {
    options: {
      params: {
        languages: 'html,md,css,ts',
      },
    },
  },
  ActiveEditor: {
    options: {
      params: {
        activeEditor: 'style',
      },
    },
  },
  ActiveEditorIndex: {
    options: {
      params: {
        activeEditor: 1,
      },
    },
  },
  Active: {
    options: {
      params: {
        active: 'style',
      },
    },
  },
  ActiveIndex: {
    options: {
      params: {
        active: 1,
      },
    },
  },
  Tags: {
    options: {
      params: {
        tags: 'js,advanced,proof-of-concept',
      },
    },
  },
  Stylesheets: {
    options: {
      params: {
        stylesheets:
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css,https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
      },
    },
  },
  Scripts: {
    options: {
      params: {
        scripts:
          'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js,https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
      },
    },
  },
  ToolsNone: {
    options: {
      params: {
        tools: 'none',
      },
    },
  },
  ToolsOpen: {
    options: {
      params: {
        tools: 'open',
      },
    },
  },
  Console: {
    options: {
      params: {
        console: '',
      },
    },
  },
  ConsoleTrue: {
    options: {
      params: {
        console: 'true',
      },
    },
  },
  ConsoleOpen: {
    options: {
      params: {
        console: 'open',
      },
    },
  },
  CompiledFull: {
    options: {
      params: {
        compiled: 'full',
      },
    },
  },
  CompiledOpenConsoleOpen: {
    options: {
      params: {
        compiled: 'open',
        console: 'open',
      },
    },
  },
  CompiledOpenConsoleNone: {
    options: {
      params: {
        compiled: 'open',
        console: 'none',
      },
    },
  },
  ConsoleNone: {
    options: {
      params: {
        console: 'none',
      },
    },
  },
  ToolsConsoleCompiled: {
    options: {
      params: {
        tools: 'open',
        console: 'none',
        compiled: 'none',
      },
    },
  },
  TestsConsoleCompiled: {
    options: {
      template: 'jest',
      params: {
        tests: 'open',
        console: 'none',
        compiled: 'none',
      },
    },
  },
  ModeResult: {
    options: {
      template: 'javascript',
      params: {
        mode: 'result',
      },
    },
  },
  ModeEditor: {
    options: {
      template: 'javascript',
      params: {
        mode: 'editor',
      },
    },
  },
  ModeCodeblock: {
    options: {
      template: 'javascript',
      params: {
        mode: 'codeblock',
      },
    },
  },
  ModeFull: {
    options: {
      template: 'javascript',
      params: {
        mode: 'full',
      },
    },
  },
  ModeResultConsoleClosed: {
    options: {
      template: 'javascript',
      params: {
        mode: 'result',
        console: 'closed',
      },
    },
  },
  ModeResultConsoleOpen: {
    options: {
      template: 'javascript',
      params: {
        mode: 'result',
        console: 'open',
      },
    },
  },
  ModeResultCompiledOpen: {
    options: {
      template: 'javascript',
      params: {
        mode: 'result',
        compiled: 'open',
      },
    },
  },
  ModeResultToolsOpen: {
    options: {
      template: 'javascript',
      params: {
        mode: 'result',
        tools: 'open',
      },
    },
  },
};

export default storyDef;
