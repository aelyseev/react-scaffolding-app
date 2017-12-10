export const isLeftClickEvent = event => event.button === 0;
export const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
