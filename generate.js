import fs from 'fs';

const svg = fs.readFileSync('/Users/mayurvishwakarma/Developer/llamacorp/settingicon.html', 'utf8');

// Use JSON.stringify to safely escape the SVG string for JavaScript
const escapedSvg = JSON.stringify(svg);

const component = `export const SettingIcon = ({ className }) => (
  <div className={\`\${className} [&>svg]:w-full [&>svg]:h-full\`} dangerouslySetInnerHTML={{ __html: ${escapedSvg} }} />
);`;

fs.writeFileSync('/Users/mayurvishwakarma/Developer/llamacorp/src/components/SettingIcon.jsx', component);
