(this["webpackJsonphuffman-encoding"]=this["webpackJsonphuffman-encoding"]||[]).push([[0],{28:function(t,e,n){},36:function(t,e,n){"use strict";n.r(e);var i=n(1),r=n(0),c=n.n(r),s=n(18),a=n.n(s),o=(n(28),n(19)),l=n(37),h=n(22),u=n(11),b=n(38),d=n(39),f=n(41),j=n(40),g=n(43),x=n(42),p=n(15),y=n(17),O=n(16),v=n(12),m=n(13),w=window.innerHeight/20,k=window.innerWidth/25,S=window.innerHeight/25,T=window.innerHeight/25,P=function(){function t(e,n,i,r,c){Object(v.a)(this,t),this.symbol=e,this.probability=n,this.col=i,this.row=r,this.parent=c,this.encoding=""}return Object(m.a)(t,[{key:"writeSymbol",value:function(){this.ctx.strokeStyle="white",this.ctx.font="18px Arial",this.ctx.fillText("S".concat(this.symbol),this.getX-S/2,this.getY+S/2)}},{key:"tracePath",value:function(t){this.ctx.strokeStyle="red",this.ctx.beginPath(),this.ctx.moveTo(this.getX,this.getY+S/2),this.ctx.lineTo(this.parent[t].getX+T,this.parent[t].getY+S/2),this.ctx.stroke()}},{key:"getX",get:function(){return k+this.col*T*4}},{key:"getY",get:function(){return w+this.row*S*2}},{key:"canvas",set:function(t){this._canvas=t,this.ctx=this._canvas.getContext("2d")}}]),t}(),C=function(t){Object(y.a)(n,t);var e=Object(O.a)(n);function n(t,i,r,c,s){var a;return Object(v.a)(this,n),(a=e.call(this,t,i,r,c,s)).type="SquareNode",a}return Object(m.a)(n,[{key:"draw",value:function(){this.ctx.fillStyle="#375a7f",this.ctx.fillRect(this.getX,this.getY,T,S),this.ctx.fillStyle="white",this.ctx.font="18px Arial",this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillText("".concat(this.probability),this.getX+T/2,this.getY+S/2)}},{key:"drawLink",value:function(){this.ctx.strokeStyle="white",this.ctx.setLineDash([5,3]),this.ctx.beginPath(),this.ctx.moveTo(this.getX,this.getY+S/2),this.ctx.lineTo(this.parent[0].getX+T,this.parent[0].getY+S/2),this.ctx.stroke(),this.ctx.setLineDash([0])}}]),n}(P),X=function(t){Object(y.a)(n,t);var e=Object(O.a)(n);function n(t,i,r,c,s){var a;return Object(v.a)(this,n),(a=e.call(this,t,i,r,c,s)).type="CircleNode",a}return Object(m.a)(n,[{key:"draw",value:function(){this.ctx.beginPath(),this.ctx.arc(this.getX+T/2,this.getY+S/2,T/2,0,2*Math.PI),this.ctx.fillStyle="#375a7f",this.ctx.fill(),this.ctx.fillStyle="white",this.ctx.font="18px Arial",this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillText("".concat(this.probability),this.getX+T/2,this.getY+S/2)}},{key:"drawLink",value:function(){this.ctx.strokeStyle="white",this.ctx.beginPath(),this.ctx.moveTo(this.getX,this.getY+S/2),this.ctx.lineTo(this.parent[0].getX+T,this.parent[0].getY+S/2),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(this.getX,this.getY+S/2),this.ctx.lineTo(this.parent[1].getX+T,this.parent[1].getY+S/2),this.ctx.stroke(),this.ctx.font="18px Arial",this.ctx.fillText(0,this.getX-5,this.getY+.3*S),this.ctx.fillText(1,this.getX-5,this.getY+S)}}]),n}(P);function Y(t){for(var e,n=[],i=t[t.length-1],r=t[t.length-2],c=0;c<t.length-2;c++)n.push(new C(t[c].symbol,t[c].probability,c,c,[t[c]]));return n.push(new X(i.symbol+r.symbol,(e=i.probability+r.probability,Math.round(100*e)/100),n.length,n.length,[r,i])),n.sort((function(t,e){return t.probability<=e.probability?1:-1})),n=function(t){for(var e=0;e<t.length;e++)for(var n=0;n<t.length-1;n++)if(t[n].probability==t[n+1].probability&&"CircleNode"==t[n+1].constructor.name){var i=t[n];t[n]=t[n+1],t[n+1]=i}return t}(n)}function H(t,e){null!=t&&t&&t.parent?"SquareNode"===t.type?H(t.parent[0],e):(H(t.parent[0],e+"0"),H(t.parent[1],e+"1")):t.encoding=e}var E=function(t,e){t.sort((function(t,e){return t.probability<=e.probability?1:-1}));for(var n=[t],i=t,r=0;i.length>1;r++){for(var c=0;c<i.length;c++)i[c].row=c,i[c].col=r,i[c].canvas=e,i[c].draw(),void 0!==i[c].parent&&i[c].drawLink();i=Y(i),n.push(i)}i[0].row=0,i[0].col=n.length-1,i[0].canvas=e,i[0].draw(),i[0].drawLink();var s=n[n.length-1][0];return H(s,""),s};var L=function(t){var e=Object(r.useRef)(null),n=t.nodes,c=t.encoding;return Object(r.useEffect)((function(){(null===e||void 0===e?void 0:e.current)&&(e.current.style.width="100%",e.current.style.height="100%",e.current.width=e.current.getBoundingClientRect().width,e.current.height=e.current.getBoundingClientRect().height)}),[]),Object(r.useEffect)((function(){if(null===e||void 0===e?void 0:e.current){var t,i=Object(p.a)(n);try{for(i.s();!(t=i.n()).done;){t.value.canvas=e.current}}catch(o){i.e(o)}finally{i.f()}if(e.current.getContext("2d").clearRect(0,0,1e4,1e4),n.length){var r=E(n,e.current);c&&function(t,e){for(var n=0;t.parent;)2===t.parent.length?(t.tracePath(e[n]),t=t.parent[e[n]],n++):(t.tracePath(0),t=t.parent[0])}(r,c);var s,a=Object(p.a)(n);try{for(a.s();!(s=a.n()).done;){s.value.writeSymbol()}}catch(o){a.e(o)}finally{a.f()}}}}),[e,n,c]),Object(i.jsx)("canvas",{id:"canvas",ref:e,style:{backgroundColor:"black"}})};var B=function(){return Object(i.jsxs)(f.a,{className:"text-center",children:[Object(i.jsx)(f.a.Header,{children:"Algorithm Description"}),Object(i.jsxs)(f.a.Body,{children:[Object(i.jsx)(f.a.Title,{style:{fontSize:"1.75rem"},children:"Huffman Encoding"}),Object(i.jsxs)(f.a.Text,{style:{fontSize:"1.1rem"},children:[Object(i.jsx)("p",{children:"The Huffman Encoding algorithm is an encoding algorithm for lossless data compression."}),Object(i.jsx)("p",{children:"It is a variable length code where symbols of higher probability and given shorter lengths."})]}),Object(i.jsx)(x.a,{variant:"primary",onClick:function(){return window.open("https://en.wikipedia.org/wiki/Huffman_coding")},children:"Read More"})]})]})};var M=function(){return Object(i.jsxs)(f.a,{className:"text-center",style:{marginTop:"2rem"},children:[Object(i.jsx)(f.a.Header,{children:"Useful Links"}),Object(i.jsxs)(f.a.Body,{children:[Object(i.jsx)(f.a.Title,{style:{fontSize:"1.75rem"},children:"Checkout My Other Works"}),Object(i.jsx)(f.a.Link,{href:"https://github.com/V-Wong/Huffman-Encoding",children:"Source Code"}),Object(i.jsx)(f.a.Link,{href:"https://vwong.dev/",children:"My Portfolio"}),Object(i.jsx)(f.a.Link,{href:"https://github.com/V-Wong",children:"My GitHub"})]})]})};var N=function(){var t=Object(r.useState)([]),e=Object(u.a)(t,2),n=e[0],c=e[1],s=Object(r.useState)([0,0,0,0,0,0,0,0]),a=Object(u.a)(s,2),o=a[0],p=(a[1],Object(r.useState)(["","","","","","","",""])),y=Object(u.a)(p,2),O=y[0],v=y[1],m=Object(r.useState)(""),w=Object(u.a)(m,2),k=w[0],S=w[1];return Object(r.useEffect)((function(){n.forEach((function(t,e){return 0!==t.probability?O[e]=t.encoding:null})),v(Object(h.a)(O))}),[n]),Object(i.jsx)(l.a,{fluid:!0,children:Object(i.jsxs)(b.a,{children:[Object(i.jsx)(d.a,{xs:10,children:Object(i.jsx)(L,{nodes:n.filter((function(t){return 0!==t.probability})),encoding:k})}),Object(i.jsxs)(d.a,{xs:2,children:[Object(i.jsx)(B,{}),Object(i.jsxs)(f.a,{className:"text-center",style:{marginTop:"2rem"},children:[Object(i.jsx)(f.a.Header,{children:"Probability Input Panel"}),Object(i.jsxs)(f.a.Body,{children:[Object(i.jsx)(f.a.Title,{style:{fontSize:"1.75rem"},children:"Enter Symbol Probabilities"}),o.map((function(t,e){return Object(i.jsxs)(j.a,{children:[Object(i.jsx)(j.a.Prepend,{onMouseOver:function(){return S(O[e])},children:Object(i.jsxs)(j.a.Text,{style:{width:"8rem",color:k&&k===O[e]?"red":"white"},children:["Encoding: ",O[e]]})}),Object(i.jsx)(g.a,{onChange:function(t){return o[e]=parseFloat(t.target.value)}})]})})),Object(i.jsxs)("div",{className:"buttons-container",children:[Object(i.jsx)(x.a,{variant:"success",size:"lg",block:!0,style:{marginTop:"1vh"},onClick:function(t){t.preventDefault(),function(){if(o.filter((function(t){return 0!==t})).length<2)window.alert("Please input at least 2 symbols");else if(Math.abs(o.reduce((function(t,e){return t+e}))-1)>=1e-5)window.alert("Please ensure probabilities sum to 1");else{var t=o.map((function(t,e){return new C(e,t,0,0)}));c(t)}}()},children:"Submit"}),Object(i.jsx)(x.a,{variant:"danger",size:"lg",block:!0,style:{marginTop:"1vh"},children:"Clear"})]})]})]}),Object(i.jsx)(M,{})]})]})})};n(35);var A=function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)(o.a,{children:[Object(i.jsx)("meta",{charSet:"utf-8"}),Object(i.jsx)("title",{children:"Huffman Encoding"}),Object(i.jsx)("meta",{name:"description",content:"Huffman Encoding tool for visualising the binary tree formed."}),Object(i.jsx)("meta",{name:"author",content:"Vincent Wong"}),Object(i.jsx)("meta",{name:"keywords",content:"Canvas, Huffman Encoding algorithm"}),Object(i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"})]}),Object(i.jsx)("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center"},children:Object(i.jsx)(l.a,{fluid:!0,children:Object(i.jsx)(N,{})})})]})},z=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,c=e.getLCP,s=e.getTTFB;n(t),i(t),r(t),c(t),s(t)}))};a.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(A,{})}),document.getElementById("root")),z()}},[[36,1,2]]]);
//# sourceMappingURL=main.0144ac8f.chunk.js.map