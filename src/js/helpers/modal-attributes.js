export default (label, open) => {

  const attributes = {
    className: 'modal',
    role: 'region',
  };


  if (open) {
    attributes.className += ' open';
  }

  if (label) {
    attributes['aria-label'] = label;
  }

  return attributes;
};
