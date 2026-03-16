// AUTO-GENERATED — do not edit

// eslint-disable-next-line import/no-unresolved
import { defaultMeta, livecodesStory, type LiveCodes, type Meta } from '#src';

export default {
  ...defaultMeta,
  title: 'Basic',
} satisfies Meta<typeof LiveCodes>;

export const Introduction = livecodesStory({
  config: {
    markup: {
      language: 'markdown',
      content:
        '# Welcome to LiveCodes\n\n## Code Playground That Just Works!\n\nAn open-source **client-side** code playground that runs in the browser.\n\nSupports [**90+ languages/frameworks**](https://livecodes.io/docs/languages)!\n\n[App](https://livecodes.io)\n[About](https://livecodes.io/docs)\n[Docs](https://livecodes.io/docs/overview)\n[GitHub](https://github.com/live-codes/livecodes)',
    },
    style: {
      language: 'css',
      content:
        'body {\n  color: #494949;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 12px;\n}\n\na {\n  color: #0080ff;\n}\n\na.button {\n  background-color: #f5f4f4;\n  border: 1px solid grey;\n  border-radius: 3px;\n  color: #383838;\n  display: inline-block;\n  margin: 3px;\n  padding: 2px;\n  text-align: center;\n  text-decoration: none;\n  width: 5em;\n}\n\na.button:hover {\n  background-color: #666;\n  color: #fff;\n}',
    },
    script: {
      language: 'javascript',
      content:
        "document.querySelectorAll('a').forEach((link) => {\n  link.target = '_blank';\n  if (link.childNodes[0].tagName !== 'STRONG') {\n    link.classList.add('button');\n  }\n});\nconsole.log('Hello from JS!');",
    },
  },
});
export const Default = livecodesStory({});
export const ReactTemplate = livecodesStory({ template: 'react' });
