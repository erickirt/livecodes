import type { Meta } from '@storybook/react-vite';
import type LiveCodes from './livecodes';
import { defaultMeta, livecodesStory } from './livecodes-story';

const meta = {
  ...defaultMeta,
  title: 'Embed Options/view',
} satisfies Meta<typeof LiveCodes>;

export default meta;

export const Split = livecodesStory({ config: { view: 'split' } });
export const Editor = livecodesStory({ config: { view: 'editor' } });
export const Result = livecodesStory({ config: { view: 'result' } });
