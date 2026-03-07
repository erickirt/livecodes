import type { Meta } from '@storybook/react-vite';
import { defaultMeta, livecodesStory, type LiveCodes } from '../../src';

export default {
  ...defaultMeta,
  title: 'Embed Options/loading',
} satisfies Meta<typeof LiveCodes>;

export const Lazy = livecodesStory({ loading: 'lazy' });
export const Click = livecodesStory({ loading: 'click' });
export const Eager = livecodesStory({ loading: 'eager' });
