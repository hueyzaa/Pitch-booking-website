import{r as m,ao as W,b2 as te,a_ as ae,b3 as ie,b4 as oe,_ as z,b5 as le,b6 as re,aI as se,ap as ce,a6 as me,b7 as de,au as ue,b8 as he,aJ as pe,j as A,b9 as ge,s as e,F as M,al as fe,n as xe,a3 as $,ba as R,bb as V,Z as D,bc as E,T as _,R as ve,C as F,D as k,bd as Ce,be,bf as ye}from"./index-DpH7D4J6.js";import{B as L}from"./BaseForm-DkyjgyHI.js";import{B as J}from"./BaseInput-BWXNuiaP.js";import{T as je}from"./Table-DsPegkG7.js";import{B as H}from"./BaseInputNumber-t9sUjAjH.js";import{D as Z}from"./index-D7VnNwW6.js";import{o as ke,a as Te,B as we}from"./select-configs-DkFyuD8H.js";import{S as Ye}from"./SelectApi-DH7QIp4u.js";import{C as B}from"./index-DP4SavCF.js";var Pe=function(r){var h=r.prefixCls,d=r.okButtonProps,s=r.cancelButtonProps,p=r.title,g=r.cancelText,f=r.okText,w=r.okType,T=r.icon,Y=r.showCancel,y=Y===void 0?!0:Y,S=r.close,t=r.onConfirm,i=r.onCancel,l=m.useContext(W),c=l.getPrefixCls;return m.createElement(te,{componentName:"Popconfirm",defaultLocale:ae.Popconfirm},function(a){return m.createElement("div",{className:"".concat(h,"-inner-content")},m.createElement("div",{className:"".concat(h,"-message")},T&&m.createElement("span",{className:"".concat(h,"-message-icon")},T),m.createElement("div",{className:"".concat(h,"-message-title")},ie(p))),m.createElement("div",{className:"".concat(h,"-buttons")},y&&m.createElement(oe,z({onClick:i,size:"small"},s),g??a.cancelText),m.createElement(le,{buttonProps:z(z({size:"small"},re(w)),d),actionFn:t,close:S,prefixCls:c("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},f??a.okText)))})},I=void 0,Se=function(n,r){var h={};for(var d in n)Object.prototype.hasOwnProperty.call(n,d)&&r.indexOf(d)<0&&(h[d]=n[d]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,d=Object.getOwnPropertySymbols(n);s<d.length;s++)r.indexOf(d[s])<0&&Object.prototype.propertyIsEnumerable.call(n,d[s])&&(h[d[s]]=n[d[s]]);return h},De=m.forwardRef(function(n,r){var h=n.prefixCls,d=n.placement,s=d===void 0?"top":d,p=n.trigger,g=p===void 0?"click":p,f=n.okType,w=f===void 0?"primary":f,T=n.icon,Y=T===void 0?m.createElement(he,null):T,y=n.children,S=n.overlayClassName,t=n.onOpenChange,i=n.onVisibleChange,l=Se(n,["prefixCls","placement","trigger","okType","icon","children","overlayClassName","onOpenChange","onVisibleChange"]),c=m.useContext(W),a=c.getPrefixCls,x=se(!1,{value:n.open!==void 0?n.open:n.visible,defaultValue:n.defaultOpen!==void 0?n.defaultOpen:n.defaultVisible}),v=ce(x,2),o=v[0],u=v[1],C=function(b,j){u(b,!0),i==null||i(b,j),t==null||t(b,j)},P=function(b){C(!1,b)},X=function(b){var j;return(j=n.onConfirm)===null||j===void 0?void 0:j.call(I,b)},G=function(b){var j;C(!1,b),(j=n.onCancel)===null||j===void 0||j.call(I,b)},Q=function(b){b.keyCode===pe.ESC&&o&&C(!1,b)},K=function(b){var j=n.disabled,O=j===void 0?!1:j;O||C(b)},q=a("popover",h),ee=a("popconfirm",h),ne=me(ee,S);return m.createElement(de,z({},l,{trigger:g,prefixCls:q,placement:s,onOpenChange:K,open:o,ref:r,overlayClassName:ne,_overlay:m.createElement(Pe,z({okType:w,icon:Y},n,{prefixCls:q,close:P,onConfirm:X,onCancel:G}))}),ue(y,{onKeyDown:function(b){var j,O;m.isValidElement(y)&&((O=y==null?void 0:(j=y.props).onKeyDown)===null||O===void 0||O.call(j,b)),Q(b)}}))}),ze={locale:"vi_VN",today:"Hôm nay",now:"Bây giờ",backToToday:"Trở về hôm nay",ok:"OK",clear:"Xóa",month:"Tháng",year:"Năm",timeSelect:"Chọn thời gian",dateSelect:"Chọn ngày",weekSelect:"Chọn tuần",monthSelect:"Chọn tháng",yearSelect:"Chọn năm",decadeSelect:"Chọn thập kỷ",yearFormat:"YYYY",dateFormat:"D/M/YYYY",dayFormat:"D",dateTimeFormat:"D/M/YYYY HH:mm:ss",monthBeforeYear:!0,previousMonth:"Tháng trước (PageUp)",nextMonth:"Tháng sau (PageDown)",previousYear:"Năm trước (Control + left)",nextYear:"Năm sau (Control + right)",previousDecade:"Thập kỷ trước",nextDecade:"Thập kỷ sau",previousCentury:"Thế kỷ trước",nextCentury:"Thế kỷ sau"},Ne={placeholder:"Chọn thời gian"},Oe={lang:z({placeholder:"Chọn thời điểm",rangePlaceholder:["Ngày bắt đầu","Ngày kết thúc"]},ze),timePickerLocale:z({},Ne)};const Ee=A(ge)`
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
`,_e=n=>e.jsx(Ee,{...n}),Be=A(je)`
  & thead .ant-table-cell {
    color: var(--primary-color);
    font-size: ${M.xs};
    line-height: 1.25rem;
    text-align: center !important;
    & .anticon {
      color: var(--primary-color);
    }
  }

  & tbody .ant-table-cell {
    color: var(--text-main-color);
    font-size: ${M.xs};
    line-height: 1.25rem;
    white-space: nowrap;
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
    font-size: ${M.xs};
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
    font-size: ${M.xxs};
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
`,U=fe.createContext(null),Ve=({...n})=>{const[r]=L.useForm();return e.jsx(L,{form:r,component:!1,children:e.jsx(U.Provider,{value:r,children:e.jsx("tr",{...n})})})},He=({title:n,editable:r,children:h,dataIndex:d,record:s,inputType:p,handleSave:g,data:f,...w})=>{const[T,Y]=m.useState(!1),y=m.useRef(null),S=m.useContext(U),t=()=>{switch(p){case"number":return e.jsx(H,{size:"small",ref:y,onPressEnter:a,onBlur:a,parser:V,formatter:R,className:"w-full"});case"date":return e.jsx(Z,{size:"small",locale:Oe,ref:y,format:"DD/MM/YYYY",onBlur:a,onChange:a,className:"w-full"});case"select":return e.jsx($,{options:f,className:"w-full",ref:y,size:"small",onBlur:a});default:return e.jsx(J,{size:"small",ref:y,className:"w-full",onPressEnter:a,onBlur:a})}};m.useEffect(()=>{var u;T&&((u=y.current)==null||u.focus())},[T]);const i=()=>{Y(!T);let u=null;if(s)u=s;else return!1;p==="date"&&Object.keys(u).forEach(C=>{u[C]&&(/ngay_|_ngay/.test(C)||/ngay/.test(C)||/thoi_gian|_thoi/.test(C))&&(u[C]=D(u[C],"HH:mm:ss"))}),S.setFieldsValue({[d]:u[d]})},[l,c]=m.useState(!1),a=()=>{c(!0)},x=async()=>{try{const u=await S.validateFields();i(),g({...s,...u}),c(!1)}catch(u){xe.error({message:u})}},v=()=>{c(!1),Y(!1)};let o=h;return r&&(o=T?e.jsx(De,{title:"Bạn có muốn lưu không",open:l,onConfirm:x,onCancel:v,children:e.jsx(L.Item,{name:d,rules:[{required:!0,message:`${n} không được bỏ trống.`}],children:t()})}):e.jsx("div",{onClick:i,className:"px-[7px] cursor-pointer",role:"presentation",children:h})),e.jsx("td",{...w,children:o})},Xe=({defaultColumns:n,dataTable:r,handleSave:h,rowKey:d,rowSelection:s,filter:p,loading:g,scroll:f={x:1e3},handlePageChange:w,handleLimitChange:T,total:Y})=>{const y={body:{row:Ve,cell:He}},S=n.map(t=>t.editable?{...t,onCell:i=>({record:i,editable:t.editable,dataIndex:t.dataIndex,title:t.title,inputType:t.inputType,data:t.data,handleSave:h})}:t);return e.jsxs(e.Fragment,{children:[e.jsx($e,{scroll:f,components:y,rowClassName:()=>"editable-row",bordered:!0,loading:g,pagination:!1,dataSource:r,columns:S,rowKey:d,rowSelection:s}),Y?e.jsx(Re,{current:p==null?void 0:p.page,total:Y,pageSize:p==null?void 0:p.limit,onChange:w,onShowSizeChange:(t,i)=>{p&&T&&T(i)},showSizeChanger:!0,defaultPageSize:p==null?void 0:p.limit,showTotal:t=>`Tổng cộng ${t} bản ghi`}):null]})},Ge=()=>{const[n,r]=m.useState([]),[h,d]=m.useState("between"),[s,p]=m.useState("equal"),g=(t,i,l,c)=>()=>{if(!t[0])return;const a=n.filter(x=>x.field!==i);l==="between"?t[0]&&a.push({field:i,operator:l,value:JSON.stringify(t[0])}):a.push({field:i,operator:l,value:t[0]||""}),r(a)},f=(t,i)=>{const l=n.filter(c=>c.field!==i);r(l),t()};return{inputSearch:({dataIndex:t,operator:i="contain",nameColumn:l})=>({filterDropdown:({setSelectedKeys:c,selectedKeys:a,clearFilters:x,close:v})=>e.jsxs(B,{size:8,direction:"vertical",style:{padding:8},onKeyDown:o=>o.stopPropagation(),children:[l&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',l,'"']})}),e.jsx(J,{placeholder:"Nhập nội dung",value:a[0],onChange:o=>c(o.target.value?[o.target.value]:[]),onPressEnter:g(a,t,i)}),e.jsxs("div",{children:[e.jsx(k,{type:"primary",onClick:g(a,t,i),size:"small",children:"Tìm"})," ",e.jsx(k,{onClick:()=>x&&f(x,t),size:"small",children:"Làm mới"}),e.jsx(k,{type:"text",size:"small",onClick:()=>{v()},children:"Đóng"})]})]}),filterIcon:c=>e.jsx(E,{style:{color:c?"#1890ff":void 0}})}),query:n,selectSearch:({dataIndex:t,path:i,operator:l="equal",filter:c,nameColumn:a})=>({filterDropdown:({setSelectedKeys:x,selectedKeys:v,clearFilters:o,close:u})=>e.jsxs(B,{size:8,direction:"vertical",style:{padding:8},onKeyDown:C=>C.stopPropagation(),children:[a&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',a,'"']})}),e.jsx(Ye,{style:{marginBottom:8,display:"block",minWidth:210},onChange:C=>x(C?[C]:[]),placeholder:"Chọn ngày",value:v[0],path:i,filter:c,allowClear:!0}),e.jsxs("div",{children:[e.jsx(k,{type:"primary",onClick:g(v,t,l),size:"small",children:"Tìm"})," ",e.jsx(k,{onClick:()=>{o&&f(o,t),v[0]=null},size:"small",children:"Làm mới"}),e.jsx(k,{type:"text",size:"small",onClick:()=>{u()},children:"Đóng"})]})]}),filterIcon:x=>e.jsx(E,{style:{color:x?"#1890ff":void 0}})}),selectSearchWithOutApi:({dataIndex:t,operator:i="equal",options:l,nameColumn:c})=>({filterDropdown:({setSelectedKeys:a,selectedKeys:x,clearFilters:v,close:o})=>e.jsxs(B,{direction:"vertical",style:{padding:8},size:8,onKeyDown:u=>u.stopPropagation(),children:[c&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',c,'"']})}),e.jsx($,{style:{marginBottom:8,display:"block"},onChange:u=>a(u?[u]:[]),placeholder:"Chọn ngày",value:x[0],options:l,allowClear:!0}),e.jsxs("div",{children:[e.jsx(k,{type:"primary",onClick:g(x,t,i),size:"small",children:"Tìm"})," ",e.jsx(k,{onClick:()=>{v&&f(v,t)},size:"small",children:"Làm mới"}),e.jsx(k,{type:"text",size:"small",onClick:()=>{o()},children:"Đóng"})]})]}),filterIcon:a=>e.jsx(E,{style:{color:a?"#1890ff":void 0}})}),dateSearch:({dataIndex:t,nameColumn:i,type:l="date"})=>({filterDropdown:({setSelectedKeys:c,selectedKeys:a,clearFilters:x,close:v})=>e.jsxs(B,{direction:"vertical",size:8,style:{padding:8},onKeyDown:o=>o.stopPropagation(),children:[i&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',i,'"']})}),e.jsx($,{style:{display:"block"},options:Te,size:"small",placeholder:"Chọn ngày",allowClear:!0,value:h,onChange:o=>{d(o),a[0]=null}}),e.jsx("div",{children:h==="between"?e.jsx(Z.RangePicker,{showTime:l==="dateTime",size:"small",onChange:o=>c(o?l==="dateTime"?[[D(o[0]).format("YYYY-MM-DD HH:mm:00"),D(o[1]).format("YYYY-MM-DD HH:mm:00")]]:[[D(o[0]).format("YYYY-MM-DD 00:00:00"),D(o[1]).format("YYYY-MM-DD 00:00:00")]]:[]),placeholder:["Từ ngày","Đến ngày"],style:{width:"100%"},format:l==="dateTime"?"DD/MM/YYYY HH:mm":"DD/MM/YYYY",value:a[0]&&[D(a[0][0]),D(a[0][1])]}):e.jsx(we,{onChange:o=>c(o?[D(o).format("YYYY-MM-DD")]:[]),size:"small",format:"DD/MM/YYYY",placeholder:"Chọn ngày",value:a[0]&&D(a[0])})}),e.jsxs("div",{children:[e.jsx(k,{type:"primary",onClick:g(a,t,h),size:"small",children:"Tìm"})," ",e.jsx(k,{onClick:()=>{x&&f(x,t),a[0]=null},size:"small",children:"Làm mới"}),e.jsx(k,{type:"text",size:"small",onClick:()=>{v()},children:"Đóng"})]})]}),filterIcon:c=>e.jsx(E,{style:{color:c?"#1890ff":void 0}})}),numberSearch:({dataIndex:t,nameColumn:i})=>{const[l,c]=m.useState(null),[a,x]=m.useState(null);return{filterDropdown:({setSelectedKeys:v,selectedKeys:o,clearFilters:u,close:C})=>e.jsxs(B,{direction:"vertical",size:8,style:{padding:8},onKeyDown:P=>P.stopPropagation(),children:[i&&e.jsx(_.Text,{style:{textAlign:"center"},children:e.jsxs("b",{children:['Tìm kiếm theo "',i,'"']})}),e.jsx($,{style:{display:"block"},options:ke,size:"small",placeholder:"Chọn loại",allowClear:!0,value:s,onChange:P=>{p(P),o[0]=null}}),e.jsx("div",{children:e.jsx(ve,{children:s!=="between"?e.jsx(F,{span:24,children:e.jsx(H,{placeholder:"Nhập số",size:"small",formatter:R,parser:V,value:l,onChange:P=>c(P),onPressEnter:g([l],t,s)})}):e.jsxs(e.Fragment,{children:[e.jsx(F,{span:12,children:e.jsx(H,{placeholder:"Nhập số",size:"small",formatter:R,parser:V,value:l,onChange:P=>c(P),onPressEnter:g([[l,a]],t,s)})}),e.jsx(F,{span:12,children:e.jsx(H,{placeholder:"Nhập số",size:"small",formatter:R,parser:V,value:a,onChange:P=>x(P),onPressEnter:g([[l,a]],t,s)})})]})})}),e.jsxs("div",{children:[e.jsx(k,{type:"primary",onClick:g(s==="between"?[[l,a]]:[l],t,s),size:"small",children:"Tìm"})," ",e.jsx(k,{onClick:()=>{u&&f(u,t),o[0]=null},size:"small",children:"Làm mới"}),e.jsx(k,{type:"text",size:"small",onClick:()=>{C()},children:"Đóng"})]})]}),filterIcon:v=>e.jsx(E,{style:{color:v?"#1890ff":void 0}})}}}},Qe=({page:n,sort_direction:r=be,sort_column:h=Ce})=>{const[d,s]=m.useState({page:n,limit:ye,sort_direction:r,sort_column:h});return{filter:d,handlePageChange:f=>{s(w=>({...w,page:f}))},handleLimitChange:f=>{s(w=>({...w,limit:f}))}}};export{Xe as C,De as P,Ge as a,Qe as u};
