// Form Interaction Logic
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = `
                    <span>Processing...</span>
                    <span class="material-symbols-outlined animate-spin" data-icon="sync">sync</span>
                `;
        btn.classList.add('opacity-50', 'pointer-events-none');

        setTimeout(() => {
            btn.innerHTML = `
                        <span>Transmission Complete</span>
                        <span class="material-symbols-outlined text-green-400" data-icon="check_circle">check_circle</span>
                    `;
            btn.classList.remove('bg-primary');
            btn.classList.add('bg-green-900/20', 'text-green-400', 'border', 'border-green-400/50');

            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.classList.remove('opacity-50', 'pointer-events-none', 'bg-green-900/20', 'text-green-400', 'border', 'border-green-400/50');
                btn.classList.add('bg-primary');
            }, 3000);
        }, 1500);
    });
}
