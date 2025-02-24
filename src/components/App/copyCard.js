const copyCard = () => {
    document.querySelector('[data-cards-row]').addEventListener('click', e => {
        const target = e.target;
        const parentElement = target.closest('[data-card]');
        if (parentElement) {
            navigator.clipboard.writeText(parentElement.textContent);
            document
                .querySelector('[data-notification]')
                .classList.add('visible');
            setTimeout(() => {
                document
                    .querySelector('[data-notification]')
                    .classList.remove('visible');
            }, 1000);
        }
    });
    document.body.addEventListener('click', e => {
        const target = e.target;
        const parentElement = target.closest('[data-notation-card]');
        if (parentElement) {
            navigator.clipboard.writeText(parentElement.textContent);
            document
                .querySelector('[data-notification]')
                .classList.add('visible');
            setTimeout(() => {
                document
                    .querySelector('[data-notification]')
                    .classList.remove('visible');
            }, 1000);
        }
    });
};

export default copyCard;
