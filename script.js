document.getElementById('convert-btn').addEventListener('click', function() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    let result;

    if (isNaN(temperature)) {
        document.getElementById('result').textContent = 'Invalid input';
        return;
    }

    // Conversion Logic
    if (fromUnit === toUnit) {
        result = temperature;
    } else if (fromUnit === 'Celsius') {
        if (toUnit === 'Fahrenheit') {
            result = (temperature * 9/5) + 32;
        } else if (toUnit === 'Kelvin') {
            result = temperature + 273.15;
        }
    } else if (fromUnit === 'Fahrenheit') {
        if (toUnit === 'Celsius') {
            result = (temperature - 32) * 5/9;
        } else if (toUnit === 'Kelvin') {
            result = (temperature - 32) * 5/9 + 273.15;
        }
    } else if (fromUnit === 'Kelvin') {
        if (toUnit === 'Celsius') {
            result = temperature - 273.15;
        } else if (toUnit === 'Fahrenheit') {
            result = (temperature - 273.15) * 9/5 + 32;
        }
    }

    document.getElementById('result').textContent = result.toFixed(2) + ` ${toUnit}`;
});
