const toggleButton = document.getElementById('toggle-button');

let darkMode = true;


toggleButton.addEventListener('click', (event) => {
    document.documentElement.classList.toggle('light');
    
    const mode = this.darkMode ? 'light' : 'dark';
    
    event.currentTarget.querySelector('span').textContent = `${mode} mode ativado.`;

    this.darkMode = !this.darkMode;
});