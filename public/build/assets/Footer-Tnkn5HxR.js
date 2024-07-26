import{j as r,r as a,m as j,a as D}from"./app-LB1XR0Q5.js";import{n as se,f as ue,e as ye,N as Pe,E as we,y as Se,I as z,a as ve,u as ne,s as oe,O as G,M as R,b as Ee,h as Ne,T as je,o as A,r as be,c as $e,d as L,g as ae}from"./use-root-containers-DyAKLgTX.js";import{l as le,O as X,U as V,y as q,T as Ie,s as fe,o as w,a as ke,u as H,d as K,C as Y,b as xe,I as Te,q as Ce}from"./transition-Bof0buh3.js";const Fe=({...e})=>r.jsx("img",{src:"/logo-home1.webp",alt:"Logo",...e}),Me=Fe;function me(e){var t;if(e.type)return e.type;let u=(t=e.as)!=null?t:"button";if(typeof u=="string"&&u.toLowerCase()==="button")return"button"}function Oe(e,t){let[u,m]=a.useState(()=>me(e));return le(()=>{m(me(e))},[e.type,e.as]),le(()=>{u||t.current&&t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&m("button")},[u,t]),u}var Be=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Be||{}),_e=(e=>(e[e.TogglePopover=0]="TogglePopover",e[e.ClosePopover=1]="ClosePopover",e[e.SetButton=2]="SetButton",e[e.SetButtonId=3]="SetButtonId",e[e.SetPanel=4]="SetPanel",e[e.SetPanelId=5]="SetPanelId",e))(_e||{});let De={0:e=>{let t={...e,popoverState:H(e.popoverState,{0:1,1:0})};return t.popoverState===0&&(t.__demoMode=!1),t},1(e){return e.popoverState===1?e:{...e,popoverState:1}},2(e,t){return e.button===t.button?e:{...e,button:t.button}},3(e,t){return e.buttonId===t.buttonId?e:{...e,buttonId:t.buttonId}},4(e,t){return e.panel===t.panel?e:{...e,panel:t.panel}},5(e,t){return e.panelId===t.panelId?e:{...e,panelId:t.panelId}}},ie=a.createContext(null);ie.displayName="PopoverContext";function ee(e){let t=a.useContext(ie);if(t===null){let u=new Error(`<${e} /> is missing a parent <Popover /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(u,ee),u}return t}let ce=a.createContext(null);ce.displayName="PopoverAPIContext";function de(e){let t=a.useContext(ce);if(t===null){let u=new Error(`<${e} /> is missing a parent <Popover /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(u,de),u}return t}let pe=a.createContext(null);pe.displayName="PopoverGroupContext";function he(){return a.useContext(pe)}let te=a.createContext(null);te.displayName="PopoverPanelContext";function Re(){return a.useContext(te)}function Le(e,t){return H(t.type,De,e,t)}let Ae="div";function Ge(e,t){var u;let{__demoMode:m=!1,...$}=e,s=a.useRef(null),n=q(t,Ie(i=>{s.current=i})),v=a.useRef([]),h=a.useReducer(Le,{__demoMode:m,popoverState:m?0:1,buttons:v,button:null,buttonId:null,panel:null,panelId:null,beforePanelSentinel:a.createRef(),afterPanelSentinel:a.createRef()}),[{popoverState:g,button:d,buttonId:S,panel:l,panelId:B,beforePanelSentinel:k,afterPanelSentinel:y},c]=h,b=se((u=s.current)!=null?u:d),I=a.useMemo(()=>{if(!d||!l)return!1;for(let Q of document.querySelectorAll("body > *"))if(Number(Q==null?void 0:Q.contains(d))^Number(Q==null?void 0:Q.contains(l)))return!0;let i=ue(),T=i.indexOf(d),Z=(T+i.length-1)%i.length,W=(T+1)%i.length,J=i[Z],ge=i[W];return!l.contains(J)&&!l.contains(ge)},[d,l]),C=fe(S),M=fe(B),O=a.useMemo(()=>({buttonId:C,panelId:M,close:()=>c({type:1})}),[C,M,c]),F=he(),_=F==null?void 0:F.registerPopover,p=w(()=>{var i;return(i=F==null?void 0:F.isFocusWithinPopoverGroup())!=null?i:(b==null?void 0:b.activeElement)&&((d==null?void 0:d.contains(b.activeElement))||(l==null?void 0:l.contains(b.activeElement)))});a.useEffect(()=>_==null?void 0:_(O),[_,O]);let[E,x]=ye(),o=Pe({mainTreeNodeRef:F==null?void 0:F.mainTreeNodeRef,portals:E,defaultContainers:[d,l]});we(b==null?void 0:b.defaultView,"focus",i=>{var T,Z,W,J;i.target!==window&&i.target instanceof HTMLElement&&g===0&&(p()||d&&l&&(o.contains(i.target)||(Z=(T=k.current)==null?void 0:T.contains)!=null&&Z.call(T,i.target)||(J=(W=y.current)==null?void 0:W.contains)!=null&&J.call(W,i.target)||c({type:1})))},!0),Se(o.resolveContainers,(i,T)=>{c({type:1}),Ne(T,je.Loose)||(i.preventDefault(),d==null||d.focus())},g===0);let f=w(i=>{c({type:1});let T=i?i instanceof HTMLElement?i:"current"in i&&i.current instanceof HTMLElement?i.current:d:d;T==null||T.focus()}),N=a.useMemo(()=>({close:f,isPortalled:I}),[f,I]),P=a.useMemo(()=>({open:g===0,close:f}),[g,f]),U={ref:n};return j.createElement(te.Provider,{value:null},j.createElement(ie.Provider,{value:h},j.createElement(ce.Provider,{value:N},j.createElement(ke,{value:H(g,{0:K.Open,1:K.Closed})},j.createElement(x,null,Y({ourProps:U,theirProps:$,slot:P,defaultTag:Ae,name:"Popover"}),j.createElement(o.MainTreeNode,null))))))}let He="button";function ze(e,t){let u=z(),{id:m=`headlessui-popover-button-${u}`,...$}=e,[s,n]=ee("Popover.Button"),{isPortalled:v}=de("Popover.Button"),h=a.useRef(null),g=`headlessui-focus-sentinel-${z()}`,d=he(),S=d==null?void 0:d.closeOthers,l=Re()!==null;a.useEffect(()=>{if(!l)return n({type:3,buttonId:m}),()=>{n({type:3,buttonId:null})}},[l,m,n]);let[B]=a.useState(()=>Symbol()),k=q(h,t,l?null:o=>{if(o)s.buttons.current.push(B);else{let f=s.buttons.current.indexOf(B);f!==-1&&s.buttons.current.splice(f,1)}s.buttons.current.length>1&&console.warn("You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported."),o&&n({type:2,button:o})}),y=q(h,t),c=se(h),b=w(o=>{var f,N,P;if(l){if(s.popoverState===1)return;switch(o.key){case A.Space:case A.Enter:o.preventDefault(),(N=(f=o.target).click)==null||N.call(f),n({type:1}),(P=s.button)==null||P.focus();break}}else switch(o.key){case A.Space:case A.Enter:o.preventDefault(),o.stopPropagation(),s.popoverState===1&&(S==null||S(s.buttonId)),n({type:0});break;case A.Escape:if(s.popoverState!==0)return S==null?void 0:S(s.buttonId);if(!h.current||c!=null&&c.activeElement&&!h.current.contains(c.activeElement))return;o.preventDefault(),o.stopPropagation(),n({type:1});break}}),I=w(o=>{l||o.key===A.Space&&o.preventDefault()}),C=w(o=>{var f,N;be(o.currentTarget)||e.disabled||(l?(n({type:1}),(f=s.button)==null||f.focus()):(o.preventDefault(),o.stopPropagation(),s.popoverState===1&&(S==null||S(s.buttonId)),n({type:0}),(N=s.button)==null||N.focus()))}),M=w(o=>{o.preventDefault(),o.stopPropagation()}),O=s.popoverState===0,F=a.useMemo(()=>({open:O}),[O]),_=Oe(e,h),p=l?{ref:y,type:_,onKeyDown:b,onClick:C}:{ref:k,id:s.buttonId,type:_,"aria-expanded":s.popoverState===0,"aria-controls":s.panel?s.panelId:void 0,onKeyDown:b,onKeyUp:I,onClick:C,onMouseDown:M},E=ve(),x=w(()=>{let o=s.panel;if(!o)return;function f(){H(E.current,{[L.Forwards]:()=>G(o,R.First),[L.Backwards]:()=>G(o,R.Last)})===ae.Error&&G(ue().filter(N=>N.dataset.headlessuiFocusGuard!=="true"),H(E.current,{[L.Forwards]:R.Next,[L.Backwards]:R.Previous}),{relativeTo:s.button})}f()});return j.createElement(j.Fragment,null,Y({ourProps:p,theirProps:$,slot:F,defaultTag:He,name:"Popover.Button"}),O&&!l&&v&&j.createElement(ne,{id:g,features:oe.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:x}))}let qe="div",Ke=X.RenderStrategy|X.Static;function Ue(e,t){let u=z(),{id:m=`headlessui-popover-overlay-${u}`,...$}=e,[{popoverState:s},n]=ee("Popover.Overlay"),v=q(t),h=xe(),g=h!==null?(h&K.Open)===K.Open:s===0,d=w(l=>{if(be(l.currentTarget))return l.preventDefault();n({type:1})}),S=a.useMemo(()=>({open:s===0}),[s]);return Y({ourProps:{ref:v,id:m,"aria-hidden":!0,onClick:d},theirProps:$,slot:S,defaultTag:qe,features:Ke,visible:g,name:"Popover.Overlay"})}let We="div",Ve=X.RenderStrategy|X.Static;function Ye(e,t){let u=z(),{id:m=`headlessui-popover-panel-${u}`,focus:$=!1,...s}=e,[n,v]=ee("Popover.Panel"),{close:h,isPortalled:g}=de("Popover.Panel"),d=`headlessui-focus-sentinel-before-${z()}`,S=`headlessui-focus-sentinel-after-${z()}`,l=a.useRef(null),B=q(l,t,p=>{v({type:4,panel:p})}),k=se(l),y=Te();le(()=>(v({type:5,panelId:m}),()=>{v({type:5,panelId:null})}),[m,v]);let c=xe(),b=c!==null?(c&K.Open)===K.Open:n.popoverState===0,I=w(p=>{var E;switch(p.key){case A.Escape:if(n.popoverState!==0||!l.current||k!=null&&k.activeElement&&!l.current.contains(k.activeElement))return;p.preventDefault(),p.stopPropagation(),v({type:1}),(E=n.button)==null||E.focus();break}});a.useEffect(()=>{var p;e.static||n.popoverState===1&&((p=e.unmount)==null||p)&&v({type:4,panel:null})},[n.popoverState,e.unmount,e.static,v]),a.useEffect(()=>{if(n.__demoMode||!$||n.popoverState!==0||!l.current)return;let p=k==null?void 0:k.activeElement;l.current.contains(p)||G(l.current,R.First)},[n.__demoMode,$,l,n.popoverState]);let C=a.useMemo(()=>({open:n.popoverState===0,close:h}),[n,h]),M={ref:B,id:m,onKeyDown:I,onBlur:$&&n.popoverState===0?p=>{var E,x,o,f,N;let P=p.relatedTarget;P&&l.current&&((E=l.current)!=null&&E.contains(P)||(v({type:1}),((o=(x=n.beforePanelSentinel.current)==null?void 0:x.contains)!=null&&o.call(x,P)||(N=(f=n.afterPanelSentinel.current)==null?void 0:f.contains)!=null&&N.call(f,P))&&P.focus({preventScroll:!0})))}:void 0,tabIndex:-1},O=ve(),F=w(()=>{let p=l.current;if(!p)return;function E(){H(O.current,{[L.Forwards]:()=>{var x;G(p,R.First)===ae.Error&&((x=n.afterPanelSentinel.current)==null||x.focus())},[L.Backwards]:()=>{var x;(x=n.button)==null||x.focus({preventScroll:!0})}})}E()}),_=w(()=>{let p=l.current;if(!p)return;function E(){H(O.current,{[L.Forwards]:()=>{var x;if(!n.button)return;let o=ue(),f=o.indexOf(n.button),N=o.slice(0,f+1),P=[...o.slice(f+1),...N];for(let U of P.slice())if(U.dataset.headlessuiFocusGuard==="true"||(x=n.panel)!=null&&x.contains(U)){let i=P.indexOf(U);i!==-1&&P.splice(i,1)}G(P,R.First,{sorted:!1})},[L.Backwards]:()=>{var x;G(p,R.Previous)===ae.Error&&((x=n.button)==null||x.focus())}})}E()});return j.createElement(te.Provider,{value:m},b&&g&&j.createElement(ne,{id:d,ref:n.beforePanelSentinel,features:oe.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:F}),Y({mergeRefs:y,ourProps:M,theirProps:s,slot:C,defaultTag:We,features:Ve,visible:b,name:"Popover.Panel"}),b&&g&&j.createElement(ne,{id:S,ref:n.afterPanelSentinel,features:oe.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:_}))}let Ze="div";function Je(e,t){let u=a.useRef(null),m=q(u,t),[$,s]=a.useState([]),n=Ee(),v=w(y=>{s(c=>{let b=c.indexOf(y);if(b!==-1){let I=c.slice();return I.splice(b,1),I}return c})}),h=w(y=>(s(c=>[...c,y]),()=>v(y))),g=w(()=>{var y;let c=$e(u);if(!c)return!1;let b=c.activeElement;return(y=u.current)!=null&&y.contains(b)?!0:$.some(I=>{var C,M;return((C=c.getElementById(I.buttonId.current))==null?void 0:C.contains(b))||((M=c.getElementById(I.panelId.current))==null?void 0:M.contains(b))})}),d=w(y=>{for(let c of $)c.buttonId.current!==y&&c.close()}),S=a.useMemo(()=>({registerPopover:h,unregisterPopover:v,isFocusWithinPopoverGroup:g,closeOthers:d,mainTreeNodeRef:n.mainTreeNodeRef}),[h,v,g,d,n.mainTreeNodeRef]),l=a.useMemo(()=>({}),[]),B=e,k={ref:m};return j.createElement(pe.Provider,{value:S},Y({ourProps:k,theirProps:B,slot:l,defaultTag:Ze,name:"Popover.Group"}),j.createElement(n.MainTreeNode,null))}let Qe=V(Ge),Xe=V(ze),et=V(Ue),tt=V(Ye),rt=V(Je),re=Object.assign(Qe,{Button:Xe,Overlay:et,Panel:tt,Group:rt});function nt({title:e,titleId:t,...u},m){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:m,"aria-labelledby":t},u),e?a.createElement("title",{id:t},e):null,a.createElement("path",{fillRule:"evenodd",d:"M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))}const ot=a.forwardRef(nt),at=({checkActive:e=!0,href:t,className:u,children:m})=>{const s=window.location.pathname===t&&e,n=["border-b-2 uppercase",u,s?"border-white":"border-transparent"].filter(v=>v);return r.jsx("a",{href:t,className:n.join(" "),style:{color:"black",fontSize:"1.2rem",fontWeight:"bold"},children:m})},lt=at;function st({auth:e}){return r.jsxs(re,{className:"relative",children:[r.jsxs(re.Button,{className:"inline-flex items-center text-sm font-semibold leading-6 text-white gap-x-1",children:[r.jsx("span",{className:"hover:underline",children:"Admin"}),r.jsx(ot,{className:"w-5 h-5","aria-hidden":"true"})]}),r.jsx(Ce,{as:a.Fragment,enter:"transition ease-out duration-200",enterFrom:"opacity-0 translate-y-1",enterTo:"opacity-100 translate-y-0",leave:"transition ease-in duration-150",leaveFrom:"opacity-100 translate-y-0",leaveTo:"opacity-0 translate-y-1",children:r.jsx(re.Panel,{className:"absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left-1/2 max-w-max",children:r.jsx("div",{className:"flex-auto overflow-hidden text-sm leading-6 bg-green-300 bg-opacity-25 shadow-lg max-w-max rounded-3xl ring-1 ring-gray-900/5",children:r.jsx("div",{className:"p-4",children:e.user?r.jsxs(lt,{href:route("dashboard"),className:"text-sm font-semibold leading-6 text-black hover:underline",children:["Panel Inicio"," ",r.jsx("span",{"aria-hidden":"true",children:"→"})]}):r.jsx(r.Fragment,{children:r.jsx("div",{children:r.jsx(D,{href:route("login"),className:"text-sm font-semibold leading-6 text-black hover:underline",children:"Iniciar Sesión"})})})})})})})]})}function dt({auth:e}){return r.jsx("footer",{className:"py-8 text-white bg-green-700",children:r.jsxs("div",{className:"container px-4 mx-auto",children:[r.jsxs("div",{className:"flex flex-col items-center md:flex-row md:justify-between",children:[r.jsx("div",{className:"mb-4 md:mb-0",children:r.jsx(Me,{className:"w-auto h-12 sm:h-16"})}),r.jsxs("div",{className:"flex flex-col items-center md:flex-row md:space-x-8",children:[r.jsx(D,{href:"/",target:"_blank",rel:"noopener noreferrer",className:"mb-2 text-white md:mb-0 hover:text-gray-300",children:"Inicio"}),r.jsx(D,{href:route("producto.list"),target:"_blank",rel:"noopener noreferrer",className:"mb-2 text-white md:mb-0 hover:text-gray-300",children:"Productos"}),r.jsx(D,{href:route("sede.list"),target:"_blank",rel:"noopener noreferrer",className:"mb-2 text-white md:mb-0 hover:text-gray-300",children:"Sedes"}),r.jsx(D,{href:route("pagos.index"),target:"_blank",rel:"noopener noreferrer",className:"mb-2 text-white md:mb-0 hover:text-gray-300",children:"Medios de Pagos"}),r.jsx(st,{auth:e})]})]}),r.jsxs("div",{className:"flex flex-col items-center mt-6 md:flex-row md:justify-between",children:[r.jsxs("div",{className:"mb-4 text-center md:mb-0 md:text-left",children:[r.jsx("p",{className:"mb-2",children:"© 2024 Futuras Estrellas, administrada por Alianza Sureña. Todos los derechos reservados."}),r.jsxs("p",{className:"mb-2",children:["Este proyecto está licenciado bajo la ",r.jsx("a",{href:"/LICENSE",className:"underline hover:text-gray-300",children:"Licencia Apache 2.0"}),"."]}),r.jsxs("p",{children:["Desarrollado por Victor Alfonso Delgado Bolaños"," ",r.jsx("a",{href:"https://www.linkedin.com/in/v%C3%ADctor-alfonso-83046184/",target:"_blank",rel:"noopener noreferrer",className:"hover:text-gray-300",children:r.jsx("i",{className:"fab fa-linkedin-in"})})," ","como parte de su pasantía en la empresa Alianza Sureña."]})]}),r.jsxs("div",{className:"flex flex-col items-center md:flex-row md:space-x-4",children:[r.jsx(D,{href:route("politicasPrivacidad.index"),target:"_blank",rel:"noopener noreferrer",className:"mb-2 text-white md:mb-0 hover:text-gray-300",children:"Política de privacidad"}),r.jsx(D,{href:route("terminosCondiciones.index"),target:"_blank",rel:"noopener noreferrer",className:"mb-2 text-white md:mb-0 hover:text-gray-300",children:"Términos y condiciones"}),r.jsx(D,{href:route("PoliticaCokies.index"),target:"_blank",rel:"noopener noreferrer",className:"mb-2 text-white md:mb-0 hover:text-gray-300",children:"Aviso de cookies"})]})]}),r.jsxs("div",{className:"flex justify-center mt-6 space-x-4",children:[r.jsx("a",{href:"https://www.facebook.com/oscararmando.futurasestrellas",target:"_blank",rel:"noopener noreferrer",className:"text-white hover:text-gray-300",children:r.jsx("i",{className:"fab fa-facebook-f"})}),r.jsx("a",{href:"https://www.instagram.com/osbolka1965/",target:"_blank",rel:"noopener noreferrer",className:"text-white hover:text-gray-300",children:r.jsx("i",{className:"fab fa-instagram"})})]})]})})}export{re as C,dt as F,lt as H,Me as L};
