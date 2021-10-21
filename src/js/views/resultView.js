import '../../../node_modules/core-js/stable';

class DisplayResults {
  maxWords = 20;
  _parentEl = document.querySelector('.results__list');
  _form = document.querySelector('.input');
  _searchBtn = document.querySelector('.input__icon');
  _searchBar = document.querySelector('.input__text');
  _pagination = document.querySelector('.pagination');
  _resultsCount = document.querySelector('.count__text');
  _logo = document.querySelector('.header__img');
  _micBtn = document.querySelector('.input__mic');

  //passing this when form is submited or search btn is clicked
  _handleRequest(handler) {
    // PASSING SEARCH QUERY IN CONTROL RESULT FUNCTION
    handler(this._searchBar.value);

    // DISPLAYING PAGINATION
    this._pagination.classList.remove('hide');

    // Logo Animation
    this._logo.classList.add('header__img--animation');
  }

  _handleSubmit(handler) {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleRequest(handler);
    });

    this._searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this._handleRequest(handler);
    });
  }

  addHandlerMic(handler) {
    this._micBtn.addEventListener('click', () => {
      handler();
    });
  }

  // Rendering HTML On Page
  _render(data, resCount) {
    const markup = this._generateMarkup(data).join('');

    // Displaying Amount of Results
    this._resultsCount.textContent = `Displaying ${resCount} results`;

    // Rendering HTML
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // GENERATING HTML
  _generateMarkup(data) {
    return data.map((result) => {
      return `<li class="results__list--item">
      <div class="results__list--link">
        <a href=""
          ><span><a href="https://en.wikipedia.org/?curid=${
            result.pageid
          }" target="_blank">${result.title}</a></span></a
        >
      </div>

      <div class="results__link--info">
        <img
          src="${result.thumbnail ? result.thumbnail.source : ''}"
          alt=""
          class="results__list--img"
          width="${result.thumbnail ? result.thumbnail.width : '0px'}"
          height="${result.thumbnail ? result.thumbnail.height : '40px'}"
        />
        <p class="results__list--about">
          <a href="https://en.wikipedia.org/?curid=${
            result.pageid
          }" target="_blank">
             ${this._limitMaxWords(result.extract)}...
           </a
        </p>
      </div>
    </li>`;
    });
  }

  // LIMITING WORDS IN RESULT DESCRIPTION
  _limitMaxWords(str) {
    if (!str)
      return 'Sorry, API only allows summary of 20 results. You can click on the heading to get to the summary.';
    const arr = str.split(' ');
    if (arr.length > this.maxWords) {
      return arr.splice(0, this.maxWords).join(' ');
    } else {
      return arr.join(' ');
    }
  }
}

export default new DisplayResults();
