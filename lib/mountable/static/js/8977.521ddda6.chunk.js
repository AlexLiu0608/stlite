(self.webpackChunkstlite=self.webpackChunkstlite||[]).push([[8977],{5262:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return H}});var i=n(16798),r=n(57994),a=n(98907),o=n(64428),s=n(82359),c=n(95764),h=n(30969),l=n(35897),u=n(15888),p=n.n(u),d=n(34192),m=n(42421),f=n(46220),w=n(46474),v=n(72620),g=n(19313),x=n(81507),b=n(93578),k=n(61400),Z=n(69031),S=n(98862),y=n(80845),j=n(82333),T=n(85358),V=n(10915),C=n(96961),E=n(84940),M=n(95803),O=n.n(M),F=n(1313),L=function(t){(0,o.Z)(n,t);var e=(0,s.Z)(n);function n(){return(0,r.Z)(this,n),e.apply(this,arguments)}return(0,a.Z)(n)}((0,E.Z)(Error)),N=function(t){(0,o.Z)(n,t);var e=(0,s.Z)(n);function n(){return(0,r.Z)(this,n),e.apply(this,arguments)}return(0,a.Z)(n)}((0,E.Z)(Error)),P=function(){function t(){(0,r.Z)(this,t)}return(0,a.Z)(t,null,[{key:"get",value:function(){var e=(0,T.Z)((0,j.Z)().mark((function e(n){var i,r,a;return(0,j.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=n.current,r=i.commandLine,a=i.userMapboxToken,t.token&&t.commandLine===r.toLowerCase()){e.next=10;break}if(""===a){e.next=6;break}t.token=a,e.next=9;break;case 6:return e.next=8,this.fetchToken("https://data.streamlit.io/tokens.json","mapbox");case 8:t.token=e.sent;case 9:t.commandLine=r.toLowerCase();case 10:return e.abrupt("return",t.token);case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"fetchToken",value:function(){var t=(0,T.Z)((0,j.Z)().mark((function t(e,n){var i,r,a;return(0,j.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,O().get(e);case 3:if(i=t.sent,null!=(r=i.data[n])&&""!==r){t.next=7;break}throw new Error('Missing token "'.concat(n,'"'));case 7:return t.abrupt("return",r);case 10:throw t.prev=10,t.t0=t.catch(0),a=(0,F.b)(t.t0),new N("".concat(a.message," (").concat(e,")"));case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e,n){return t.apply(this,arguments)}}()}]),t}();P.token=void 0,P.commandLine=void 0,P.isRunningLocal=function(){var t=window.location.hostname;return"localhost"===t||"127.0.0.1"===t};var I=n(47814),z=n.n(I),D=n(6195),A=n(37574),J=function(t){var e=t.error,n=t.width,i=t.deltaType;return e instanceof L?(0,A.jsx)(D.Z,{width:n,name:"No Mapbox token provided",message:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)("p",{children:["To use ",(0,A.jsxs)("code",{children:["st.",i]})," or ",(0,A.jsx)("code",{children:"st.map"})," you need to set up a Mapbox access token."]}),(0,A.jsxs)("p",{children:["To get a token, create an account at"," ",(0,A.jsx)("a",{href:"https://mapbox.com",children:"https://mapbox.com"}),". It's free for moderate usage levels!"]}),(0,A.jsxs)("p",{children:["Once you have a token, just set it using the Streamlit config option ",(0,A.jsx)("code",{children:"mapbox.token"})," and don't forget to restart your Streamlit server at this point if it's still running, then reload this tab."]}),(0,A.jsxs)("p",{children:["See"," ",(0,A.jsx)("a",{href:"https://docs.streamlit.io/library/advanced-features/configuration#view-all-configuration-options",children:"our documentation"})," ","for more info on how to set config options."]})]})}):e instanceof N?(0,A.jsx)(D.Z,{width:n,name:"Error fetching Streamlit Mapbox token",message:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("p",{children:"This app requires an internet connection."}),(0,A.jsx)("p",{children:"Please check your connection and try again."}),(0,A.jsxs)("p",{children:["If you think this is a bug, please file bug report"," ",(0,A.jsx)("a",{href:"https://github.com/streamlit/streamlit/issues/new/choose",children:"here"}),"."]})]})}):(0,A.jsx)(D.Z,{width:n,name:"Error fetching Streamlit Mapbox token",message:e.message})},B=function(t){return function(e){var n=function(n){(0,o.Z)(h,n);var i=(0,s.Z)(h);function h(n){var a;return(0,r.Z)(this,h),(a=i.call(this,n)).initMapboxToken=(0,T.Z)((0,j.Z)().mark((function t(){var e,n;return(0,j.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,P.get(a.props.sessionInfo);case 3:e=t.sent,a.setState({mapboxToken:e,isFetching:!1}),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),n=(0,F.b)(t.t0),a.setState({mapboxTokenError:n,isFetching:!1});case 11:case"end":return t.stop()}}),t,null,[[0,7]])}))),a.render=function(){var n=a.state,i=n.mapboxToken,r=n.mapboxTokenError,o=n.isFetching,s=a.props.width;return r?(0,A.jsx)(J,{width:s,error:r,deltaType:t}):o?(0,A.jsx)(V.Z,{body:"Loading...",kind:C.h.INFO,width:s}):(0,A.jsx)(e,(0,c.Z)((0,c.Z)({},a.props),{},{mapboxToken:i,width:s}))},a.state={isFetching:!0,mapboxToken:void 0,mapboxTokenError:void 0},a.initMapboxToken(),a}return(0,a.Z)(h)}(h.PureComponent);return n.displayName="withMapboxToken(".concat(e.displayName||e.name,")"),z()(n,e)}},q=n(32283),G=n(13137),R=(0,G.Z)("div",{target:"e1tsyoib1"})((function(t){var e=t.width,n=t.height;return{marginTop:t.theme.spacing.sm,position:"relative",height:n,width:e}}),""),W=(0,G.Z)("div",{target:"e1tsyoib0"})((function(t){var e=t.theme;return{position:"absolute",right:"2.625rem",top:e.spacing.md,zIndex:1,"button:not(:disabled)":{background:e.colors.bgColor,"& + button":{borderTopColor:e.colors.secondaryBg},"& span":{filter:(0,f.Iy)(e)?"":"invert(100%)"}}}}),""),X=(n(12815),{classes:(0,c.Z)((0,c.Z)((0,c.Z)((0,c.Z)({},w),x),g),b)});(0,S.fh)([k.w,Z.E]);var $=new v.Z({configuration:X}),_=function(t){(0,o.Z)(n,t);var e=(0,s.Z)(n);function n(){var t;(0,r.Z)(this,n);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))).state={viewState:{bearing:0,pitch:0,zoom:11},initialized:!1,initialViewState:{}},t.componentDidMount=function(){t.setState({initialized:!0})},t.createTooltip=function(e){var n=t.props.element;if(!e||!e.object||!n.tooltip)return!1;var i=JSON.parse(n.tooltip);return i.html?i.html=t.interpolate(e,i.html):i.text=t.interpolate(e,i.text),i},t.interpolate=function(t,e){var n=e.match(/{(.*?)}/g);return n&&n.forEach((function(n){var i=n.substring(1,n.length-1);t.object.hasOwnProperty(i)&&(e=e.replace(n,t.object[i]))})),e},t.onViewStateChange=function(e){var n=e.viewState;t.setState({viewState:n})},t}return(0,a.Z)(n,[{key:"render",value:function(){var t=n.getDeckObject(this.props),e=this.state.viewState;return(0,A.jsx)(R,{className:"stDeckGlJsonChart",width:t.initialViewState.width,height:t.initialViewState.height,children:(0,A.jsxs)(l.Z,{viewState:e,onViewStateChange:this.onViewStateChange,height:t.initialViewState.height,width:t.initialViewState.width,layers:this.state.initialized?t.layers:[],getTooltip:this.createTooltip,ContextProvider:d.X$.Provider,controller:!0,children:[(0,A.jsx)(d.Z3,{height:t.initialViewState.height,width:t.initialViewState.width,mapStyle:t.mapStyle&&("string"===typeof t.mapStyle?t.mapStyle:t.mapStyle[0]),mapboxApiAccessToken:this.props.mapboxToken}),(0,A.jsx)(W,{children:(0,A.jsx)(d.Pv,{className:"zoomButton",showCompass:!1})})]})})}}],[{key:"getDerivedStateFromProps",value:function(t,e){var r=n.getDeckObject(t);if(!p()(r.initialViewState,e.initialViewState)){var a=Object.keys(r.initialViewState).reduce((function(t,n){return r.initialViewState[n]===e.initialViewState[n]?t:(0,c.Z)((0,c.Z)({},t),{},(0,i.Z)({},n,r.initialViewState[n]))}),{});return{viewState:(0,c.Z)((0,c.Z)({},e.viewState),a),initialViewState:r.initialViewState}}return null}}]),n}(h.PureComponent);_.getDeckObject=function(t){var e=t.element,n=t.width,i=t.height,r=t.theme,a=JSON.parse(e.json);if(!(0,q.bb)(a.mapStyle)){var o=(0,f.Iy)(r)?"light":"dark";a.mapStyle="mapbox://styles/mapbox/".concat(o,"-v9")}return i?(a.initialViewState.height=i,a.initialViewState.width=n):(a.initialViewState.height||(a.initialViewState.height=500),e.useContainerWidth&&(a.initialViewState.width=n)),delete a.views,$.convert(a)};var H=(0,m.b)(B("st.pydeck_chart")((0,y.Z)(_)))},37398:function(){},85248:function(){}}]);
//# sourceMappingURL=8977.521ddda6.chunk.js.map