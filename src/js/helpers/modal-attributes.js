export default (label) => {

  const attributes = {
    className: 'modal',
    role: 'region',
  };

  if (label) {
    attributes['aria-label'] = label;
  }

  return attributes;
};
