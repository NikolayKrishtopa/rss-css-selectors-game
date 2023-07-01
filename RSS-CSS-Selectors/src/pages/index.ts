const root = document.querySelector('.root');

const text = document.createElement('p');
text.textContent = 'test';

root?.append(text);
