import { getSiteData } from '../modules/loaders/state';

const scroll = (options) => {
  const {
    onUpdate,
  } = options;
  const data = getSiteData();

  const getSection = (className) => {
    let section = '';
    data.forEach((item) => {
      const { name } = item;
      if (className.indexOf(name) !== -1) {
        section = name;
      }
    });
    return section;
  };

  const observerHandler = (entries) => {
    entries.forEach((entry) => {
      if (onUpdate) {
        const { target } = entry;
        const { className } = target;
        const section = getSection(className);
        onUpdate(section, entry.isIntersecting);
      }
    });
  };

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(observerHandler, observerOptions);
  data.forEach((item) => {
    const { name } = item;
    const el = document.querySelector(`.project-animation-${name}`);
    observer.observe(el);
  });
};

export default scroll;
