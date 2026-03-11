import type { EmbedOptions } from 'livecodes';

export interface StoryDef {
  [key: string]: { options: EmbedOptions; storyName?: string };
}
