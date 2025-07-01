import { cargarHead } from './headConfig.js';

cargarHead();

document.addEventListener('DOMContentLoaded', async () => {
  fetch('/layouts/header.html')
    .then(res => res.text())
    .then(html => {
      const header = document.getElementById('header');
      if (header) header.innerHTML = html;
    });

  fetch('/layouts/footer.html')
    .then(res => res.text())
    .then(html => {
      const footer = document.getElementById('footer');
      console.log(footer);
      if (footer) footer.innerHTML = html;
    });

  await fetch('/layouts/chatBot.html')
    .then(res => res.text())
    .then(html => {
      const chatBot = document.getElementById('chatBot');
      if (chatBot) chatBot.innerHTML = html;
    });
});