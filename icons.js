import { resolve } from 'path'
import { readFileSync } from 'fs'
import { getIconData, iconToSVG, replaceIDs } from '@iconify/utils';

const iconsPath = resolve(__dirname, 'node_modules/@iconify-json/mdi/icons.json')
const iconsData = JSON.parse(readFileSync(iconsPath))
// console.log(Object.keys(iconsData))

const svgAttributesBase = {
  'xmlns': 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
}

export const getIconSVG = function(name) {
  const icon = getIconData(iconsData, name)
  if (!icon) return
  const renderData = iconToSVG(icon, {
    height: 'auto',
  });

  const svgAttributes = {
    ...svgAttributesBase,
    ...renderData.attributes,
  };

  const svgAttributesStr = Object.keys(svgAttributes)
    .map(
      (attr) => `${attr}="${svgAttributes[attr]}"`
    )
    .join(' ');

  // Generate SVG
  const svg = `<svg ${svgAttributesStr}>${replaceIDs(renderData.body)}</svg>`;
  return svg
}
