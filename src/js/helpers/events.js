function subscribe(eventName, listener, options = {}) {
  document.addEventListener(eventName, listener, options);
}

function unsubscribe(eventName, listener, options = {}) {
  document.removeEventListener(eventName, listener, options);
}

function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
