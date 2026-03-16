import type { StoryDef } from '../../common';

export const storyDef: StoryDef = {
  Lazy: { options: { loading: 'lazy' } },
  Click: { options: { loading: 'click' } },
  Eager: { options: { loading: 'eager' } },
};

export default storyDef;
