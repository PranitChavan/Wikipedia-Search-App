import DisplayResults from '../views/resultView.js';

const ul = document.querySelector('.pagination__list');

export const renderPagination = function () {
  ul.innerHTML = '';

  // GENERATING INITIAL PAGINATION MARKUP AND RENDERING IT
  const markup = `<li class="pagination__list--item">
    <span><i class="fas fa-chevron-left"></i></span>
  </li>
  
  <li class="pagination__list--item"><span class="pagination__list--page active">1</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">2</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">3</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">4</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">5</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">6</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">7</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">8</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">9</span></li>
  <li class="pagination__list--item"><span class="pagination__list--page">10</span></li>
  
  <li class="pagination__list--item">
    <span><i class="fas fa-chevron-right"></i></span>
  </li> `;

  ul.insertAdjacentHTML('afterbegin', markup);

  implementPaginationFunctionality();
};

// CHANGING PAGINATION VALUES WHEN ARROW BUTTONS ARE CLICKED
const implementPaginationFunctionality = function () {
  const span = Array.from(document.querySelectorAll('.pagination__list--page'));

  ul.addEventListener('click', (e) => {
    // IF clicked on right arrow
    if (e.target.closest('.fa-chevron-right')) {
      for (let i = 0; i < span.length; i++) {
        span[i].innerHTML = Number(span[i].innerHTML) + 10;
      }
    }

    // IF clicked on left arrow
    if (e.target.closest('.fa-chevron-left')) {
      for (let i = 0; i < span.length; i++) {
        span[i].innerHTML = Number(span[i].innerHTML) - 10;
      }
    }
  });
};

// PASSING THE CLICKED BUTTON VALUE
export function handlerPag(handler) {
  ul.addEventListener('click', (e) => {
    const target = e.target.closest('.pagination__list--page');
    if (!target) return;

    const page = target.innerHTML;

    handler(+page);

    currPage(page);
  });
}

// HIGHLIGHT CURRENT PAGE
function currPage(page) {
  const span = Array.from(document.querySelectorAll('.pagination__list--page'));

  span.forEach((el) => {
    el.classList.remove('active');
  });

  const clickedEl = span.find((el) => {
    return el.innerHTML === page;
  });

  clickedEl.classList.add('active');

  resetCurrPage();
}

// RESET CURRENT PAGE
function resetCurrPage() {
  const next = document.querySelector('.fa-chevron-right');
  const prev = document.querySelector('.fa-chevron-left');

  const span = Array.from(document.querySelectorAll('.pagination__list--page'));

  const arr = [next, prev];

  arr.forEach((el) => {
    el.addEventListener('click', () => {
      span.forEach((el) => {
        el.classList.remove('active');
      });
    });
  });
}
