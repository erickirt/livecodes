import fs from 'fs';
import path from 'path';
import type { StoryDef } from '../storybook10/common';

const basePath = 'storybook10';
const definitionsPath = path.join(basePath, '_stories');
const frameworks = ['react', 'vue'];

const readDefs = async (dir: string) => {
  const definitions: Array<{ name: string; title: string; stories: StoryDef }> = [];
  const items = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.ts') || fs.statSync(path.join(dir, name)).isDirectory());

  for (const name of items) {
    if (fs.statSync(path.join(dir, name)).isDirectory()) {
      definitions.push(...(await readDefs(path.join(dir, name))));
    } else {
      const storyName = name.replace('.ts', '');
      definitions.push({
        name: storyName,
        title: path.relative(definitionsPath, path.join(dir, storyName)).replaceAll(path.sep, '/'),
        stories: (await import('../' + path.join(dir, name))).default,
      });
    }
  }
  return definitions;
};
const storyDefs = await readDefs(definitionsPath);

const createStories = (def: { name: string; title: string; stories: StoryDef }) =>
  `// AUTO-GENERATED — do not edit

// eslint-disable-next-line import/no-unresolved
import { defaultMeta, livecodesStory, type LiveCodes, type Meta } from '#src';

export default {
  ...defaultMeta,
  title: '${def.title}',
} satisfies Meta<typeof LiveCodes>;

${Object.entries(def.stories)
  .map(
    ([name, story]) =>
      `export const ${name} = livecodesStory(${JSON.stringify(story.options)});` +
      (story.storyName ? `\n${name}.storyName = '${story.storyName}';` : ''),
  )
  .join('\n')}
`;

for (const fw of frameworks) {
  for (const def of storyDefs) {
    const parentDir = path.dirname(def.title);
    const outPath = path.join(basePath, fw, 'stories', parentDir, `${def.name}.stories.ts`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, createStories(def));
  }
}
