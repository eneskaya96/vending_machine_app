module.exports = {
  // This will check Typescript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // This will lint TypeScript and JavaScript files
  '**/*.{js,jsx,ts,tsx,json}': ['yarn lint:fix'],

  // This will format all files
  '**/*.{js,jsx,ts,tsx,html,scss,css,json,md}': ['yarn format:fix'],
};
