import RSVP from 'rsvp';
import { createLoadElement, nodeLoader } from './utilities';

/**
 * Default loader function for JS assets. Loads them by inserting a script tag
 * with onload/onerror handlers that correspond to the resolve/reject callbacks
 * of the return Promise.
 *
 * @param {String} uri
 * @param {String} reload
 * @return {Promise}
 */
export default nodeLoader(function js(uri, retry) {
  return new RSVP.Promise((resolve, reject) => {
    let node = document.querySelector(`script[src="${uri}"]`);

    // Force refreshing the script by deleting the DOM node.
    if (node && retry) {
      node.remove();
      node = null;
    }

    if (node) {
      return resolve();
    }

    const script = createLoadElement('script', resolve, reject);

    script.src = uri;
    script.async = false;

    document.head.appendChild(script);
  });
});
