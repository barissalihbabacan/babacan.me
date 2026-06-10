/* empty css             */import"./modulepreload-polyfill-Dezn_h7o.js";var e=document.querySelector(`form`);e&&e.addEventListener(`submit`,t=>{t.preventDefault();let n=t.target.querySelector(`button`),r=n.innerHTML;n.innerHTML=`
                    <span>Processing...</span>
                    <span class="material-symbols-outlined animate-spin" data-icon="sync">sync</span>
                `,n.classList.add(`opacity-50`,`pointer-events-none`),setTimeout(()=>{n.innerHTML=`
                        <span>Transmission Complete</span>
                        <span class="material-symbols-outlined text-green-400" data-icon="check_circle">check_circle</span>
                    `,n.classList.remove(`bg-primary`),n.classList.add(`bg-green-900/20`,`text-green-400`,`border`,`border-green-400/50`),setTimeout(()=>{e.reset(),n.innerHTML=r,n.classList.remove(`opacity-50`,`pointer-events-none`,`bg-green-900/20`,`text-green-400`,`border`,`border-green-400/50`),n.classList.add(`bg-primary`)},3e3)},1500)});