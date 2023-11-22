export default (label) => {

  const attributes = {
    className: 'hh-modal-container',
    role: 'region',
  };

  if (label) {
    attributes['aria-label'] = label;
  }

  return attributes;
};
