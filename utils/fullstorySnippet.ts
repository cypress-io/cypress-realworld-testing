// The inline <head> scripts behind FullStory on learn.cypress.io. pages/_document.js
// renders them; they live here so tests/fullstory.spec.ts can run them against a fake
// window. The pattern is copied from docs.cypress.io (plugins/fullstory.js and
// plugins/osano.js in cypress-io/cypress-documentation), which records into the same
// FullStory org as www.cypress.io and Cypress Cloud.

const FULLSTORY_HOST = "fullstory.com"
const FULLSTORY_SCRIPT = "edge.fullstory.com/s/fs.js"
const FULLSTORY_NAMESPACE = "FS"

/**
 * SnippetSrc from @fullstory/snippet@2.1.0, copied verbatim. To upgrade, replace it
 * with the new version's SnippetSrc rather than editing the minified code.
 * JSON.stringify fills the arguments so each value lands as a quoted, escaped string.
 */
export const fullStorySnippet = (orgId: string): string => `
!function(m,n,e,t,l,o,g,y){var u,a,f=function(h){
return!(h in m)||(m.console&&m.console.log&&m.console.log("FullStory namespace conflict. Please use a different namespace."),!1)}(l)
;f&&(g=m[l]=function(){var b=function(b,d,j,r){r=r||2;var i,c=/Async$/;return c.test(b)&&(b=b.replace(c,""),
"function"==typeof Promise)?new Promise((function(i,c){h(b,d,j,i,c,r)})):h(b,d,j,i,i,r)};function h(h,d,j,r,i,c){
return b._api?b._api(h,d,j,r,i,c):(b.q&&b.q.push([h,d,j,r,i,c]),null)}return b.q=[],b}(),y=function(b){function h(h){
"function"==typeof h[4]&&h[4](new Error(b))}var d=g.q;if(d){for(var j=0;j<d.length;j++)h(d[j]);d.length=0,d.push=h}},function(){
var b="script",d=n.createElement(b);d.async=!0,d.crossOrigin="anonymous",d.src="https://"+t+"?org="+o,d.setAttribute("data-fs-namespace",l),
d.onerror=function(){y("Error loading "+t)};var c=n.getElementsByTagName(b)[0]
;c&&c.parentNode?c.parentNode.insertBefore(d,c):n.head.appendChild(d)}(),function(){function b(){}function h(b,h,d){g(b,h,d,1)}function d(b,d,j){
h("setProperties",{type:b,properties:d},j)}function j(b,h){d("user",b,h)}function r(b,h,d){j({uid:b},d),h&&j(h,d)}g.identify=r,g.setUserVars=j,
g.identifyAccount=b,g.clearUserCookie=b,g.setVars=d,g.event=function(b,d,j){h("trackEvent",{name:b,properties:d},j)},g.anonymize=function(){r(!1)
},g.shutdown=function(){h("shutdown")},g.restart=function(){h("restart")},g.log=function(b,d){h("log",{level:b,msg:d})},g.consent=function(b){
h("setIdentity",{consent:!arguments.length||b})}}(),u="fetch",a="XMLHttpRequest",g._w={},g._w[a]=m[a],g._w[u]=m[u],m[u]&&(m[u]=function(){
return g._w[u].apply(this,arguments)}),g("init",{env:{orgId:o,host:e,script:t}}),g._v="2.1.0")
}(window,document,${JSON.stringify(FULLSTORY_HOST)},${JSON.stringify(
  FULLSTORY_SCRIPT
)},${JSON.stringify(FULLSTORY_NAMESPACE)},${JSON.stringify(orgId)});
`

// Capture follows the visitor's Osano Analytics choice, including a change
// mid-session: Osano's own script blocking only takes effect on the next page load,
// so without this, fs.js keeps recording after a visitor declines. When osano.js is
// blocked (by an ad blocker, for example) there's no consent to read, so capture
// never starts.
export const fullStoryConsentGate = `
(function () {
  var fs = window[${JSON.stringify(FULLSTORY_NAMESPACE)}];
  // _v is only set when the snippet installed itself rather than backing off from
  // another script's global of the same name.
  if (!fs || !fs._v) return;
  fs('init', { env: { captureOnStartup: false } });
  var cm = window.Osano && window.Osano.cm;
  if (!cm || !cm.addEventListener || !cm.getConsent) return;
  var state = 'waiting';
  function apply(consent) {
    var granted = !!consent && consent.ANALYTICS === 'ACCEPT';
    if (granted && state === 'waiting') {
      fs('start');
      state = 'capturing';
    } else if (granted && state === 'stopped') {
      fs('restart');
      state = 'capturing';
    } else if (!granted && state === 'capturing') {
      fs('shutdown');
      state = 'stopped';
    }
  }
  cm.addEventListener('osano-cm-consent-saved', apply);
  apply(cm.getConsent());
})();
`

// Osano renders its dialog outside our HTML, so FullStory labels can't go in a
// template. The labels match docs.cypress.io and www.cypress.io, so one funnel covers
// the banner on all three sites. Clicks on the close button land on its inner <svg>,
// so every descendant gets the label too.
export const osanoFullStoryLabels = `
(function () {
  var LABELS = {
    '.osano-cm-button--type_accept': 'Cookie Consent - Accept All',
    '.osano-cm-button--type_denyAll': 'Cookie Consent - Deny All',
    '.osano-cm-button--type_deny': 'Cookie Consent - Deny All',
    '.osano-cm-button--type_manage': 'Cookie Consent - Manage Preferences',
    '.osano-cm-close': 'Cookie Consent - Dismiss'
  };
  function label(root) {
    if (!root) return;
    Object.keys(LABELS).forEach(function (selector) {
      root.querySelectorAll(selector).forEach(function (button) {
        [button].concat(Array.from(button.querySelectorAll('*'))).forEach(function (el) {
          el.setAttribute('data-fs-element', LABELS[selector]);
        });
      });
    });
  }
  var cm = window.Osano && window.Osano.cm;
  if (!cm || !cm.addEventListener) return;
  cm.addEventListener('osano-cm-ui-changed', function (component, stateChange) {
    if (component === 'dialog' && stateChange === 'show') {
      label(document.querySelector('.osano-cm-dialog'));
    }
  });
  // The dialog can mount before this listener attaches, so its 'show' event is already gone.
  label(document.querySelector('.osano-cm-dialog'));
})();
`
