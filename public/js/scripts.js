document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  // Dropdown control (for all pages)
  const ddBtn = document.querySelectorAll('.ddBtn');
  if (ddBtn.length > 0) {
    ddBtn.forEach(btn => {
      const targetEl = document.querySelector(btn.dataset.target);
      btn.addEventListener('click', () => {
        targetEl.classList.toggle('hidden');
      });
    });
    // Global event listener for clicks outside the dropdowns
    document.addEventListener('click', e => {
      ddBtn.forEach(btn => {
        const targetEl = document.querySelector(btn.dataset.target);
        if (!btn.contains(e.target) && !targetEl.contains(e.target)) {
          targetEl.classList.add('hidden');
        }
      });
    });
  }

  // Format date
  const dateEl = document.querySelectorAll('.date');
  if (dateEl.length > 0) {
    dateEl.forEach(el => {
      const localDate = new Date(el.innerText);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };

      el.innerText = localDate.toLocaleString(undefined, options);
    });
  }

  // Brand hover gradient (Home page only)
  if (path === '/') {
    const brandGradient = document.getElementById('brand-gradient');
    if (brandGradient) {
      brandGradient.addEventListener('mouseenter', ({ target }) => {
        target.style.backgroundSize = '100%';
        target.style.transition = 'all 0.5s';
      });

      brandGradient.addEventListener('mouseleave', ({ target }) => {
        target.style.backgroundSize = '500%';
      });
    }
  }

  // Signup password confirm (Signup page only)
  if (path === '/signup') {
    const pw = document.getElementById('password');
    const pw2 = document.getElementById('confirmPw');
    const pwWarning = document.getElementById('pwWarning');
    if (pw && pw2 && pwWarning) {
      [pw, pw2].forEach(el => {
        el.addEventListener('input', () => {
          if (pw.value !== pw2.value) {
            pw2.classList.add('border-red-500');
            pw2.classList.remove('border-transparent');
            pwWarning.classList.remove('text-transparent');
            pwWarning.classList.add('text-red-500');
          } else {
            pw2.classList.add('border-transparent');
            pw2.classList.remove('border-red-500');
            pwWarning.classList.add('text-transparent');
            pwWarning.classList.remove('text-red-500');
          }
        });
      });
    }
  }

  if (path.includes('/dashboard')) {
    // Dashboard sidebar (Dashboard page only)
    const sidebar = document.getElementById('sidebar');
    const sidebarBtn = document.getElementById('sidebarBtn');
    const closeBtn = document.getElementById('closeSbBtn');

    if (sidebar && sidebarBtn && closeBtn) {
      sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
      });
      closeBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
      });
    }

    // Format sizes
    const sizes = document.querySelectorAll('.size');
    sizes.forEach(el => {
      console.log(el.innerText);
      el.innerText = (Number(el.innerText) / 1000000).toFixed(2) + 'MB';
    });

    // File size validation
    const newFileForm = document.getElementById('newFileForm');
    const file = document.getElementById('file');
    const fileWarning = document.getElementById('fileWarning');
    let isSizeValid = false;
    file.addEventListener('input', () => {
      isSizeValid = file.files[0].size < 5 * 1024 * 1024; // 5MiB
      if (isSizeValid) {
        file.classList.remove('border-transparent');
        file.classList.remove('file:bg-red-100');
        file.classList.remove('border-red-500');
        file.classList.add('border-green-500');
        fileWarning.classList.add('hidden');
      } else {
        file.classList.remove('border-transparent');
        file.classList.add('file:bg-red-100');
        file.classList.add('border-red-500');
        file.classList.remove('border-green-500');
        fileWarning.classList.remove('hidden');
      }
    });
    newFileForm.addEventListener('submit', e => {
      if (!isSizeValid) e.preventDefault();
    });
  }

  // Modal buttons
  const modalBtns = document.querySelectorAll('.modalBtn');
  const modalCloseBtns = document.querySelectorAll('.modalCloseBtn');
  if (modalBtns.length > 0) {
    modalBtns.forEach(el => {
      el.addEventListener('click', () => {
        document.querySelector(el.dataset.target).showModal();
      });
    });
    modalCloseBtns.forEach(el => {
      el.addEventListener('click', () => {
        console.log(el.dataset.target);
        document.querySelector(el.dataset.target).close();
      });
    });
  }

  // Set rename form attributes
  const renameBtns = document.querySelectorAll('.renameBtn');
  renameBtns.forEach(el => {
    el.addEventListener('click', () => {
      const form = document.querySelector(el.dataset.renameform);
      form.setAttribute(
        'action',
        `/rename-${el.dataset.renametype}/${el.dataset.renameid}`,
      );
    });
  });
});
