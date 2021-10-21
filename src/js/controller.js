import { async } from 'regenerator-runtime';
import '../../node_modules/core-js/stable';

import { getResults, state, pagination } from './model';
import DisplayResults from './views/resultView.js';
import * as themes from './views/themeView.js';
import * as PaginationFunc from './views/paginationView.js';

// controlling recived data
const controlResults = async function (query) {
  try {
    const dataObj = await getResults(query);

    // converting objects of objects into array of objets and sorting them according to have have extarcts(summary) first
    const data = Object.entries(dataObj)
      .map((entry) => {
        return entry[1];
      })
      .sort((a, _b) => {
        if (a.extract) {
          return -1;
        } else {
          return 1;
        }
      });

    state.results = [...data];

    // passing the initial data of 10 results to render on page
    DisplayResults._render(pagination(1), data.length);

    // Render pagination buttons
    PaginationFunc.renderPagination();
  } catch (err) {
    alert(err.message);
  }
};

const controlPagination = function (page) {
  // Render Results according to the page clicked by user
  DisplayResults._render(pagination(page), state.results.length);
};

function init() {
  // ControlResults is called when user submits the form
  DisplayResults._handleSubmit(controlResults);
  // When user clicks on pagination buttons
  PaginationFunc.handlerPag(controlPagination);
}

init();
