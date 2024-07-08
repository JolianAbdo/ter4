// Select the main header of the page
const header = document.querySelector('h1');
const app = document.getElementById('app');
const html = document.documentElement;

// Calculator object with methods for operations
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b === 0 ? 'Error: Division by zero' : a / b),
    evaluate: (expression) => {
        try {
            return eval(expression);
        } catch (e) {
            return 'Error';
        }
    }
};

// Function to toggle dark/light mode
const toggle = () => {
    html.classList.toggle('dark');
    renderThemeToggle(); // Update the theme toggle buttons
};

// Function to set the view and render corresponding content
const setView = (v) => {
    header.innerText = v;
    toggleMenu(true);

    if (v === 'Calculator') {
        renderCalculator();
    } else if (v === 'About') {
        renderAbout();
    } else if (v === 'Contact') {
        renderContact();
    }
};

// Function to toggle the mobile menu
const toggleMenu = (hide) => {
    const ddMenu = document.getElementById('ddMenu');
    const svgIcons = document.querySelectorAll('svg');
    if (!hide) {
        ddMenu.classList.toggle('hidden');
        svgIcons.forEach((el) => {
            el.classList.toggle('hidden');
        });
    } else {
        ddMenu.classList.add('hidden');
        svgIcons[0].classList.remove('hidden');
        svgIcons[1].classList.add('hidden');
    }
};

// Function to add a row to the calculator
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`;
    container.insertAdjacentHTML('beforeend', row);
};

// Function to add the monitor display to the calculator
const addMonitor = (container, text) => {
    const t = text ?? '';
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`;
    container.insertAdjacentHTML('beforeend', monitor);
};

// Function to create a calculator button
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '';
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
};

// Function to add buttons to the calculator
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('');
    addRow(container, btnHTML);
};

// Function to handle button clicks on the calculator
const click = (event) => {
    const monitor = document.getElementById('monitor');
    const bac = monitor.innerText.trim();
    const a = event.target.innerText;
    console.log(a);
    if (a === 'clear') {
        monitor.innerText = '';
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + calculator.evaluate(bac);
    } else {
        monitor.innerText += a;
    }
};

// Function to render the calculator
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'];
    app.innerHTML = '';
    addMonitor(app);
    addButtons(app, labels);
    const buttons = document.querySelectorAll('.d-btn');
    buttons.forEach((el) => el.addEventListener('click', click));
};

const renderAbout = () => {
    app.innerHTML = `
        <div class="p-4">
            <h2 class="text-2xl font-bold mb-4">About This Application</h2>
            <p class="mb-4">
                This application is a simple web-based tool demonstrating basic JavaScript functionalities.
            </p>
            <p>
                It includes a calculator, an about section, and a contact section.
            </p>
        </div>
    `;
};

// Function to render the Contact section
const renderContact = () => {
    app.innerHTML = `
        <div class="p-4">
            <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
            <p class="mb-4">
                If you have any questions or feedback, please reach out to us at:
            </p>
            <ul class="list-disc list-inside mb-4">
                <li>Email: <a href="mailto:Jolian.Abdo@e.braude.co.il" class="text-blue-600 underline">Jolian.Abdo@e.braude.co.il</a></li>
                <li>Phone: <a href="tel:+972-5400000000" class="text-blue-600 underline">+1 (234) 567-890</a></li>
            </ul>
        </div>
    `;
};

// Function to render the top menu dynamically
const renderMenu = () => {
    const menu = document.getElementById('dynamicMenu');
    menu.innerHTML = `
        <button class="block sm:hidden" onclick="toggleMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
                <path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
            </svg>
            <svg class="hidden" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512">
                <path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        </button>
        <div id="ddMenu" class="absolute top-[56px] left-0 bg-blue-300 p-3 hidden w-full">
            <button class="block py-1 px-2" onclick="setView('Calculator')">Calculator</button>
            <button class="block py-1 px-2" onclick="setView('About')">About</button>
            <button class="block py-1 px-2" onclick="setView('Contact')">Contact</button>
        </div>
        <div class="justify-start gap-4 hidden sm:flex">
            <button onclick="setView('Calculator')">Calculator</button>
            <button onclick="setView('About')">About</button>
            <button onclick="setView('Contact')">Contact</button>
        </div>
        <button class="dark:hidden block toggle-theme" onclick="toggle()">Dark</button>
        <button class="hidden dark:block toggle-theme" onclick="toggle()">Light</button>
    `;
};

// Function to render the theme toggle buttons dynamically
const renderThemeToggle = () => {
    const themeToggleButtons = document.querySelectorAll('.toggle-theme');
    themeToggleButtons.forEach(button => {
        button.textContent = html.classList.contains('dark') ? 'Light' : 'Dark';
    });
};

// Initial rendering of the menu, theme toggle buttons, and calculator
renderMenu();
renderThemeToggle();
renderCalculator();
