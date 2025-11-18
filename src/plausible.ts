import { init } from '@plausible-analytics/tracker';

const isLocalhost =
  /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(location.hostname) ||
  location.protocol === 'file:';

if (!isLocalhost) {
  init({
    domain: location.origin.replace(/^https?:\/\//, ''),
  });
  console.debug('enabled plausible');
}
