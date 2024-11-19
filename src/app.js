// DOM Elements
const hexInput = document.getElementById('hexInput');
const colorPreview = document.getElementById('colorPreview');
const rgbResult = document.getElementById('rgbResult');
const cmykResult = document.getElementById('cmykResult');
const pantoneResult = document.getElementById('pantoneResult');
const nameResult = document.getElementById('nameResult');
const darkModeToggle = document.getElementById('darkModeToggle');
const toast = document.getElementById('toast');

// Color conversion functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToCmyk(r, g, b) {
    // Convert RGB to 0-1 range
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    const k = 1 - Math.max(red, green, blue);
    const c = (1 - red - k) / (1 - k);
    const m = (1 - green - k) / (1 - k);
    const y = (1 - blue - k) / (1 - k);

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

// Approximate Pantone (basic implementation)
function approximatePantone(r, g, b) {
    // This is a simplified approximation
    return `PMS ${Math.floor((r * 256 * 256 + g * 256 + b) % 10000)}`;
}

// Color name API
async function getColorName(hex) {
    try {
        const response = await fetch(`https://api.color.pizza/v1/${hex.replace('#', '')}`);
        const data = await response.json();
        return data.colors[0].name;
    } catch (error) {
        console.error('Error fetching color name:', error);
        return 'Unknown';
    }
}

// Update display
async function updateColorDisplay(hex) {
    if (!hex.match(/^#[0-9A-Fa-f]{6}$/)) return;

    // Update color preview
    colorPreview.style.backgroundColor = hex;
    colorPreview.setAttribute('aria-label', `Color preview: ${hex}`);

    // Convert and display RGB
    const rgb = hexToRgb(hex);
    if (rgb) {
        const rgbText = `R ${rgb.r} G ${rgb.g} B ${rgb.b}`;
        rgbResult.textContent = rgbText;
        rgbResult.setAttribute('aria-label', `RGB value: ${rgbText}, click to copy`);
        
        // Convert and display CMYK
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        const cmykText = `C ${cmyk.c} M ${cmyk.m} Y ${cmyk.y} K ${cmyk.k}`;
        cmykResult.textContent = cmykText;
        cmykResult.setAttribute('aria-label', `CMYK value: ${cmykText}, click to copy`);
        
        // Approximate and display Pantone
        const pantoneText = approximatePantone(rgb.r, rgb.g, rgb.b);
        pantoneResult.textContent = pantoneText;
        pantoneResult.setAttribute('aria-label', `Pantone value: ${pantoneText}, click to copy`);
        
        // Fetch and display color name
        const name = await getColorName(hex);
        nameResult.textContent = name;
        nameResult.setAttribute('aria-label', `Color name: ${name}, click to copy`);
    }
}

// Copy functionality with keyboard support
function setupCopyFunctionality(element) {
    async function copyText() {
        const text = element.textContent;
        try {
            await navigator.clipboard.writeText(text);
            showToast();
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    element.addEventListener('click', copyText);
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            copyText();
        }
    });
}

function showToast() {
    toast.classList.remove('translate-y-full', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
    }, 2000);
}

// Dark mode toggle with keyboard support
function initializeDarkMode() {
    // Default to dark mode if no preference is set
    const isDarkMode = localStorage.getItem('darkMode') === null ? true : localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', isDarkMode);
    darkModeToggle.setAttribute('aria-checked', isDarkMode.toString());
}

function toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode);
    darkModeToggle.setAttribute('aria-checked', isDarkMode.toString());
}

darkModeToggle.addEventListener('click', toggleDarkMode);
darkModeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDarkMode();
    }
});

// Input validation and event handling
hexInput.addEventListener('input', (e) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
        value = '#' + value;
    }
    if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
        hexInput.setAttribute('aria-invalid', 'false');
        updateColorDisplay(value);
    } else {
        hexInput.setAttribute('aria-invalid', 'true');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial color
    const defaultColor = '#000000';
    hexInput.value = defaultColor;
    updateColorDisplay(defaultColor);

    // Set up event listeners
    hexInput.addEventListener('input', (e) => {
        let hex = e.target.value;
        if (!hex.startsWith('#')) {
            hex = '#' + hex;
        }
        if (hex.match(/^#[0-9A-Fa-f]{6}$/)) {
            updateColorDisplay(hex);
        }
    });

    // Initialize dark mode
    initializeDarkMode();

    // Set up copy functionality for all result elements
    [rgbResult, cmykResult, pantoneResult, nameResult].forEach(setupCopyFunctionality);
});
