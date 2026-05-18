import{r as b,J as z,_ as B,o as S,al as I,t as k,s as e,D as y,j as x,a8 as O,R as $,C as i,am as T,T as E,aj as D,a1 as F}from"./index-DpH7D4J6.js";import{F as N,B as o}from"./BaseForm-DkyjgyHI.js";import{B as j}from"./BaseInput-BWXNuiaP.js";import{B as C}from"./BaseInputNumber-t9sUjAjH.js";import{B as A}from"./BaseEditor-DlqRoerS.js";import{B as H}from"./BaseSwitch-BeQwrsDk.js";import{M as _}from"./MainImageUpload-BgBPHTNd.js";import{I as M}from"./index-BYkIjxbO.js";import{R as V}from"./DeleteOutlined-D8cQtTJF.js";import{R as P}from"./PlusOutlined-CpA_v2gg.js";import{T as W}from"./index-BA7VI3Mn.js";import{T as G}from"./ToolSelectWithQuickAdd-CGdD_ipr.js";import{R as q}from"./ArrowLeftOutlined-XUtFwadR.js";import{C as Q}from"./index-DP4SavCF.js";var J={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"}}]},name:"arrow-down",theme:"outlined"},X=function(n,s){return b.createElement(z,B({},n,{ref:s,icon:J}))},Z=b.forwardRef(X),K={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"}}]},name:"arrow-up",theme:"outlined"},Y=function(n,s){return b.createElement(z,B({},n,{ref:s,icon:K}))},ee=b.forwardRef(Y);const te=148,re=x.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${te}px, 1fr));
  gap: 12px;
  align-items: stretch;
`,ne=x(O)`
  width: 100%;
  aspect-ratio: 1 / 1;

  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 100%;
    margin: 0;
    border-style: dashed;
    border-color: var(--border-base-color);
    background-color: var(--background-color);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-upload.ant-upload-select-picture-card > * {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`,ae=x.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  border: 1px solid var(--border-base-color);
  background-color: var(--background-color);
  overflow: hidden;
`,le=x.div`
  position: absolute;
  inset: 0;

  .ant-image {
    width: 100%;
    height: 100%;
    display: block;
  }

  .ant-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .ant-image-mask {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.2;
  }
`,ie={position:"absolute",top:8,right:8,width:28,height:28,padding:0,borderRadius:8,border:"1px solid var(--error-color)",backgroundColor:"var(--background-color)",zIndex:3,display:"inline-flex",alignItems:"center",justifyContent:"center"},R={backgroundColor:"rgba(255, 255, 255, 0.92)",borderColor:"rgba(0, 0, 0, 0.1)",borderRadius:4,width:24,height:24,padding:0},oe={position:"absolute",left:8,top:8,backgroundColor:"rgba(0, 0, 0, 0.55)",color:"#fff",fontSize:10,padding:"2px 8px",borderRadius:999,fontWeight:600,zIndex:2},U=(t,n)=>{if(!n)return;if(n.includes("http"))return n;const s=n.replace(/\\/g,"/").replace(/^\//,"");return`${t}/${s}`},se=t=>t?typeof File<"u"&&t instanceof File||typeof Blob<"u"&&t instanceof Blob:!1,ce=({value:t,onChange:n,uploadText:s,disabled:h})=>{const{t:g}=S(),d=s||"Tải lên",c=I.useMemo(()=>Array.isArray(t)?t:[],[t]),u=I.useMemo(()=>c.map((a,l)=>{if(typeof a=="string")return{key:`gallery-str-${l}`,file:{uid:`gallery-str-${l}`,name:a.split("/").pop()||"image.png",url:a},url:U(k,a)};const r=a,m=r.originFileObj;if(se(m)){const p=URL.createObjectURL(m);return{key:r.uid||`${r.name||"gallery"}-${l}`,file:r,url:p,objectUrl:p}}return r.url?{key:r.uid||`${r.name||"gallery"}-${l}`,file:r,url:U(k,r.url)}:r.thumbUrl?{key:r.uid||`${r.name||"gallery"}-${l}`,file:r,url:r.thumbUrl}:{key:r.uid||`${r.name||"gallery"}-${l}`,file:r}}),[c]);I.useEffect(()=>()=>{u.forEach(a=>{a.objectUrl&&URL.revokeObjectURL(a.objectUrl)})},[u]);const v=({fileList:a})=>{const l=a.map(r=>({...r,status:r.status||"done"}));n==null||n(l)},w=a=>l=>{l.preventDefault(),l.stopPropagation(),n==null||n(c.filter(r=>r.uid!==a))},f=(a,l)=>r=>{r.preventDefault(),r.stopPropagation();const m=l==="up"?a-1:a+1;if(m<0||m>=c.length)return;const p=[...c];[p[a],p[m]]=[p[m],p[a]],n==null||n(p)};return e.jsxs(re,{children:[u.map((a,l)=>e.jsxs(ae,{children:[e.jsx(le,{children:e.jsx(M,{src:a.url||"",alt:"gallery-image",style:{width:"100%",height:"100%",display:"block",objectFit:"cover"},preview:{mask:g("common.view")}})}),!h&&e.jsx(y,{icon:e.jsx(V,{style:{color:"#ff4d4f"}}),onClick:w(a.file.uid),size:"small",style:ie}),e.jsxs("div",{style:oe,children:["Thứ tự: ",l+1]}),!h&&e.jsx("div",{style:{position:"absolute",left:0,right:0,bottom:0,display:"flex",justifyContent:"flex-end",alignItems:"center",padding:"8px 8px 10px",background:"linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 60%, rgba(0, 0, 0, 0) 100%)",zIndex:2},children:e.jsxs("div",{style:{display:"flex",gap:4},children:[e.jsx(y,{size:"small",icon:e.jsx(ee,{style:{fontSize:12}}),onClick:f(l,"up"),disabled:l===0,style:R}),e.jsx(y,{size:"small",icon:e.jsx(Z,{style:{fontSize:12}}),onClick:f(l,"down"),disabled:l===u.length-1,style:R})]})})]},a.key)),!h&&e.jsx(ne,{listType:"picture-card",showUploadList:!1,beforeUpload:()=>!1,onChange:v,accept:"image/*",multiple:!0,fileList:c,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",pointerEvents:"none"},children:[e.jsx(P,{style:{fontSize:20,color:"var(--primary-color)"}}),e.jsx("div",{style:{marginTop:8,fontSize:12,color:"var(--text-main-color)",fontWeight:600},children:d})]})})]})},L=x(E.Title)`
  color: var(--primary-color) !important;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  font-weight: 700 !important;
`,ke=({disabled:t,existingOrders:n=[]})=>{const s=N.useFormInstance(),h=g=>{if(t)return;const d=parseInt(g.target.value);if(!isNaN(d)){const c=D(d,n);c!==d&&s.setFieldsValue({order:c})}};return e.jsxs($,{gutter:[20,20],children:[e.jsx(i,{span:24,children:e.jsx(o.Item,{name:"title",label:"Tên dự án",rules:[{required:!0,message:"Tên dự án không được bỏ trống"}],children:e.jsx(j,{size:"small",placeholder:"Nhập tên dự án",disabled:t})})}),e.jsx(i,{span:24,children:e.jsx(o.Item,{name:"mo_ta_ngan",label:"Mô tả ngắn",children:e.jsx(j.TextArea,{placeholder:"Nhập mô tả ngắn (hiển thị ở thẻ dự án)",autoSize:{minRows:2,maxRows:4},disabled:t})})}),e.jsx(i,{span:24,children:e.jsx(o.Item,{name:"mo_ta_chi_tiet",label:"Mô tả chi tiết",children:e.jsx(A,{placeholder:"Nhập mô tả chi tiết dự án",readOnly:t})})}),e.jsxs(i,{span:24,children:[e.jsx(T,{}),e.jsx(L,{level:4,children:"CẤU HÌNH CHI TIẾT MONOLITH"})]}),e.jsx(i,{span:12,children:e.jsx(o.Item,{name:"vai_tro",label:"Vai trò (Role)",children:e.jsx(j,{placeholder:"VD: DESIGNER & DEVELOPER",disabled:t})})}),e.jsx(i,{span:12,children:e.jsx(o.Item,{name:"dich_vu",label:"Dịch vụ (Services)",children:e.jsx(j,{placeholder:"VD: UI/UX, FRONTEND & MOTION",disabled:t})})}),e.jsx(i,{span:24,children:e.jsx(o.Item,{name:"tieu_de_phu",label:"Slogan / Headline (Concept)",children:e.jsx(j.TextArea,{placeholder:"VD: Crafting unique experiences through minimalist design and modular architecture.",autoSize:{minRows:2,maxRows:4},disabled:t})})}),e.jsxs(i,{span:24,children:[e.jsx(T,{}),e.jsx(L,{level:4,children:"HÌNH ẢNH"})]}),e.jsx(i,{span:24,children:e.jsx(o.Item,{name:"thumbnail",label:"Hình ảnh chính",extra:"Hình ảnh đại diện của dự án (khuyến nghị: 500x500px)",children:e.jsx(_,{title:"Hình ảnh chính",showTitle:!1,helperText:"",uploadText:"Tải lên",altText:"thumbnail",disabled:t})})}),e.jsx(i,{span:24,children:e.jsx(o.Item,{name:"gallery",label:"Hình ảnh chi tiết",children:e.jsx(ce,{uploadText:"Tải lên",disabled:t})})}),e.jsx(i,{span:24,children:e.jsx(T,{})}),e.jsx(i,{span:24,children:e.jsx(G,{name:"tools",label:"Công nghệ sử dụng",placeholder:"Chọn hoặc thêm công nghệ",disabled:t})}),e.jsx(i,{span:12,children:e.jsx(o.Item,{label:"Hoạt động",style:{marginBottom:0},children:e.jsxs(W,{children:[e.jsx("span",{children:"Trạng thái"}),e.jsx(o.Item,{name:"status",valuePropName:"checked",initialValue:!0,noStyle:!0,children:e.jsx(H,{size:"small",disabled:t})})]})})}),e.jsx(i,{span:12,children:e.jsx(o.Item,{name:"order",label:"Thứ tự",initialValue:1,children:e.jsx(C,{size:"small",min:1,style:{width:"100%"},disabled:t,onBlur:h})})})]})},de=x.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: var(--primary-color);
  transition: color 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  h4 {
    margin: 0 !important;
    color: inherit !important;
    font-weight: 700;
  }
`,Re=({title:t,formId:n,form:s,onFinish:h,onBack:g,onReset:d,loading:c,submitLabel:u="Lưu",initialValues:v,children:w})=>{const{t:f}=S();return e.jsx(F,{padding:"2rem",children:e.jsxs($,{gutter:[20,20],children:[e.jsx(i,{span:24,style:{padding:0},children:e.jsxs(de,{onClick:g,children:[e.jsx(q,{style:{fontSize:"20px"}}),e.jsx(E.Title,{level:4,className:"typography-title",children:t.toUpperCase()})]})}),e.jsx(i,{span:24,children:e.jsxs(o,{id:n,form:s,layout:"vertical",onFinish:h,initialValues:v,children:[w,e.jsxs(Q,{style:{display:"flex",justifyContent:"end",marginTop:"30px"},size:15,children:[d&&e.jsx(y,{size:"small",onClick:d,style:{borderRadius:6,minWidth:100},children:f("common.reset")}),e.jsx(y,{type:"primary",htmlType:"submit",size:"small",loading:c,form:n,style:{borderRadius:6,minWidth:100},children:u||f("common.save")})]})]})})]})})};export{ke as F,Re as P};
