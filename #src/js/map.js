const map = document.querySelector('.contacts__map');

const div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = div.style.height = '50px';
document.body.append(div);
const scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();

map.style.width = "calc(100vw - " + scrollWidth + 'px)';
map.style.left = "calc((100vw - 100%) / -2 + " + Math.floor(scrollWidth / 2) + 'px)';