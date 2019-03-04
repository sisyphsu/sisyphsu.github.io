$(document).ready(function(){NexT.motion={};var i={lines:[],push:function(i){this.lines.push(i)},init:function(){this.lines.forEach(function(i){i.init()})},arrow:function(){this.lines.forEach(function(i){i.arrow()})},close:function(){this.lines.forEach(function(i){i.close()})}};function t(i){this.el=$(i.el),this.status=$.extend({},{init:{width:"100%",opacity:1,left:0,rotateZ:0,top:0}},i.status)}t.prototype.init=function(){this.transform("init")},t.prototype.arrow=function(){this.transform("arrow")},t.prototype.close=function(){this.transform("close")},t.prototype.transform=function(i){this.el.velocity("stop").velocity(this.status[i])};var e=new t({el:".sidebar-toggle-line-first",status:{arrow:{width:"50%",rotateZ:"-45deg",top:"2px"},close:{width:"100%",rotateZ:"-45deg",top:"5px"}}}),o=new t({el:".sidebar-toggle-line-middle",status:{arrow:{width:"90%"},close:{opacity:0}}}),n=new t({el:".sidebar-toggle-line-last",status:{arrow:{width:"50%",rotateZ:"45deg",top:"-2px"},close:{width:"100%",rotateZ:"45deg",top:"-5px"}}});i.push(e),i.push(o),i.push(n);var s,r,a=CONFIG.sidebar.width?CONFIG.sidebar.width:"320px";({toggleEl:$(".sidebar-toggle"),dimmerEl:$("#sidebar-dimmer"),sidebarEl:$(".sidebar"),isSidebarVisible:!1,init:function(){this.toggleEl.on("click",this.clickHandler.bind(this)),this.dimmerEl.on("click",this.clickHandler.bind(this)),this.toggleEl.on("mouseenter",this.mouseEnterHandler.bind(this)),this.toggleEl.on("mouseleave",this.mouseLeaveHandler.bind(this)),this.sidebarEl.on("touchstart",this.touchstartHandler.bind(this)),this.sidebarEl.on("touchend",this.touchendHandler.bind(this)),this.sidebarEl.on("touchmove",function(i){i.preventDefault()}),$(document).on("sidebar.isShowing",function(){NexT.utils.isDesktop()&&$("body").velocity("stop").velocity({paddingRight:a},100)}).on("sidebar.isHiding",function(){})},clickHandler:function(){this.isSidebarVisible?this.hideSidebar():this.showSidebar(),this.isSidebarVisible=!this.isSidebarVisible},mouseEnterHandler:function(){this.isSidebarVisible||i.arrow()},mouseLeaveHandler:function(){this.isSidebarVisible||i.init()},touchstartHandler:function(i){s=i.originalEvent.touches[0].clientX,r=i.originalEvent.touches[0].clientY},touchendHandler:function(i){var t=i.originalEvent.changedTouches[0].clientX,e=i.originalEvent.changedTouches[0].clientY;t-s>30&&Math.abs(e-r)<20&&this.clickHandler()},showSidebar:function(){var t=this;i.close(),this.sidebarEl.velocity("stop").velocity({width:a},{display:"block",duration:100,begin:function(){$(".sidebar .motion-element").velocity("transition.slideRightIn",{stagger:50,drag:!0,complete:function(){t.sidebarEl.trigger("sidebar.motion.complete")}})},complete:function(){t.sidebarEl.addClass("sidebar-active"),t.sidebarEl.trigger("sidebar.didShow")}}),this.sidebarEl.trigger("sidebar.isShowing")},hideSidebar:function(){NexT.utils.isDesktop()&&$("body").velocity("stop").velocity({paddingRight:0}),this.sidebarEl.find(".motion-element").velocity("stop").css("display","none"),this.sidebarEl.velocity("stop").velocity({width:0},{display:"none"}),i.init(),this.sidebarEl.removeClass("sidebar-active"),this.sidebarEl.trigger("sidebar.isHiding"),$(".post-toc-wrap")&&("block"===$(".site-overview-wrap").css("display")?$(".post-toc-wrap").removeClass("motion-element"):$(".post-toc-wrap").addClass("motion-element"))}}).init(),NexT.motion.integrator={queue:[],cursor:-1,add:function(i){return this.queue.push(i),this},next:function(){this.cursor++;var i=this.queue[this.cursor];$.isFunction(i)&&i(NexT.motion.integrator)},bootstrap:function(){this.next()}},NexT.motion.middleWares={logo:function(i){var t=[],e=$(".brand"),o=$(".custom-logo-image"),n=$(".site-title"),s=$(".site-subtitle"),r=$(".logo-line-before i"),a=$(".logo-line-after i");function l(i){return(i=Array.isArray(i)?i:[i]).every(function(i){return i.length>0})}function c(i,t){return{e:$(i),p:{translateX:t},o:{duration:250,sequenceQueue:!1}}}function d(){t.push({e:o,p:{opacity:1,top:0},o:{duration:100}})}e.length>0&&t.push({e:e,p:{opacity:1},o:{duration:100}}),NexT.utils.isMist()&&l([r,a])&&t.push(c(r,"100%"),c(a,"-100%")),NexT.utils.isMuse()&&l(o)&&d(),l(n)&&t.push({e:n,p:{opacity:1,top:0},o:{duration:100}}),l(s)&&t.push({e:s,p:{opacity:1,top:0},o:{duration:100}}),(NexT.utils.isPisces()||NexT.utils.isGemini())&&l(o)&&d(),CONFIG.motion.async&&i.next(),t.length>0?(t[t.length-1].o.complete=function(){i.next()},$.Velocity.RunSequence(t)):i.next()},menu:function(i){CONFIG.motion.async&&i.next(),$(".menu-item").velocity("transition.slideDownIn",{display:null,duration:100,complete:function(){i.next()}})},postList:function(i){var t,e=$(".post-block, .pagination, .comments"),o=CONFIG.motion.transition.post_block,n=$(".post-header"),s=CONFIG.motion.transition.post_header,r=$(".post-body"),a=CONFIG.motion.transition.post_body,l=$(".collection-title, .archive-year"),c=CONFIG.motion.transition.coll_header,d=$(".sidebar-inner"),u=CONFIG.motion.transition.sidebar;e.length>0?((t=window.postMotionOptions||{stagger:100,drag:!0}).complete=function(){CONFIG.motion.transition.sidebar&&(NexT.utils.isPisces()||NexT.utils.isGemini())&&d.css({transform:"initial"}),i.next()},CONFIG.motion.transition.post_block&&e.velocity("transition."+o,t),CONFIG.motion.transition.post_header&&n.velocity("transition."+s,t),CONFIG.motion.transition.post_body&&r.velocity("transition."+a,t),CONFIG.motion.transition.coll_header&&l.velocity("transition."+c,t),CONFIG.motion.transition.sidebar&&(NexT.utils.isPisces()||NexT.utils.isGemini())&&d.velocity("transition."+u,t)):i.next(),CONFIG.motion.async&&i.next()},sidebar:function(i){"always"===CONFIG.sidebar.display&&NexT.utils.displaySidebar(),i.next()}}});