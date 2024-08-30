import{R as o,r as c,j as e,u as m,a as S,t as k,b as p,c as w,d as C,e as b,f}from"./index-dhdRb71v.js";function N(s){let[l,n]=c.useState();c.useEffect(()=>{s.showSettings==!0?n(e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",className:"bi bi-x-lg",viewBox:"0 0 16 16",children:e.jsx("path",{d:"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"})})):n(e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",className:"bi bi-gear",viewBox:"0 0 16 16",children:[e.jsx("path",{d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"}),e.jsx("path",{d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"})]}))},[s.showSettings]);function t(){s.setShowSettings(!s.showSettings)}return e.jsx("div",{className:"settings-menu-toggler-container",children:e.jsx("button",{className:"settings-menu-toggler",onClick:t,children:l})})}const v=o.memo(N);function M(s){let[l,n]=c.useState(!1);const t=m(),i=S(j=>j.settings),a=()=>{t(k())},r=()=>{t(p())},g=()=>{t(w())},d=()=>{t(C())},h=()=>{t(b())},x=()=>{t(f()),n(!0),setTimeout(()=>n(!1),3e3)},u=()=>{localStorage.clear(),window.location.reload(!0)};return e.jsx("div",{className:s.showSettings?"settings-menu show":"settings-menu",children:e.jsxs("ul",{children:[e.jsxs("li",{onClick:a,children:[e.jsx("h5",{children:"Dark mode"}),e.jsx("button",{className:i.darkMode?"toggler toggled":"toggler",children:e.jsx("div",{className:"circle"})})]}),e.jsxs("li",{onClick:r,children:[e.jsx("h5",{children:'"Feels like" field'}),e.jsx("button",{className:i.showFeelsLikeField?"toggler toggled":"toggler",children:e.jsx("div",{className:"circle"})})]}),e.jsxs("li",{onClick:g,children:[e.jsx("h5",{children:"Temperature in F°"}),e.jsx("button",{className:i.temperatureInF==!0?"toggler toggled":"toggler",children:e.jsx("div",{className:"circle"})})]}),e.jsxs("li",{onClick:d,children:[e.jsx("h5",{children:"Wind speed in m/s"}),e.jsx("button",{className:i.speedUnitinMS==!0?"toggler toggled":"toggler",children:e.jsx("div",{className:"circle"})})]}),e.jsxs("li",{onClick:h,children:[e.jsx("h5",{children:"Show seconds in clocks"}),e.jsx("button",{className:i.showSecondsInClocks?"toggler toggled":"toggler",children:e.jsx("div",{className:"circle"})})]}),e.jsxs("li",{children:[e.jsxs("h5",{children:["Reset Settings ",e.jsx("br",{}),e.jsx("span",{children:"(Try this if something not working properly)"})]}),e.jsx("button",{className:l?"reset-button resetted":"reset-button",onClick:x,children:l?"OK":"Reset"})]}),e.jsxs("li",{children:[e.jsxs("h5",{children:["Reset App ",e.jsx("br",{}),e.jsx("span",{children:"(Resets app settings, clears app local storage and reloads the page)"})]}),e.jsx("button",{className:"reset-button",onClick:u,children:'"Reset"'})]})]})})}const R=o.memo(M);function F(){let[s,l]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{showSettings:s,setShowSettings:l}),e.jsx(R,{showSettings:s})]})}const T=o.memo(F);export{T as default};
