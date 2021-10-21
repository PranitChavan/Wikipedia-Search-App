import '../../node_modules/regenerator-runtime/runtime.js'; // POLYFILLING ASYNC FUNCTIONS
import '../../node_modules/core-js/stable'; // POLYFILLING EVERYTHING ELSE

// STATE OF CURRENT DATA
export const state = {
  results: [],
  page: 1,
};

/**
 *
 * @param {string} query Search query from the search bar
 * @returns {object} Objects of search results
 * @async
 */
export const getResults = async function (query) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrlimit=300&prop=pageimages|extracts&exintro&explaintext&exlimit=max&format=json&origin=*`
    );

    const data = await response.json();

    // If no results found for the query
    if (!data.query)
      throw new Error(
        `No results found for ${query.toUpperCase()}. Please try with something else.`
      );

    return data.query.pages;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {Number} page Page number that user clicks on the UI
 * @returns {(Object | Array)} Sliced array of objects according to the page
 */

// PAGINATION
export const pagination = function (page) {
  const start = (page - 1) * 10;
  const end = page * 10;

  // Slice the results array according to the requested page
  return state.results.slice(start, end);
};
