export const smoothScrollTo = (elementId: string, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const headerOffset = offset;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, offset = 80) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (!href) return;
  
  const targetId = href.startsWith('#') ? href.substring(1) : href;
  if (targetId) {
    // If the target is the same as current URL hash, force a reflow
    if (window.location.hash === `#${targetId}`) {
      window.dispatchEvent(new Event('hashchange'));
    }
    // Update URL without scrolling
    window.history.pushState(null, '', `#${targetId}`);
    // Then scroll to the element
    smoothScrollTo(targetId, offset);
  }
};
