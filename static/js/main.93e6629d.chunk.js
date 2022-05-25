(window["webpackJsonpgym-app-admin"]=window["webpackJsonpgym-app-admin"]||[]).push([[0],{111:function(e,t,a){e.exports=a(139)},116:function(e,t,a){},139:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(16),c=a.n(i),o=(a(116),a(35)),l=a.n(o),s=a(51),u=a(12),m=a(8),d=a(13),p=a(14),h=a(15),f=a(225),v=a(92),b=a(220),g=a(219),E=a(224),x=a(140),y=Object(n.createContext)(null),O=a(84),w=a.n(O).a.create({baseURL:"http://localhost:3000",withCredentials:!0});w.defaults.headers.common.Authorization="";var j=w,k=a(85);var S=a(189),C=a(226),P=a(192),N=a(87),I=a.n(N),U=a(47),R=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.onLogin;return r.a.createElement(S.a,{component:"main",maxWidth:"xs"},r.a.createElement("div",{className:t.paper},r.a.createElement(C.a,{className:t.avatar},r.a.createElement(I.a,null)),r.a.createElement(U.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement(P.a,{type:"button",fullWidth:!0,variant:"contained",color:"primary",onClick:a,className:t.submit},"Sign In")))}}]),t}(n.Component),D=Object(x.a)(function(e){return Object(E.a)({paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},submit:{margin:e.spacing(3,0,2)}})})(R),F=a(88),W=a.n(F),M=a(215),V=a(216),A=a(142),B=a(91),z=a.n(B),L=a(227),T=a(217),G=a(204),H=a(144),J=a(218),q=a(29),Y=a(89),Q=a.n(Y),$=a(90),K=a.n($),X=a(223),Z=a(193),_=a(197),ee=a(196),te=a(194),ae=a(195),ne=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.exercises,n=e.onDelete,i=e.onEdit;return r.a.createElement(Z.a,null,r.a.createElement(te.a,null,r.a.createElement(ae.a,null,r.a.createElement(ee.a,{padding:"checkbox"},"id"),r.a.createElement(ee.a,null,"image"),r.a.createElement(ee.a,null,"video"),r.a.createElement(ee.a,null,"ratio"),r.a.createElement(ee.a,null,"unilateral"),r.a.createElement(ee.a,null,"name"),r.a.createElement(ee.a,null))),r.a.createElement(_.a,null,a.map(function(e){return r.a.createElement(ae.a,{key:e.id},r.a.createElement(ee.a,{padding:"checkbox",scope:"row"},e.id),r.a.createElement(ee.a,{scope:"row"},e.imageUrl&&r.a.createElement(C.a,{src:e.imageUrl,className:t.image})),r.a.createElement(ee.a,{scope:"row"},r.a.createElement(X.a,{disabled:!0,checked:null!==e.videoUrl})),r.a.createElement(ee.a,{scope:"row"},e.ratio),r.a.createElement(ee.a,{scope:"row"},r.a.createElement(X.a,{disabled:!0,checked:e.unilateral})),r.a.createElement(ee.a,{scope:"row"},e.name),r.a.createElement(ee.a,{scope:"row",className:t.optionsCell},r.a.createElement(A.a,{"aria-label":"delete",disabled:!0,onClick:function(){return n(e.id)}},r.a.createElement(Q.a,null)),r.a.createElement(A.a,{"aria-label":"edit",onClick:function(){return i(e.id)}},r.a.createElement(K.a,null))))})))}}]),t}(n.Component),re=Object(x.a)(function(e){return Object(E.a)({root:{},optionsCell:{textAlign:"right","& > *":{display:"inline-block"}},image:{width:60,height:60}})})(ne),ie=a(198),ce=a(213),oe=a(200),le=a(199),se=a(205),ue=a(228),me=a(209),de=a(208),pe=a(207),he=a(206),fe=a(210),ve=a(203),be=a(221),ge=a(212),Ee=a(229),xe=a(211),ye=a(66),Oe=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.message;return r.a.createElement(ye.a,{className:t.root},r.a.createElement("textarea",{defaultValue:a,className:t.textarea}))}}]),t}(n.Component),we=Object(x.a)(function(e){return Object(E.a)({root:{margin:e.spacing(1,2),backgroundColor:e.palette.error.dark,color:"white"},textarea:{fontFamily:"monospace",borderWidth:0,fontSize:"12px",background:"none",width:"100%",resize:"none",minHeight:"100px",color:"white"}})})(Oe),je=Object(x.a)(function(e){return Object(E.a)({root:{height:140,display:"flex",alignItems:"center",justifyContent:"center"}})})(function(e){var t=e.text,a=e.classes;return r.a.createElement(U.a,{variant:"body1",className:a.root},t)}),ke=function(e){function t(e){var a;Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).imageRef=Object(n.createRef)(),a.videoRef=Object(n.createRef)(),a.onSubmit=function(e){e.preventDefault();var t,n,r=e.currentTarget.elements,i=a.state,c=i.unilateral,o=i.primaryMuscle,l=i.scope;a.setState({loading:!0}),null!==a.imageRef.current&&a.imageRef.current.files[0]?t=a.imageRef.current.files[0]:a.state.imageUrl&&(t=a.state.imageUrl),null!==a.videoRef.current&&a.videoRef.current.files[0]?n=a.videoRef.current.files[0]:a.state.videoUrl&&(n=a.state.videoUrl),a.props.save({id:a.props.exercise?a.props.exercise.id:void 0,name:r.name.value,image:t,video:n,ratio:parseFloat(r.ratio.value),unilateral:c,primaryMuscle:o,scope:l}).then(function(e){a.setState({loading:!1}),a.props.onSubmit(e)}).catch(function(e){return a.setState({error:e.response.data.errors.message})})},a.onImageRemove=function(){a.setState({imageUrl:void 0}),null!==a.imageRef.current&&(a.imageRef.current.value="")},a.onVideoRemove=function(){a.setState({videoUrl:void 0}),null!==a.videoRef.current&&(a.videoRef.current.value="")},a.onImageFileInputChange=function(e){a.setState({imageUrl:URL.createObjectURL(e.currentTarget.files[0])})},a.onVideoFileInputChange=function(e){a.setState({videoUrl:URL.createObjectURL(e.currentTarget.files[0])})},a.onUnilateralChange=function(e){a.setState({unilateral:e.target.checked})},a.onPrimaryMuscleChange=function(e){a.setState({primaryMuscle:e.target.value})},a.onScopeChange=function(e){a.setState({scope:e.target.value})};var r=e.exercise,i={loading:!1,unilateral:!1};return r&&Object.assign(i,r),a.state=i,a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.onCancel,a=e.exercise,n=e.classes,i=this.state,c=i.error,o=i.loading,l=i.imageUrl,s=i.videoUrl,u=i.name,m=i.ratio,d=i.unilateral,p=i.primaryMuscle,h=i.scope;return r.a.createElement(ie.a,{open:!0,maxWidth:"sm",fullWidth:!0,onClose:o?void 0:t,"aria-labelledby":"form-dialog-title"},r.a.createElement(le.a,{id:"form-dialog-title"},void 0!==a?"Edit exercise":"Create exercise"),void 0!==c&&r.a.createElement(we,{message:c}),r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement(oe.a,null,r.a.createElement(ue.a,{defaultValue:u,autoFocus:!0,margin:"dense",required:!0,id:"name",label:"Name",type:"text",fullWidth:!0}),r.a.createElement(ue.a,{defaultValue:m,autoFocus:!0,margin:"dense",required:!0,id:"ratio",label:"Ratio",inputProps:{step:"0.01"},type:"number",fullWidth:!0}),r.a.createElement(se.a,{container:!0,spacing:2},r.a.createElement(se.a,{item:!0,sm:6},r.a.createElement(he.a,null,r.a.createElement(pe.a,null,l?r.a.createElement(de.a,{className:n.media,image:l}):r.a.createElement(je,{text:"Image"})),r.a.createElement(me.a,null,r.a.createElement(P.a,{size:"small",variant:"outlined",color:"secondary",disabled:void 0===l,onClick:this.onImageRemove},"Remove"),r.a.createElement("input",{className:n.uploadInput,id:"upload-image",type:"file",accept:"image/*",name:"image",onChange:this.onImageFileInputChange,ref:this.imageRef}),r.a.createElement("label",{htmlFor:"upload-image"},r.a.createElement(P.a,{size:"small",component:"span",variant:"outlined",color:"primary"},"Upload"))))),r.a.createElement(se.a,{item:!0,sm:6},r.a.createElement(he.a,null,r.a.createElement(pe.a,null,s?r.a.createElement(de.a,{component:"video",className:n.media,src:s,controls:!0}):r.a.createElement(je,{text:"Video"})),r.a.createElement(me.a,null,r.a.createElement(P.a,{size:"small",variant:"outlined",color:"secondary",disabled:void 0===s,onClick:this.onVideoRemove},"Remove"),r.a.createElement("input",{className:n.uploadInput,id:"upload-video",type:"file",accept:"video/*",name:"video",onChange:this.onVideoFileInputChange,ref:this.videoRef}),r.a.createElement("label",{htmlFor:"upload-video"},r.a.createElement(P.a,{size:"small",component:"span",variant:"outlined",color:"primary"},"Upload")))))),r.a.createElement(fe.a,{control:r.a.createElement(xe.a,{checked:d,onChange:this.onUnilateralChange,value:"unilateral",color:"primary"}),label:"Unilateral"}),r.a.createElement(ve.a,{fullWidth:!0},r.a.createElement(Ee.a,{id:"primary-muscle"},"Primary muscle"),r.a.createElement(be.a,{labelId:"primary-muscle",value:p||"",onChange:this.onPrimaryMuscleChange},r.a.createElement(ge.a,{value:""},"None"),r.a.createElement(ge.a,{value:"back"},"Back"),r.a.createElement(ge.a,{value:"chest"},"Chest"),r.a.createElement(ge.a,{value:"upper back"},"Upper back"),r.a.createElement(ge.a,{value:"shoulder"},"Shoulder"),r.a.createElement(ge.a,{value:"abs"},"Abs"),r.a.createElement(ge.a,{value:"hamstring"},"Hamstring"),r.a.createElement(ge.a,{value:"quads"},"Quads"),r.a.createElement(ge.a,{value:"glutes"},"Glutes"))),r.a.createElement(ve.a,{fullWidth:!0},r.a.createElement(Ee.a,{id:"scope"},"Scope"),r.a.createElement(be.a,{labelId:"scope",value:h||"",onChange:this.onScopeChange},r.a.createElement(ge.a,{value:""},"None"),r.a.createElement(ge.a,{value:"compound"},"Compound"),r.a.createElement(ge.a,{value:"isolated"},"Isolated")))),r.a.createElement(ce.a,null,r.a.createElement(P.a,{onClick:t,disabled:o,color:"primary"},"Cancel"),r.a.createElement(P.a,{type:"submit",disabled:o,color:"primary"},"Save"))))}}]),t}(n.Component),Se=Object(x.a)(function(e){return Object(E.a)({root:{},uploadInput:{display:"none"},media:{height:140,backgroundSize:"contain"},chips:{display:"flex",flexWrap:"wrap"},chip:{margin:2}})})(ke),Ce=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.onAddExercise;return r.a.createElement("div",null,r.a.createElement(P.a,{variant:"contained",color:"primary",className:t.button,onClick:a},"Add exercise"))}}]),t}(n.Component),Pe=Object(x.a)(function(e){return Object(E.a)({button:{margin:e.spacing(2),marginTop:0,"&:first-child":{marginLeft:0}}})})(Ce),Ne=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(ye.a,{className:e.root},r.a.createElement(U.a,{variant:"h5"},"No exercises"))}}]),t}(n.Component),Ie=Object(x.a)(function(e){return Object(E.a)({root:{padding:e.spacing(3,2)}})})(Ne);var Ue=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={exercises:void 0,newExerciseFormVisible:!1,editExerciseFormVisible:!1},a.unmountCallbacks=new Set,a.onDelete=function(e){a.cancelablePromise(j.delete("/admin/exercises/"+e)).then(function(t){a.setState({exercises:a.state.exercises.filter(function(t){return t.id!==e})})})},a.onEdit=function(e){a.setState({editExerciseFormVisible:!0,editedExercise:a.state.exercises.find(function(t){return t.id===e})})},a.onShowNewExerciseForm=function(){a.setState({newExerciseFormVisible:!0})},a.saveNewExercise=function(e){var t=new FormData;return t.append("name",e.name),t.append("ratio",e.ratio.toString()),t.append("unilateral",e.unilateral.toString()),t.append("primaryMuscle",e.primaryMuscle||""),t.append("scope",e.scope||""),"string"!==typeof e.image&&void 0!==e.image&&t.append("image",e.image),"string"!==typeof e.video&&void 0!==e.video&&t.append("video",e.video),a.cancelablePromise(j.post("/admin/exercises",t)).then(function(e){return e.data.exercise})},a.saveEditedExercise=function(e){var t=new FormData;return t.append("name",e.name),t.append("ratio",e.ratio.toString()),t.append("unilateral",e.unilateral.toString()),t.append("primaryMuscle",e.primaryMuscle||""),t.append("scope",e.scope||""),void 0!==e.image&&t.append("image",e.image),void 0!==e.video&&t.append("video",e.video),a.cancelablePromise(j.put("/admin/exercises/"+e.id,t)).then(function(e){return e.data.exercise})},a.addNewExercise=function(e){a.setState({newExerciseFormVisible:!1,exercises:[e].concat(a.state.exercises)})},a.updateEditedExercise=function(e){a.setState({editExerciseFormVisible:!1,exercises:a.state.exercises.map(function(t){return t.id===e.id?e:t})})},a.onCloseNewExerciseDialog=function(){a.setState({newExerciseFormVisible:!1})},a.onCloseEditExerciseDialog=function(){a.setState({editExerciseFormVisible:!1})},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"cancelablePromise",value:function(e){var t=this;return new Promise(function(a,n){var r=function(e){var t=function(){};return[Promise.race([new Promise(function(e){t=function(){return e({canceled:!0})}}),e]),t]}(e),i=Object(q.a)(r,2),c=i[0],o=i[1];c.then(function(e){e.canceled||a(e)}).catch(function(e){return n(e)}).finally(function(){t.unmountCallbacks.delete(o)})})}},{key:"componentDidMount",value:function(){var e=this;this.cancelablePromise(j.get("/admin/exercises")).then(function(t){e.setState({exercises:t.data.exercises})})}},{key:"componentWillUnmount",value:function(){this.unmountCallbacks.forEach(function(e){return e()})}},{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.exercises,n=t.newExerciseFormVisible,i=t.editExerciseFormVisible;return r.a.createElement("div",{className:e.root},r.a.createElement(Pe,{onAddExercise:this.onShowNewExerciseForm}),n&&r.a.createElement(Se,{onCancel:this.onCloseNewExerciseDialog,save:this.saveNewExercise,onSubmit:this.addNewExercise,exercises:a}),i&&r.a.createElement(Se,{onCancel:this.onCloseEditExerciseDialog,save:this.saveEditedExercise,exercise:this.state.editedExercise,onSubmit:this.updateEditedExercise,exercises:a}),void 0!==a?a.length?r.a.createElement(re,{onDelete:this.onDelete,onEdit:this.onEdit,exercises:a}):r.a.createElement(Ie,null):null)}}]),t}(n.Component),Re=Object(x.a)(function(e){return Object(E.a)({root:{width:"600px",maxWidth:"100%"}})})(Ue),De=a(222),Fe=a(214),We=function(e){function t(){var e,a;Object(u.a)(this,t);for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).textarea=Object(n.createRef)(),a.onSubmit=function(e){e.preventDefault();try{var t=e.currentTarget.elements.plan.value,n=JSON.parse(t);a.props.onSubmit(n)}catch(e){alert("Invalid JSON structure")}},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidUpdate",value:function(e){e.plan!==this.props.plan&&(this.textarea.current.value=JSON.stringify(this.props.plan,null,2))}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.plan,n=e.pending,i=e.error;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement(ue.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,multiline:!0,id:"plan",label:"Plan",inputProps:{ref:this.textarea},name:"plan",rows:30,defaultValue:JSON.stringify(a,null,2),disabled:n}),i?r.a.createElement(ye.a,{className:t.error},i):null,r.a.createElement(P.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",disabled:n},"Save")))}}]),t}(n.Component),Me=Object(x.a)(function(e){return Object(E.a)({error:{backgroundColor:e.palette.error.dark,color:"white",padding:e.spacing(1),marginTop:e.spacing(1),marginBottom:e.spacing(1)}})})(We);var Ve=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={plans:[],pending:!0,activePlanIndex:0},a.unmountCallbacks=new Set,a.onChangePlan=function(e){a.setState({activePlanIndex:e,error:void 0})},a.onSubmit=function(e){var t=a.state,n=t.activePlanIndex,r=t.plans;a.setState({error:void 0,pending:!0}),a.cancelablePromise(j.put("/admin/plans/".concat(r[n].id),{scheme:e})).then(function(){a.fetchPlans()}).catch(function(e){a.setState({pending:!1,error:e.response.data.message||e.response.data.error})})},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"cancelablePromise",value:function(e){var t=this;return new Promise(function(a,n){var r=function(e){var t=function(){};return[Promise.race([new Promise(function(e){t=function(){return e({canceled:!0})}}),e]),t]}(e),i=Object(q.a)(r,2),c=i[0],o=i[1];c.then(function(e){e.canceled||a(e)}).catch(function(e){return n(e)}).finally(function(){t.unmountCallbacks.delete(o)})})}},{key:"componentDidMount",value:function(){this.fetchPlans()}},{key:"fetchPlans",value:function(){var e=this;this.setState({pending:!0}),this.cancelablePromise(j.get("/admin/plans")).then(function(t){e.setState({plans:t.data.plans,pending:!1})})}},{key:"render",value:function(){var e=this,t=this.state,a=t.plans,n=t.activePlanIndex,i=t.pending,c=t.error;return 0===a.length?"Fetching...":r.a.createElement(r.a.Fragment,null,r.a.createElement(De.a,{value:n,onChange:function(t,a){return e.onChangePlan(a)},indicatorColor:"primary",textColor:"primary"},r.a.createElement(Fe.a,{label:"GYM",disabled:i}),r.a.createElement(Fe.a,{label:"HOME",disabled:i})),r.a.createElement(Me,{plan:a[n].scheme,onSubmit:this.onSubmit,pending:i,error:c}))}}]),t}(n.Component),Ae=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.users,a=e.classes;return r.a.createElement(Z.a,{className:a.root},r.a.createElement(te.a,null,r.a.createElement(ae.a,null,r.a.createElement(ee.a,{padding:"checkbox"},"position"),r.a.createElement(ee.a,{padding:"checkbox"},"id"),r.a.createElement(ee.a,null,"nickname"),r.a.createElement(ee.a,{padding:"checkbox"},"average"),r.a.createElement(ee.a,null,"last workout at"),r.a.createElement(ee.a,null,"last workout duration"),r.a.createElement(ee.a,null,"average workout duration"),r.a.createElement(ee.a,null,"cycle workouts"),r.a.createElement(ee.a,null,"total workouts"),r.a.createElement(ee.a,null,"plan ID"),r.a.createElement(ee.a,null,"cycle"),r.a.createElement(ee.a,null,"registered at"),r.a.createElement(ee.a,null,"weight"),r.a.createElement(ee.a,null,"height"),r.a.createElement(ee.a,null,"gender"),r.a.createElement(ee.a,null,"active"))),r.a.createElement(_.a,null,t.map(function(e,t){return r.a.createElement(ae.a,{key:e.id},r.a.createElement(ee.a,{padding:"checkbox",scope:"row"},t+1),r.a.createElement(ee.a,{padding:"checkbox",scope:"row"},e.id.slice(0,15)),r.a.createElement(ee.a,{scope:"row"},r.a.createElement("div",{style:{maxWidth:50,overflow:"auto"}},e.nickname)),r.a.createElement(ee.a,{scope:"row"},parseFloat(e.average.toFixed(3))),r.a.createElement(ee.a,{scope:"row"},e.lastWorkoutDate),r.a.createElement(ee.a,{scope:"row"},void 0!==e.lastWorkoutDuration&&"".concat(Math.floor(e.lastWorkoutDuration/60)," mins")),r.a.createElement(ee.a,{scope:"row"},void 0!==e.averageWorkoutDuration&&"".concat(Math.floor(e.averageWorkoutDuration/60)," mins")),r.a.createElement(ee.a,{scope:"row"},e.cycleWorkouts),r.a.createElement(ee.a,{scope:"row"},e.totalWorkouts),r.a.createElement(ee.a,{scope:"row"},e.PlanId),r.a.createElement(ee.a,{scope:"row"},e.cycle),r.a.createElement(ee.a,{scope:"row"},e.createdAt.slice(0,10)),r.a.createElement(ee.a,{scope:"row"},void 0!==e.weight&&e.weight/100),r.a.createElement(ee.a,{scope:"row"},void 0!==e.height&&e.height/100),r.a.createElement(ee.a,{scope:"row"},e.gender),r.a.createElement(ee.a,{padding:"checkbox",scope:"row"},r.a.createElement(X.a,{disabled:!0,checked:e.active})))})))}}]),t}(n.Component),Be=Object(x.a)(function(e){return Object(E.a)({root:{"& td, & th":{border:"1px solid black",padding:"1em"},"& td":{whiteSpace:"nowrap"}},optionsCell:{textAlign:"right","& > *":{display:"inline-block"}}})})(Ae);var ze=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={users:void 0},a.unmountCallbacks=new Set,a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"cancelablePromise",value:function(e){var t=this;return new Promise(function(a,n){var r=function(e){var t=function(){};return[Promise.race([new Promise(function(e){t=function(){return e({canceled:!0})}}),e]),t]}(e),i=Object(q.a)(r,2),c=i[0],o=i[1];c.then(function(e){e.canceled||a(e)}).catch(function(e){return n(e)}).finally(function(){t.unmountCallbacks.delete(o)})})}},{key:"componentDidMount",value:function(){var e=this;this.cancelablePromise(j.get("/admin/users")).then(function(t){e.setState({users:t.data.users})})}},{key:"componentWillUnmount",value:function(){this.unmountCallbacks.forEach(function(e){return e()})}},{key:"render",value:function(){var e=this.props.classes,t=this.state.users;return r.a.createElement("div",{className:e.root},void 0!==t?r.a.createElement(Be,{onDelete:function(){},onEdit:function(){},users:t}):null)}}]),t}(n.Component),Le=Object(x.a)(function(e){return Object(E.a)({root:{width:"600px",maxWidth:"100%"}})})(ze),Te=[{id:"exercises",label:"Exercises",Component:Re},{id:"plans",label:"Plans",Component:Ve},{id:"users",label:"Users",Component:Le}],Ge=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={activePage:"plans"},a.changePage=function(e){a.setState({activePage:e})},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.onLogout,i=Te.find(function(t){return t.id===e.state.activePage}).Component;return r.a.createElement("div",{className:a.root},r.a.createElement(M.a,{position:"absolute",className:W()(a.appBar)},r.a.createElement(V.a,{className:a.toolbar},r.a.createElement(U.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:a.title},"Dashboard"),r.a.createElement(A.a,{color:"inherit",title:"Logout",onClick:n},r.a.createElement(z.a,null)))),r.a.createElement(L.a,{variant:"permanent",classes:{paper:a.drawerPaper},open:!0},r.a.createElement("div",{className:a.appBarSpacer}),r.a.createElement(T.a,null),r.a.createElement(G.a,null,Te.map(function(t){var a=t.id,n=t.label;return r.a.createElement(H.a,{button:!0,key:a,selected:e.state.activePage===a,onClick:function(){return e.changePage(a)}},r.a.createElement(J.a,{primary:n}))}))),r.a.createElement("main",{className:a.content},r.a.createElement("div",{className:a.appBarSpacer}),r.a.createElement("div",{className:a.container},r.a.createElement(i,null))))}}]),t}(n.Component),He=Object(x.a)(function(e){return Object(E.a)({root:{display:"flex",height:"100vh"},appBar:{zIndex:e.zIndex.drawer+1,textAlign:"left"},content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingLeft:e.spacing(4),paddingRight:e.spacing(4),paddingTop:e.spacing(4)},appBarSpacer:e.mixins.toolbar,appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)")},toolbar:{paddingRight:24},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240}})})(Ge),Je=Object(v.a)(),qe=Object(x.a)(function(e){return Object(E.a)({root:{width:"500px",height:"200px",display:"flex",alignItems:"center",justifyContent:"center",margin:"200px auto 0"}})})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(g.a,null))}),Ye=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).authService=void 0,a.authService=function(){var e=new k.a.WebAuth({domain:"dev-s7fblfh1.us.auth0.com",clientID:"2ISnxtwY1MdD7O1bP7fjBU3IGvR4gUBs"});return{checkSession:function(){var t=Object(s.a)(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise(function(t,a){e.checkSession({responseType:"token",redirectUri:"http://localhost:5000",audience:"http://localhost:3000"},function(e,n){null===e?t(n.accessToken):a(e)})}));case 1:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),authorize:function(){e.authorize({responseType:"token",redirectUri:"http://localhost:5000",audience:"http://localhost:3000"})},logout:function(){e.logout({clientID:"2ISnxtwY1MdD7O1bP7fjBU3IGvR4gUBs",returnTo:"http://localhost:5000"})},parseHash:function(){var t=Object(s.a)(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise(function(t,a){e.parseHash({hash:window.location.hash},function(e,n){e?a(e):t(null!==n?n.accessToken:null),history.replaceState({},document.title,".")})}));case 1:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}()}}(),a.state={loading:!0,loggedIn:!1},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(s.a)(l.a.mark(function e(){var t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.authService.parseHash();case 2:if(null!==(t=e.sent)){e.next=13;break}return e.prev=4,e.next=7,this.authService.checkSession();case 7:t=e.sent,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(4),this.setState({loading:!1});case 13:t&&(j.interceptors.request.use(function(e){return e.headers.Authorization="Bearer ".concat(t),e}),this.setState({loggedIn:!0,loading:!1}));case 14:case"end":return e.stop()}},e,this,[[4,10]])}));return function(){return e.apply(this,arguments)}}()},{key:"renderContent",value:function(){return this.state.loading?r.a.createElement(qe,null):this.state.loggedIn?r.a.createElement(He,{onLogout:this.authService.logout}):r.a.createElement(D,{onLogin:this.authService.authorize})}},{key:"render",value:function(){return r.a.createElement(b.a,{theme:Je},r.a.createElement(y.Provider,{value:this.authService},r.a.createElement(f.a,null),r.a.createElement("div",{className:"App"},this.renderContent())))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Ye,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[111,1,2]]]);
//# sourceMappingURL=main.93e6629d.chunk.js.map