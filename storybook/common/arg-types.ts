import type { Control } from '@storybook/addon-docs/blocks';
import type { ArgTypes } from '@storybook/react-vite';

import './deps';
import { appLanguages, defaultConfig, languages, starterTemplates } from './internal';
import type { Config, ReactProps as Props } from './livecodes';
import { themes } from './themes';

export const delimiter = '__';

const getControlInfo = (name: string, defaultObj = defaultConfig) => {
  let group: string | undefined;
  let subcategory: string | undefined;
  let keyName: string | undefined;

  const parts = name.split(delimiter);
  if (parts.length === 2) {
    [group, keyName] = parts;
  } else {
    [group, subcategory, keyName] = parts;
  }

  const getType = (value: unknown) => {
    if (typeof value === 'string') return 'text';
    return typeof value;
  };

  const defaultValue =
    // @ts-expect-error TODO
    subcategory != null ? defaultObj?.[subcategory]?.[keyName] : defaultObj?.[keyName];

  return {
    table: {
      category: group,
      ...(subcategory ? { subcategory } : {}),
    },
    name: keyName,
    control: getType(defaultValue) as Control,
    required: false,
  };
};

const configArgTypes: Partial<
  ArgTypes<Props & Record<`config__${keyof Config}`, ReturnType<typeof getControlInfo>>>
> = {
  config__view: {
    ...getControlInfo('config__view'),
    control: 'inline-radio',
    options: ['split', 'editor', 'result'],
  },
  config__mode: {
    ...getControlInfo('config__mode'),
    control: 'inline-radio',
    options: ['full', 'focus', 'lite', 'simple', 'editor', 'codeblock', 'result'],
  },
  config__theme: {
    ...getControlInfo('config__theme'),
    control: 'inline-radio',
    options: ['light', 'dark'],
  },
  config__themeColor: {
    ...getControlInfo('config__themeColor'),
    control: 'color',
  },
  config__layout: {
    ...getControlInfo('config__layout'),
    control: 'inline-radio',
    options: ['responsive', 'vertical', 'horizontal'],
  },
  config__editorTheme: {
    ...getControlInfo('config__editorTheme'),
    control: 'select',
    options: themes,
  },
  config__appLanguage: {
    ...getControlInfo('config__appLanguage'),
    control: 'select',
    options: Object.values(appLanguages),
    mapping: Object.keys(appLanguages).reduce(
      (acc, key) => {
        acc[appLanguages[key as keyof typeof appLanguages]] = key;
        return acc;
      },
      {} as Record<string, string>,
    ),
  },
  config__activeEditor: {
    ...getControlInfo('config__activeEditor'),
    control: 'inline-radio',
    options: ['markup', 'style', 'script'],
  },
  config__languages: {
    ...getControlInfo('config__languages'),
    control: 'object',
  },
  // @ts-expect-error TODO
  config__markup__language: {
    ...getControlInfo('config__markup__language'),
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'markup').map((lang) => lang.name),
  },
  config__markup__content: {
    ...getControlInfo('config__markup__content'),
  },
  config__markup__contentUrl: {
    ...getControlInfo('config__markup__contentUrl'),
    control: 'text',
  },
  config__markup__selector: {
    ...getControlInfo('config__markup__selector'),
    control: 'text',
  },
  config__markup__position: {
    ...getControlInfo('config__markup__position'),
    control: 'object',
  },
  config__style__language: {
    ...getControlInfo('config__style__language'),
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'style').map((lang) => lang.name),
  },
  config__style__content: {
    ...getControlInfo('config__style__content'),
  },
  config__style__contentUrl: {
    ...getControlInfo('config__style__contentUrl'),
    control: 'text',
  },
  config__style__selector: {
    ...getControlInfo('config__style__selector'),
    control: 'text',
  },
  config__style__position: {
    ...getControlInfo('config__style__position'),
    control: 'object',
  },
  config__script__language: {
    ...getControlInfo('config__script__language'),
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'script').map((lang) => lang.name),
  },
  config__script__content: {
    ...getControlInfo('config__script__content'),
  },
  config__script__contentUrl: {
    ...getControlInfo('config__script__contentUrl'),
    control: 'text',
  },
  config__script__selector: {
    ...getControlInfo('config__script__selector'),
    control: 'text',
  },
  config__script__position: {
    ...getControlInfo('config__script__position'),
    control: 'object',
  },
  config__stylesheets: {
    ...getControlInfo('config__stylesheets'),
    control: 'object',
  },
  config__scripts: {
    ...getControlInfo('config__scripts'),
    control: 'object',
  },
  config__cssPreset: {
    ...getControlInfo('config__cssPreset'),
    control: 'inline-radio',
    options: ['normalize.css', 'reset-css'],
  },
  config__imports: {
    ...getControlInfo('config__imports'),
    control: 'object',
  },
  config__types: {
    ...getControlInfo('config__types'),
    control: 'object',
  },
  config__tests__language: {
    ...getControlInfo('config__tests__language'),
    control: 'select',
    options: languages.filter((lang) => lang.editor === 'script').map((lang) => lang.name),
  },
  config__tests__content: {
    ...getControlInfo('config__tests__content'),
  },
  config__tools__enabled: {
    ...getControlInfo('config__tools__enabled'),
  },
  config__tools__active: {
    ...getControlInfo('config__tools__active'),
    control: 'inline-radio',
    options: ['console', 'compiled', 'tests'],
  },
  config__tools__status: {
    ...getControlInfo('config__tools__status'),
    control: 'inline-radio',
    options: ['full', 'closed', 'open', 'none'],
  },
  config__zoom: {
    ...getControlInfo('config__zoom'),
    control: 'inline-radio',
    options: [1, 0.5, 0.25],
  },
  config__processors: {
    ...getControlInfo('config__processors'),
    control: 'object',
  },
  config__customSettings: {
    ...getControlInfo('config__customSettings'),
    control: 'object',
  },
  config__editor: {
    ...getControlInfo('config__editor'),
    control: 'inline-radio',
    options: ['monaco', 'codemirror', 'codejar', 'auto'],
  },
  config__fontFamily: {
    ...getControlInfo('config__fontFamily'),
    control: 'text',
  },
  config__fontSize: {
    ...getControlInfo('config__fontSize'),
    control: 'number',
  },
  config__editorMode: {
    ...getControlInfo('config__editorMode'),
    control: 'inline-radio',
    options: ['vim', 'emacs'],
  },
};

export const argTypes: Partial<
  ArgTypes<
    Props & Record<`config__${keyof Config}`, ReturnType<typeof getControlInfo>> & { props: Props }
  >
> = {
  appUrl: {
    control: 'text',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  import: {
    control: 'text',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  lite: {
    control: 'boolean',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  loading: {
    control: 'inline-radio',
    options: ['lazy', 'click', 'eager'],
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  params: {
    control: 'object',
    required: false,
    table: {
      category: 'Embed Options',
    },
  },
  template: {
    control: 'select',
    required: false,
    table: {
      category: 'Embed Options',
    },
    options: starterTemplates.map((template) => template.name),
  },

  config: {
    table: { disable: true },
  },
  ...(Object.keys(defaultConfig) as Array<keyof Config>)
    .filter((key) => !key.includes('version'))
    .reduce(
      (acc, key) => {
        const defaultConfigValue = defaultConfig[key];
        if (`config__${key}` in configArgTypes) {
          // @ts-expect-error TODO
          acc[`config__${key}`] = configArgTypes[`config__${key}`];
        } else if (
          defaultConfigValue &&
          typeof defaultConfigValue === 'object' &&
          !Array.isArray(defaultConfigValue)
        ) {
          Object.keys(defaultConfigValue).forEach((subkey) => {
            // @ts-expect-error TODO
            acc[`config__${key}__${subkey}`] =
              // @ts-expect-error TODO
              configArgTypes[`config__${key}__${subkey}`] ||
              getControlInfo(`config__${key}__${subkey}`);
          });
        } else {
          acc[`config__${key}`] = getControlInfo(`config__${key}`);
        }
        return acc;
      },
      {} as Record<`config__${keyof Config}`, ReturnType<typeof getControlInfo>>,
    ),

  props: {
    control: 'object',
    required: false,
    table: {
      readonly: true,
      category: 'Props',
    },
  },

  className: {
    control: 'text',
    required: false,
    table: {
      category: 'Styles',
    },
  },
  style: {
    control: 'object',
    required: false,
    table: {
      category: 'Styles',
    },
  },
  height: {
    control: 'text',
    required: false,
    table: {
      category: 'Styles',
    },
  },

  // attrs: {
  //   description: 'Attributes to add to container element',
  //   control: 'object',
  //   required: false,
  //   table: {
  //     category: 'Container Element',
  //   },
  // },
};
