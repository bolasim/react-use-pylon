// @ts-nocheck
/**
 * Snippet to initialize the Pylon instance
 *
 * @param appId - Pylon app id
 * @param [timeout=0] - Amount of milliseconds that the initialization should be delayed, defaults to 0
 *
 * @see {@link https://docs.usepylon.com/chat/setup}
 */
const initialize = (appId: string, timeout = 0) => {
  var e = window;
  var t = document;
  var n = function () {
    n.e(arguments);
  };
  n.q = [];
  n.e = function (e) {
    n.q.push(e);
  };
  e.Pylon = n;
  e.pylon = {};
  var r = function () {
    var e = t.createElement('script');
    e.setAttribute('type', 'text/javascript');
    e.setAttribute('async', 'true');
    e.setAttribute(
      'src',
      `https://widget.usepylon.com/widget/${appId}`,
    );
    var n = t.getElementsByTagName('script')[0];
    n.parentNode.insertBefore(e, n);
  };
  if (t.readyState === 'complete') {
    r();
  } else if (e.addEventListener) {
    e.addEventListener('load', r, false);
  }
};

export default initialize;
