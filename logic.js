(async () => {
    const elements = {
        text_demo: document.getElementById('text-demo'),
        text_area: document.getElementById('typing-place'),
        wpm_div: document.getElementById('wpm')
    };
    const QUOTES_URL = '/quotes.json';
    let text;

    const get_text = async () => {
        const data = await fetch(QUOTES_URL);
        const data_json = await data.json();
        const quote = data_json[Math.floor(Math.random() * data_json.length)];
        return quote;
    };

    const check = (text_to_check, actual_text) => {
        return text_to_check === actual_text;
    };

    const main = () => {
        elements.text_area.removeEventListener('input', main);
        const start_time = Date.now();
        elements.text_area.addEventListener('input', (e) => {
            if (check(e.target.value, text)) {
                const end_time = Date.now();
                const milliseconds_delta = end_time - start_time;
                const minutes_delta = milliseconds_delta / (1000 * 60);
                const no_words = text.split(' ').length;
                const wpm = no_words / minutes_delta;
                elements.wpm_div.innerHTML = wpm + ' WPM';
            }
        });
    };

    text = await get_text();
    elements.text_demo.innerHTML = text;
    elements.text_area.value = '';
    elements.text_area.addEventListener('input', main);
})();
