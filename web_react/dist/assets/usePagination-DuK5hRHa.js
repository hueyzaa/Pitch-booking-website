import{r as c,ao as W,b9 as te,aU as ae,ba as ie,aZ as oe,_ as z,bb as le,bc as re,ak as se,al as ce,ag as de,a_ as me,bd as ue,be as he,an as pe,j as A,bf as ge,s as e,F as $,aB as fe,n as xe,ad as M,aW as R,aX as V,M as P,O as ve,aD as E,T as _,R as Ce,C as L,D as w,bg as be,bh as ye,bi as je}from"./index-Cgakiq8m.js";import{B as F}from"./BaseForm-D5lkQNcM.js";import{B as U}from"./BaseInput-BYNuzrse.js";import{T as ke}from"./Table-B7MDX9aS.js";import{B as H}from"./BaseInputNumber-CJykYXwZ.js";import{D as X,o as we,a as Te,B as Se}from"./select-configs-lPJfSuMg.js";import{C as B}from"./index-C0uWM2M9.js";var Ye=function(o){var u=o.prefixCls,d=o.okButtonProps,s=o.cancelButtonProps,p=o.title,g=o.cancelText,f=o.okText,T=o.okType,j=o.icon,S=o.showCancel,v=S===void 0?!0:S,Y=o.close,t=o.onConfirm,i=o.onCancel,r=c.useContext(W),m=r.getPrefixCls;return c.createElement(te,{componentName:"Popconfirm",defaultLocale:ae.Popconfirm},function(a){return c.createElement("div",{className:"".concat(u,"-inner-content")},c.createElement("div",{className:"".concat(u,"-message")},j&&c.createElement("span",{className:"".concat(u,"-message-icon")},j),c.createElement("div",{className:"".concat(u,"-message-title")},ie(p))),c.createElement("div",{className:"".concat(u,"-buttons")},v&&c.createElement(oe,z({onClick:i,size:"small"},s),g??a.cancelText),c.createElement(le,{buttonProps:z(z({size:"small"},re(T)),d),actionFn:t,close:Y,prefixCls:m("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},f??a.okText)))})},I=void 0,De=function(n,o){var u={};for(var d in n)Object.prototype.hasOwnProperty.call(n,d)&&o.indexOf(d)<0&&(u[d]=n[d]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,d=Object.getOwnPropertySymbols(n);s<d.length;s++)o.indexOf(d[s])<0&&Object.prototype.propertyIsEnumerable.call(n,d[s])&&(u[d[s]]=n[d[s]]);return u},Pe=c.forwardRef(function(n,o){var u=n.prefixCls,d=n.placement,s=d===void 0?"top":d,p=n.trigger,g=p===void 0?"click":p,f=n.okType,T=f===void 0?"primary":f,j=n.icon,S=j===void 0?c.createElement(he,null):j,v=n.children,Y=n.overlayClassName,t=n.onOpenChange,i=n.onVisibleChange,r=De(n,["prefixCls","placement","trigger","okType","icon","children","overlayClassName","onOpenChange","onVisibleChange"]),m=c.useContext(W),a=m.getPrefixCls,x=se(!1,{value:n.open!==void 0?n.open:n.visible,defaultValue:n.defaultOpen!==void 0?n.defaultOpen:n.defaultVisible}),C=ce(x,2),l=C[0],h=C[1],b=function(y,k){h(y,!0),i==null||i(y,k),t==null||t(y,k)},D=function(y){b(!1,y)},J=function(y){var k;return(k=n.onConfirm)===null||k===void 0?void 0:k.call(I,y)},G=function(y){var k;b(!1,y),(k=n.onCancel)===null||k===void 0||k.call(I,y)},Q=function(y){y.keyCode===pe.ESC&&l&&b(!1,y)},K=function(y){var k=n.disabled,N=k===void 0?!1:k;N||b(y)},q=a("popover",u),ee=a("popconfirm",u),ne=de(ee,Y);return c.createElement(me,z({},r,{trigger:g,prefixCls:q,placement:s,onOpenChange:K,open:l,ref:o,overlayClassName:ne,_overlay:c.createElement(Ye,z({okType:T,icon:S},n,{prefixCls:q,close:D,onConfirm:J,onCancel:G}))}),ue(v,{onKeyDown:function(y){var k,N;c.isValidElement(v)&&((N=v==null?void 0:(k=v.props).onKeyDown)===null||N===void 0||N.call(k,y)),Q(y)}}))}),ze={locale:"vi_VN",today:"Hôm nay",now:"Bây giờ",backToToday:"Trở về hôm nay",ok:"OK",clear:"Xóa",month:"Tháng",year:"Năm",timeSelect:"Chọn thời gian",dateSelect:"Chọn ngày",weekSelect:"Chọn tuần",monthSelect:"Chọn tháng",yearSelect:"Chọn năm",decadeSelect:"Chọn thập kỷ",yearFormat:"YYYY",dateFormat:"D/M/YYYY",dayFormat:"D",dateTimeFormat:"D/M/YYYY HH:mm:ss",monthBeforeYear:!0,previousMonth:"Tháng trước (PageUp)",nextMonth:"Tháng sau (PageDown)",previousYear:"Năm trước (Control + left)",nextYear:"Năm sau (Control + right)",previousDecade:"Thập kỷ trước",nextDecade:"Thập kỷ sau",previousCentury:"Thế kỷ trước",nextCentury:"Thế kỷ sau"},Oe={placeholder:"Chọn thời gian"},Ne={lang:z({placeholder:"Chọn thời điểm",rangePlaceholder:["Ngày bắt đầu","Ngày kết thúc"]},ze),timePickerLocale:z({},Oe)};const Ee=A(ge)`
  .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: var(--disabled-color);
  }

  .ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }

  &.ant-pagination.ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }
  & .ant-select-arrow {
    color: var(--disabled-color);
  }

  .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    color: var(--disabled-color);
  }
`,_e=n=>e.jsx(Ee,{...n}),Be=A(ke)`
  & thead .ant-table-cell {
    color: var(--primary-color);
    font-size: ${$.xs};
    line-height: 1.25rem;
    text-align: center !important;
    & .anticon {
      color: var(--primary-color);
    }
  }

  & tbody .ant-table-cell {
    color: var(--text-main-color);
    font-size: ${$.xs};
    line-height: 1.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & tbody .ant-table-row-expand-icon {
    min-height: 1.25rem;
    min-width: 1.25rem;
    border-radius: 0.1875rem;
    margin-top: 0;
  }

  // Override default antd selector
  &
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    background-color: var(--primary-color);
  }

  & .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-item {
    min-width: 2.0625rem;
    height: 2.0625rem;
    line-height: 2.0625rem;
    border-radius: 0;
    font-size: ${$.xs};
  }

  & .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    border-radius: 0;
  }

  & .ant-checkbox-inner {
    border-radius: 0.1875rem;
    height: 1.25rem;
    width: 1.25rem;
    border: 1px solid var(--primary-color);
  }

  & .editable-row .ant-form-item-explain {
    top: 100%;
    font-size: 0.75rem;
  }

  .ant-table-column-sort {
    background-color: transparent;
  }

  .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: var(--disabled-color);
  }

  .ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }

  .ant-pagination.ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }
`,Me=n=>e.jsx(Be,{...n}),$e=A(Me)`
  .ant-form-item-control-input {
    min-height: unset;
  }
  .ant-table-cell {
    padding: 8px;
  }
`,Re=A(_e)`
  margin: 8px 0;
  text-align: center;
  & .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-item {
    min-width: 2.0625rem;
    height: 2.0625rem;
    line-height: 2.0625rem;
    border-radius: 8px;
    font-size: ${$.xxs};
    button {
      border-radius: 2px;
    }
  }
  & .ant-pagination-disabled .ant-pagination-item-link,
  .ant-pagination-disabled:focus-visible .ant-pagination-item-link,
  .ant-pagination-disabled:hover .ant-pagination-item-link {
    background-color: #ccc;
  }
  & .ant-pagination-item-active {
    border-radius: 2px;
  }
  & .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 33px;
    border-radius: 2px;
  }
  & .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 32px;
  }
`,Z=fe.createContext(null),Ve=({...n})=>{const[o]=F.useForm();return e.jsx(F,{form:o,component:!1,children:e.jsx(Z.Provider,{value:o,children:e.jsx("tr",{...n})})})},He=({title:n,editable:o,children:u,dataIndex:d,record:s,inputType:p,handleSave:g,data:f,...T})=>{const[j,S]=c.useState(!1),v=c.useRef(null),Y=c.useContext(Z),t=()=>{switch(p){case"number":return e.jsx(H,{size:"small",ref:v,onPressEnter:a,onBlur:a,parser:V,formatter:R,className:"w-full"});case"date":return e.jsx(X,{size:"small",locale:Ne,ref:v,format:"DD/MM/YYYY",onBlur:a,onChange:a,className:"w-full"});case"select":return e.jsx(M,{options:f,className:"w-full",ref:v,size:"small",onBlur:a});default:return e.jsx(U,{size:"small",ref:v,className:"w-full",onPressEnter:a,onBlur:a})}};c.useEffect(()=>{var h;j&&((h=v.current)==null||h.focus())},[j]);const i=()=>{S(!j);let h=null;if(s)h=s;else return!1;p==="date"&&Object.keys(h).forEach(b=>{h[b]&&(/ngay_|_ngay/.test(b)||/ngay/.test(b)||/thoi_gian|_thoi/.test(b))&&(h[b]=P(h[b],"HH:mm:ss"))}),Y.setFieldsValue({[d]:h[d]})},[r,m]=c.useState(!1),a=()=>{m(!0)},x=async()=>{try{const h=await Y.validateFields();i(),g({...s,...h}),m(!1)}catch(h){xe.error({message:h})}},C=()=>{m(!1),S(!1)};let l=u;return o&&(l=j?e.jsx(Pe,{title:"Bạn có muốn lưu không",open:r,onConfirm:x,onCancel:C,children:e.jsx(F.Item,{name:d,rules:[{required:!0,message:`${n} không được bỏ trống.`}],children:t()})}):e.jsx("div",{onClick:i,className:"px-[7px] cursor-pointer",role:"presentation",children:u})),e.jsx("td",{...T,children:l})},Ze=({defaultColumns:n,dataTable:o,handleSave:u,rowKey:d,rowSelection:s,filter:p,loading:g,scroll:f={x:1e3},handlePageChange:T,handleLimitChange:j,total:S})=>{const v={body:{row:Ve,cell:He}},Y=n.map(t=>t.editable?{...t,onCell:i=>({record:i,editable:t.editable,dataIndex:t.dataIndex,title:t.title,inputType:t.inputType,data:t.data,handleSave:u})}:t);return e.jsxs(e.Fragment,{children:[e.jsx($e,{scroll:f,components:v,rowClassName:()=>"editable-row",bordered:!0,loading:g,pagination:!1,dataSource:o,columns:Y,rowKey:d,rowSelection:s,tableLayout:"fixed"}),S?e.jsx(Re,{current:p==null?void 0:p.page,total:S,pageSize:p==null?void 0:p.limit,onChange:T,onShowSizeChange:(t,i)=>{p&&j&&j(i)},showSizeChanger:!0,defaultPageSize:p==null?void 0:p.limit,showTotal:t=>`Tổng cộng ${t} bản ghi`}):null]})},Ae=({mode:n,path:o,filter:u,placeholder:d,disabled:s,reload:p,value:g,style:f,onChange:T})=>{const[j,S]=c.useState([{value:"",label:""}]);return c.useEffect(()=>{async function v(){const Y=await ve(o,u),t=Y.map(i=>({...i,value:i.id||i.value,label:i.ten||i.name||i.label}));Y.length!==0&&S(t)}v()},[u,o,p]),e.jsx(M,{options:j,placeholder:d,mode:n,showSearch:!0,allowClear:!0,size:"small",onChange:T,value:g,disabled:s,style:f})},Je=()=>{const[n,o]=c.useState([]),[u,d]=c.useState("between"),[s,p]=c.useState("equal"),g=(t,i,r,m)=>()=>{if(!t[0])return;const a=n.filter(x=>x.field!==i);r==="between"?t[0]&&a.push({field:i,operator:r,value:JSON.stringify(t[0])}):a.push({field:i,operator:r,value:t[0]||""}),o(a)},f=(t,i)=>{const r=n.filter(m=>m.field!==i);o(r),t()};return{inputSearch:({dataIndex:t,operator:i="contain",nameColumn:r})=>({filterDropdown:({setSelectedKeys:m,selectedKeys:a,clearFilters:x,close:C})=>e.jsxs(B,{size:8,direction:"vertical",style:{padding:8},onKeyDown:l=>l.stopPropagation(),children:[r&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',r,'"']})}),e.jsx(U,{placeholder:"Nhập nội dung",value:a[0],onChange:l=>m(l.target.value?[l.target.value]:[]),onPressEnter:g(a,t,i)}),e.jsxs("div",{children:[e.jsx(w,{type:"primary",onClick:g(a,t,i),size:"small",children:"Tìm"})," ",e.jsx(w,{onClick:()=>x&&f(x,t),size:"small",children:"Làm mới"}),e.jsx(w,{type:"text",size:"small",onClick:()=>{C()},children:"Đóng"})]})]}),filterIcon:m=>e.jsx(E,{style:{color:m?"#1890ff":void 0}})}),query:n,selectSearch:({dataIndex:t,path:i,operator:r="equal",filter:m,nameColumn:a})=>({filterDropdown:({setSelectedKeys:x,selectedKeys:C,clearFilters:l,close:h})=>e.jsxs(B,{size:8,direction:"vertical",style:{padding:8},onKeyDown:b=>b.stopPropagation(),children:[a&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',a,'"']})}),e.jsx(Ae,{style:{marginBottom:8,display:"block",minWidth:210},onChange:b=>x(b?[b]:[]),placeholder:"Chọn ngày",value:C[0],path:i,filter:m,allowClear:!0}),e.jsxs("div",{children:[e.jsx(w,{type:"primary",onClick:g(C,t,r),size:"small",children:"Tìm"})," ",e.jsx(w,{onClick:()=>{l&&f(l,t),C[0]=null},size:"small",children:"Làm mới"}),e.jsx(w,{type:"text",size:"small",onClick:()=>{h()},children:"Đóng"})]})]}),filterIcon:x=>e.jsx(E,{style:{color:x?"#1890ff":void 0}})}),selectSearchWithOutApi:({dataIndex:t,operator:i="equal",options:r,nameColumn:m})=>({filterDropdown:({setSelectedKeys:a,selectedKeys:x,clearFilters:C,close:l})=>e.jsxs(B,{direction:"vertical",style:{padding:8},size:8,onKeyDown:h=>h.stopPropagation(),children:[m&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',m,'"']})}),e.jsx(M,{style:{marginBottom:8,display:"block"},onChange:h=>a(h?[h]:[]),placeholder:"Chọn ngày",value:x[0],options:r,allowClear:!0}),e.jsxs("div",{children:[e.jsx(w,{type:"primary",onClick:g(x,t,i),size:"small",children:"Tìm"})," ",e.jsx(w,{onClick:()=>{C&&f(C,t)},size:"small",children:"Làm mới"}),e.jsx(w,{type:"text",size:"small",onClick:()=>{l()},children:"Đóng"})]})]}),filterIcon:a=>e.jsx(E,{style:{color:a?"#1890ff":void 0}})}),dateSearch:({dataIndex:t,nameColumn:i,type:r="date"})=>({filterDropdown:({setSelectedKeys:m,selectedKeys:a,clearFilters:x,close:C})=>e.jsxs(B,{direction:"vertical",size:8,style:{padding:8},onKeyDown:l=>l.stopPropagation(),children:[i&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',i,'"']})}),e.jsx(M,{style:{display:"block"},options:Te,size:"small",placeholder:"Chọn ngày",allowClear:!0,value:u,onChange:l=>{d(l),a[0]=null}}),e.jsx("div",{children:u==="between"?e.jsx(X.RangePicker,{showTime:r==="dateTime",size:"small",onChange:l=>m(l?r==="dateTime"?[[P(l[0]).format("YYYY-MM-DD HH:mm:00"),P(l[1]).format("YYYY-MM-DD HH:mm:00")]]:[[P(l[0]).format("YYYY-MM-DD 00:00:00"),P(l[1]).format("YYYY-MM-DD 00:00:00")]]:[]),placeholder:["Từ ngày","Đến ngày"],style:{width:"100%"},format:r==="dateTime"?"DD/MM/YYYY HH:mm":"DD/MM/YYYY",value:a[0]&&[P(a[0][0]),P(a[0][1])]}):e.jsx(Se,{onChange:l=>m(l?[P(l).format("YYYY-MM-DD")]:[]),size:"small",format:"DD/MM/YYYY",placeholder:"Chọn ngày",value:a[0]&&P(a[0])})}),e.jsxs("div",{children:[e.jsx(w,{type:"primary",onClick:g(a,t,u),size:"small",children:"Tìm"})," ",e.jsx(w,{onClick:()=>{x&&f(x,t),a[0]=null},size:"small",children:"Làm mới"}),e.jsx(w,{type:"text",size:"small",onClick:()=>{C()},children:"Đóng"})]})]}),filterIcon:m=>e.jsx(E,{style:{color:m?"#1890ff":void 0}})}),numberSearch:({dataIndex:t,nameColumn:i})=>{const[r,m]=c.useState(null),[a,x]=c.useState(null);return{filterDropdown:({setSelectedKeys:C,selectedKeys:l,clearFilters:h,close:b})=>e.jsxs(B,{direction:"vertical",size:8,style:{padding:8},onKeyDown:D=>D.stopPropagation(),children:[i&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',i,'"']})}),e.jsx(M,{style:{display:"block"},options:we,size:"small",placeholder:"Chọn loại",allowClear:!0,value:s,onChange:D=>{p(D),l[0]=null}}),e.jsx("div",{children:e.jsx(Ce,{children:s!=="between"?e.jsx(L,{span:24,children:e.jsx(H,{placeholder:"Nhập số",size:"small",formatter:R,parser:V,value:r,onChange:D=>m(D),onPressEnter:g([r],t,s)})}):e.jsxs(e.Fragment,{children:[e.jsx(L,{span:12,children:e.jsx(H,{placeholder:"Nhập số",size:"small",formatter:R,parser:V,value:r,onChange:D=>m(D),onPressEnter:g([[r,a]],t,s)})}),e.jsx(L,{span:12,children:e.jsx(H,{placeholder:"Nhập số",size:"small",formatter:R,parser:V,value:a,onChange:D=>x(D),onPressEnter:g([[r,a]],t,s)})})]})})}),e.jsxs("div",{children:[e.jsx(w,{type:"primary",onClick:g(s==="between"?[[r,a]]:[r],t,s),size:"small",children:"Tìm"})," ",e.jsx(w,{onClick:()=>{h&&f(h,t),l[0]=null},size:"small",children:"Làm mới"}),e.jsx(w,{type:"text",size:"small",onClick:()=>{b()},children:"Đóng"})]})]}),filterIcon:C=>e.jsx(E,{style:{color:C?"#1890ff":void 0}})}}}},Ge=({page:n,sort_direction:o=ye,sort_column:u=be})=>{const[d,s]=c.useState({page:n,limit:je,sort_direction:o,sort_column:u});return{filter:d,handlePageChange:f=>{s(T=>({...T,page:f}))},handleLimitChange:f=>{s(T=>({...T,limit:f}))}}};export{Ze as C,Pe as P,Je as a,Ge as u};
