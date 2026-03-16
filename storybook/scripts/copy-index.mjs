import * as fs from 'fs';

fs.promises.copyFile('index.html', '../build/storybook/index.html');
