export default (label) => {

  const attributes = {
    className: 'hh-modal-container',
    role: 'dialog',
  };

  if (label) {
    attributes['aria-label'] = label;
  }

  return attributes;
};
