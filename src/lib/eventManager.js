const handlers = new Map();

const EVENT_TYPES = [
  "click",
  "mouseover",
  "focus",
  "keydown",
  "keyup",
  "keypress",
  "submit",
];

function setEventHandlers(e) {
  const target = e.target;

  const elementHandlers = handlers.get(target);
  if (elementHandlers?.has(e.type)) {
    elementHandlers.get(e.type).forEach((handler) => handler(e));
  }
}

export function setupEventListeners(root) {
  EVENT_TYPES.forEach((eventType) => {
    root.addEventListener(eventType, setEventHandlers);
  });
}

export function addEvent(element, eventType, handler) {
  if (!handlers.has(element)) {
    handlers.set(element, new Map());
  }

  const elementHandlers = handlers.get(element);
  if (!elementHandlers?.has(eventType)) {
    elementHandlers.set(eventType, new Set());
  }

  elementHandlers.get(eventType).add(handler);
}

export function removeEvent(element, eventType, handler) {
  const elementHandlers = handlers.get(element);
  if (elementHandlers?.has(eventType)) {
    elementHandlers.get(eventType).delete(handler);
  }
}
