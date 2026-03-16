import type { StoryDef } from '../../common';

export const storyDef: StoryDef = {
  GithubGist: {
    options: {
      import: 'https://gist.github.com/hatemhosny/406b6775436e136cb913ad3376f411b2',
    },
  },

  GithubGistNoUsername: {
    options: {
      import: 'https://gist.github.com/406b6775436e136cb913ad3376f411b2',
    },
  },

  GithubRepo: {
    options: {
      import: 'https://github.com/hatemhosny/typescript-demo-for-testing-import-',
    },
  },

  GithubDir: {
    options: {
      import: 'https://github.com/hatemhosny/typescript-demo-for-testing-import-/tree/gh-pages/src',
    },
  },

  GithubDirParmalink: {
    options: {
      import:
        'https://github.com/hatemhosny/typescript-demo-for-testing-import-/tree/29b328154267b36d77bfac284bc285784757c473/src',
    },
  },

  GithubFile: {
    options: {
      import:
        'https://github.com/hatemhosny/typescript-demo-for-testing-import-/blob/gh-pages/index.html',
    },
  },

  GitlabSnippet: { options: { import: 'https://gitlab.com/-/snippets/2199319' } },

  GitlabRepo: {
    options: {
      import: 'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-',
    },
  },

  GitlabDir: {
    options: {
      import:
        'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-/-/tree/gh-pages/src',
    },
  },

  GitlabFile: {
    options: {
      import:
        'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-/-/blob/gh-pages/index.html',
    },
  },

  Jsbin: {
    options: {
      import: 'https://jsbin.com/mikunebofa/edit?html,css,js,output',
    },
  },

  RawCode: {
    options: {
      import: 'https://hatemhosny.github.io/typescript-demo-for-testing-import-/',
    },
  },

  DOM: {
    options: {
      import: 'https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html',
    },
  },

  DOMCustomSelector: {
    options: {
      import: 'https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html',
      params: {
        'html-selector': 'h1',
      },
    },
  },
};

export default storyDef;
