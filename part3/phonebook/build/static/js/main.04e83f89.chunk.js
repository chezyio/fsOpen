(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},39:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(2),o=t.n(c),r=t(15),a=t.n(r),u=(t(20),t(6)),i=t(3),s=t(4),l=t.n(s),d="/api/persons",b=function(){return l.a.get(d).then((function(e){return e.data}))},j=function(e){return l.a.post(d,e).then((function(e){return e.data}))},f=function(e){return l.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},h=function(e,n){return l.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data})).catch((function(e){return console.log(e)}))},m=(t(39),t(0)),O=function(e){var n=e.onChange,t=e.value;return Object(m.jsxs)("div",{children:["Filter shown with",Object(m.jsx)("input",{value:t,onChange:n})]})},v=function(e){var n=e.onSubmit,t=e.onNameChange,c=e.onNumberChange,o=e.nameValue,r=e.numberValue;return Object(m.jsxs)("form",{onSubmit:n,children:[Object(m.jsxs)("div",{children:["name: ",Object(m.jsx)("input",{value:o,onChange:t})]}),Object(m.jsxs)("div",{children:["number: ",Object(m.jsx)("input",{value:r,onChange:c})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"add"})})]})},p=function(e){var n=e.persons,t=e.search,c=e.handleDelete;return Object(m.jsx)("div",{children:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("p",{children:[e.name," ",e.number]},e.name),Object(m.jsx)("button",{onClick:function(){return c(e.id)},children:"delete"})]})}))})},x=function(e){var n=e.successMessage,t=e.errorMessage;return n||t?Object(m.jsx)("div",{className:"message ".concat(n?"success":"error"),children:n||t}):null},g=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],r=Object(c.useState)(""),a=Object(i.a)(r,2),s=a[0],l=a[1],d=Object(c.useState)(""),g=Object(i.a)(d,2),w=g[0],C=g[1],S=Object(c.useState)(""),k=Object(i.a)(S,2),y=k[0],N=k[1],T=Object(c.useState)(""),D=Object(i.a)(T,2),M=D[0],L=D[1],V=Object(c.useState)(""),E=Object(i.a)(V,2),F=E[0],I=E[1];Object(c.useEffect)((function(){b().then((function(e){o(e)})).catch((function(e){return alert(e)}))}),[]);return Object(m.jsxs)("div",{children:[Object(m.jsx)(x,{successMessage:F,errorMessage:M}),Object(m.jsx)("h2",{children:"Phonebook"}),Object(m.jsx)(O,{value:y,onChange:function(e){N(e.target.value)}}),Object(m.jsx)("h3",{children:"Add a new"}),Object(m.jsx)(v,{onSubmit:function(e){e.preventDefault(),console.log(s),console.log(w);var n=t.find((function(e){return e.name.toLowerCase()===s.toLowerCase()}));if(n&&n.number===w)return alert("".concat(s," is already added to phonebook")),l(""),void C("");if(n&&n.number!==w){if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))){var c=Object(u.a)(Object(u.a)({},n),{},{number:w}),r=n.id;return h(r,c).then((function(e){o(t.map((function(n){return n.id!==r?n:e}))),I("Updated ".concat(c.name,"'s number")),setTimeout((function(){I(null)}),5e3)})).catch((function(e){e.res.data?(L(e.res.data.error),setTimeout((function(){L(null)}),5e3)):(L("Information of ".concat(c.name," has already been removed from server")),o(t.filter((function(e){return e.id!==r}))),l(""),C(""),setTimeout((function(){L(null)}),5e3))})),l(""),void C("")}}else{var a={name:s,number:w};j(a).then((function(e){I("".concat(a.name," added to phonebook")),setTimeout((function(){L(null)}),5e3),o(t.concat(e)),l(""),C("")})).catch((function(e){L(e.res.data.error),setTimeout((function(){L(null)}),5e3)}))}},onNameChange:function(e){l(e.target.value)},onNumberChange:function(e){C(e.target.value)},nameValue:s,numberValue:w}),Object(m.jsx)("h3",{children:"Numbers"}),Object(m.jsx)(p,{persons:t,search:y,handleDelete:function(e){window.confirm("Do you really want to delete this person")&&f(e).then((function(){I("Deleted ".concat(t.find((function(n){return n.id===e})).name)),o(t.filter((function(n){return n.id!==e})))})).catch((function(e){L("".concat(e)),setTimeout((function(){L(null)}),5e3)}))}})]})};a.a.render(Object(m.jsx)(o.a.StrictMode,{children:Object(m.jsx)(g,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.04e83f89.chunk.js.map