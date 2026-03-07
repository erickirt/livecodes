import type { Meta } from '@storybook/react-vite';
import { defaultMeta, livecodesStory, type LiveCodes } from '../../src';

export default {
  ...defaultMeta,
  title: 'Embed Options/appUrl',
} satisfies Meta<typeof LiveCodes>;

export const AppUrl = livecodesStory({ appUrl: 'https://dev.livecodes.io' });
export const Default = livecodesStory({});
