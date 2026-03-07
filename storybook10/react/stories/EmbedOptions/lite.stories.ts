import type { Meta } from '@storybook/react-vite';
import { defaultMeta, livecodesStory, type LiveCodes } from '../../src';

export default {
  ...defaultMeta,
  title: 'Embed Options/lite',
} satisfies Meta<typeof LiveCodes>;

export const Lite = livecodesStory({ lite: true });
export const Normal = livecodesStory({ lite: false });
