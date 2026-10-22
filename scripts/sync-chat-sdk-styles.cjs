/** Copy the pinned SDK's complete styles, isolated from portfolio components. */
const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const seen = new Set();
function collect(file) {
  file = fs.realpathSync(file);
  if (seen.has(file)) return '';
  seen.add(file);
  const root = postcss.parse(fs.readFileSync(file, 'utf8'));
  root.walkAtRules('import', rule => {
    const spec = rule.params.match(/["']([^"']+)["']/)?.[1];
    // Use the host portfolio's Geist fonts rather than loading another font family.
    if (!spec || spec.startsWith('@fontsource/')) return rule.remove();
    const imported = spec.startsWith('.') ? path.resolve(path.dirname(file), spec) : require.resolve(spec, { paths: [path.dirname(file)] });
    rule.replaceWith(postcss.parse(collect(imported)).nodes);
  });
  root.walkAtRules('layer', rule => rule.nodes ? rule.replaceWith(rule.nodes) : rule.remove());
  return root.toString();
}
const root = postcss.parse(collect(require.resolve('@sarchauhan/chat/styles.css')));
const animations = new Map();
root.walkAtRules(rule => {
  if (/keyframes$/.test(rule.name)) {
    const oldName = rule.params;
    const newName = `sdk-showcase-${oldName}`;
    animations.set(oldName, newName);
    rule.params = newName;
  }
});
root.walkDecls(decl => {
  if (/^animation(?:-name)?$/.test(decl.prop)) {
    for (const [from, to] of animations) decl.value = decl.value.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  }
});
root.walkRules(rule => {
  for (let parent = rule.parent; parent; parent = parent.parent) {
    if (parent.type === 'atrule' && /keyframes$/.test(parent.name)) return;
  }
  rule.selectors = rule.selectors.map(selector => {
    if (selector.includes('.chat-root')) return selector.replace(/\.chat-root\b/g, ':is(.sdk-preview, .chat-detail-panel).chat-root');
    if (selector.startsWith('.chat-detail-overlay')) return selector;
    if (selector.startsWith('.chat-detail-panel')) return selector.replace('.chat-detail-panel', '.chat-root.chat-detail-panel');
    return ':is(.sdk-preview, .chat-detail-panel) ' + selector;
  });
});
fs.writeFileSync(path.join(__dirname, '../app/components/projects/chat-sdk-demo.css'), '/* Generated from @sarchauhan/chat 0.0.2 (MIT). Run node scripts/sync-chat-sdk-styles.cjs.\n * All SDK selectors are limited to showcase roots and SDK dialog portals. */\n' + root.toString());
