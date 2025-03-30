export function normalizeVNode(vNode) {
  const regex = /^(true|false|undefined|null)$/g;
  return String(vNode).replace(regex, "");
}
