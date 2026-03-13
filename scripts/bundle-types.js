const fs = require('fs');
const path = require('path');
const dts = require('dts-bundle');

const bundleTypes = () => {
  const outDir = 'build/sdk/';
  const outFile = 'livecodes.d.ts';
  const outPath = outDir + outFile;

  // delete if exists
  try {
    fs.unlinkSync(path.resolve(outPath));
  } catch {}

  const options = {
    name: 'livecodes',
    main: outDir + '**/*.d.ts',
    out: outFile,
    removeSource: true,
  };

  dts.bundle(options);

  // patch
  const content = fs.readFileSync(path.resolve(outPath), 'utf8');
  const patched = content
    .replace(/export \* from 'livecodes\/.*;/g, '')
    .replace(/livecodes\/index/g, 'livecodes')
    .replace(/\/\/\s.*/g, '')
    .replace(/[\r\n]{2,}/g, '\n')
    .trimStart();

  fs.writeFileSync(path.resolve(outPath), patched, 'utf8');
};

module.exports = { bundleTypes };

if (require.main === module) {
  bundleTypes();
}
