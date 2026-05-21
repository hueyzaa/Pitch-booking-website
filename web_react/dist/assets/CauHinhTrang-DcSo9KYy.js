import{o as w,at as b,s as e,D as y,t as _,j as L,a8 as N,r as T,A as j,R as U,C as p,au as k,av as S,n as R}from"./index-DFD43UYP.js";import{B as o}from"./BaseForm-BS_rT-Qb.js";import{B as E}from"./BaseInput-NAQkEY-m.js";import{R as G}from"./PlusOutlined-YMkMHmoP.js";import{I as z}from"./index-CEVs1h3C.js";import{R as B}from"./DeleteOutlined-Bc8FfLgI.js";import"./css-CG3sgCP8.js";const g=180,P=L(N)`
  width: ${g}px;
  height: ${g}px;

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
`,$=L.div`
  position: relative;
  display: inline-block;
  width: ${g}px;
  height: ${g}px;
  border-radius: 8px;
  border: 1px solid var(--border-base-color);
  overflow: hidden;
`,V=L.div`
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
`,q={position:"absolute",top:8,right:8,width:28,height:28,padding:0,borderRadius:8,border:"1px solid var(--error-color)",backgroundColor:"var(--background-color)",zIndex:3,display:"inline-flex",alignItems:"center",justifyContent:"center"},X=(i,l)=>{if(!l)return"";if(l.startsWith("http"))return l;const a=l.replace(/\\/g,"/").replace(/^\//,"");return`${i}/${a}`},M=({id:i,value:l,onChange:a,title:n,showTitle:d=!0,helperText:s,helperHint:t,uploadText:r,altText:c,aspectRatio:O=1,previewWidth:h=g,disabled:m})=>{const{t:H}=w(),f=b.useMemo(()=>{if(typeof l=="string"&&l.trim()!=="")return{url:X(_,l),objectUrl:void 0};if(Array.isArray(l)&&l.length>0){const u=l[0],x=u.originFileObj||u;if(x instanceof File||x instanceof Blob){const F=URL.createObjectURL(x);return{url:F,objectUrl:F}}if(u.url)return{url:u.url,objectUrl:void 0}}return{url:void 0,objectUrl:void 0}},[l]);b.useEffect(()=>()=>{f.objectUrl&&URL.revokeObjectURL(f.objectUrl)},[f.objectUrl]);const C=f.url,A=u=>{const x=[{uid:u.uid||Date.now().toString(),name:u.name,status:"done",originFileObj:u}];return a==null||a(x),!1},D=()=>{a==null||a(void 0)},I=h/O,v=m?e.jsx("div",{style:{width:h,height:I,border:"1px dashed var(--border-base-color)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-light-color)"},children:H("common.noImage")}):e.jsx(P,{listType:"picture-card",showUploadList:!1,beforeUpload:A,accept:"image/*",style:{width:h,height:I,margin:0},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",pointerEvents:"none"},children:[e.jsx(G,{style:{fontSize:20,color:"var(--primary-color)"}}),e.jsx("div",{style:{marginTop:8,fontSize:12,color:"var(--text-main-color)",fontWeight:600},children:r})]})});return e.jsxs("div",{id:i,style:{width:"100%"},children:[d&&e.jsx("div",{style:{marginBottom:12,color:"var(--primary-color)",fontSize:13,fontWeight:600},children:n}),C?e.jsxs($,{style:{width:h,height:I},children:[e.jsx(V,{children:e.jsx(z,{src:C,alt:c,style:{width:"100%",height:"100%",display:"block",objectFit:"cover"},preview:{mask:H("common.view")}})}),!m&&e.jsx(y,{icon:e.jsx(B,{style:{color:"#ff4d4f"}}),onClick:D,size:"small",style:q})]}):v,e.jsxs("div",{style:{marginTop:8,color:"var(--text-light-color)",fontSize:12},children:[e.jsx("div",{children:s}),!!t&&e.jsx("div",{children:t})]})]})},Y=({configs:i,onUpdate:l,loading:a})=>{const[n]=o.useForm();T.useEffect(()=>{if(!i)return;const t=i.reduce((r,c)=>({...r,[c.key]:c.value}),{});n.setFieldsValue({HEADER_TITLE:t.HEADER_TITLE||"",HEADER_LOGO:d(t.HEADER_LOGO)})},[i,n]);const d=t=>t?[{uid:"-1",name:"logo.png",status:"done",url:t.startsWith("http")?t:`${_}/${t}`}]:[],s=async t=>{var O;let r="";if(t.HEADER_LOGO&&t.HEADER_LOGO.length>0){const h=t.HEADER_LOGO[0];if(h.originFileObj){const m=new FormData;m.append("file",h.originFileObj),r=(await j.post("upload",m)).data.path}else r=((O=h.url)==null?void 0:O.replace(`${_}/`,""))||""}const c=[{key:"HEADER_TITLE",value:t.HEADER_TITLE},{key:"HEADER_LOGO",value:r}];await l(c)};return e.jsxs(o,{form:n,layout:"vertical",onFinish:s,children:[e.jsx(o.Item,{name:"HEADER_LOGO",label:"Logo Header",children:e.jsx(M,{title:"Logo",showTitle:!1,helperText:"Kích thước 300x100",uploadText:"Tải lên",altText:"logo"})}),e.jsx(o.Item,{name:"HEADER_TITLE",label:"Tiêu đề Website",rules:[{required:!0}],children:e.jsx(E,{size:"small",placeholder:"Nhập tiêu đề"})}),e.jsx(y,{type:"primary",size:"small",htmlType:"submit",loading:a,style:{marginTop:"1rem"},children:"Lưu thay đổi"})]})},K=({configs:i,onUpdate:l,loading:a})=>{const[n]=o.useForm();b.useEffect(()=>{if(!i)return;const s=i.reduce((t,r)=>({...t,[r.key]:r.value}),{});n.setFieldsValue({FOOTER_COPYRIGHT:s.FOOTER_COPYRIGHT||"",FOOTER_DESCRIPTION:s.FOOTER_DESCRIPTION||"",FOOTER_LOGO:[{uid:"-1",name:"logo.png",status:"done",url:`${_}/${s.FOOTER_LOGO}`}]})},[i,n]);const d=async s=>{const t=[{key:"FOOTER_COPYRIGHT",value:s.FOOTER_COPYRIGHT||""}];await l(t)};return e.jsxs(o,{form:n,layout:"vertical",onFinish:d,children:[e.jsx(o.Item,{name:"FOOTER_LOGO",label:"Logo Footer",children:e.jsx(M,{title:"Logo",showTitle:!1,helperText:"Kích thước 300x100",uploadText:"Tải lên",altText:"logo"})}),e.jsx(o.Item,{name:"FOOTER_COPYRIGHT",label:"Bản quyền",children:e.jsx(E,{size:"small",placeholder:"© 2026 Portfolio"})}),e.jsx(y,{type:"primary",size:"small",htmlType:"submit",loading:a,style:{marginTop:"1rem"},children:"Lưu thay đổi"})]})},W=({configs:i,onUpdate:l,loading:a})=>{const[n]=o.useForm();T.useEffect(()=>{if(!i)return;const s=i.reduce((t,r)=>({...t,[r.key]:r.value}),{});n.setFieldsValue({CONTACT_EMAIL:s.CONTACT_EMAIL||"",CONTACT_PHONE:s.CONTACT_PHONE||"",CONTACT_ADDRESS:s.CONTACT_ADDRESS||""})},[i,n]);const d=async s=>{const t=Object.entries(s).map(([r,c])=>({key:r,value:String(c)}));await l(t)};return e.jsxs(o,{form:n,layout:"vertical",onFinish:d,children:[e.jsx(o.Item,{name:"CONTACT_EMAIL",label:"Email liên hệ",children:e.jsx(E,{size:"small",placeholder:"Nhập email"})}),e.jsx(o.Item,{name:"CONTACT_PHONE",label:"Số điện thoại",children:e.jsx(E,{size:"small",placeholder:"Nhập số điện thoại"})}),e.jsx(o.Item,{name:"CONTACT_ADDRESS",label:"Địa chỉ",children:e.jsx(E,{size:"small",placeholder:"Nhập địa chỉ"})}),e.jsx(y,{type:"primary",size:"small",htmlType:"submit",loading:a,style:{marginTop:"1rem"},children:"Lưu thay đổi"})]})},Z=({configs:i,onUpdate:l,loading:a})=>{const[n]=o.useForm();T.useEffect(()=>{if(!i)return;const t=i.reduce((r,c)=>({...r,[c.key]:c.value}),{});n.setFieldsValue({HOME_HERO_BADGE:t.HOME_HERO_BADGE||"",HOME_HERO_TITLE_MAIN:t.HOME_HERO_TITLE_MAIN||"",HOME_HERO_TITLE_ACCENT:t.HOME_HERO_TITLE_ACCENT||"",HOME_HERO_TITLE_SUFFIX:t.HOME_HERO_TITLE_SUFFIX||"",HOME_HERO_DESC:t.HOME_HERO_DESC||"",HOME_HERO_IMG:d(t.HOME_HERO_IMG)})},[i,n]);const d=t=>t?[{uid:"-1",name:"hero.png",status:"done",url:t.startsWith("http")?t:`${_}/${t}`}]:[],s=async t=>{var O;let r="";if(t.HOME_HERO_IMG&&t.HOME_HERO_IMG.length>0){const h=t.HOME_HERO_IMG[0];if(h.originFileObj){const m=new FormData;m.append("file",h.originFileObj),r=(await j.post("upload",m)).data.path}else r=((O=h.url)==null?void 0:O.replace(`${_}/`,""))||""}const c=[{key:"HOME_HERO_BADGE",value:t.HOME_HERO_BADGE},{key:"HOME_HERO_TITLE_MAIN",value:t.HOME_HERO_TITLE_MAIN},{key:"HOME_HERO_TITLE_ACCENT",value:t.HOME_HERO_TITLE_ACCENT},{key:"HOME_HERO_TITLE_SUFFIX",value:t.HOME_HERO_TITLE_SUFFIX},{key:"HOME_HERO_DESC",value:t.HOME_HERO_DESC},{key:"HOME_HERO_IMG",value:r}];await l(c)};return e.jsxs(o,{form:n,layout:"vertical",onFinish:s,children:[e.jsxs(U,{gutter:[24,0],children:[e.jsx(p,{span:24,children:e.jsx(o.Item,{name:"HOME_HERO_BADGE",label:"Hero Badge (Text nhỏ phía trên)",children:e.jsx(E,{size:"small",placeholder:"Ví dụ: UI Designer"})})}),e.jsx(p,{span:8,children:e.jsx(o.Item,{name:"HOME_HERO_TITLE_MAIN",label:"Tiêu đề chính (Dòng 1)",rules:[{required:!0}],children:e.jsx(E,{size:"small",placeholder:"Ví dụ: NGUYÊN"})})}),e.jsx(p,{span:8,children:e.jsx(o.Item,{name:"HOME_HERO_TITLE_ACCENT",label:"Tiêu đề nhấn mạnh (In nghiêng)",rules:[{required:!0}],children:e.jsx(E,{size:"small",placeholder:"Ví dụ: Digital"})})}),e.jsx(p,{span:8,children:e.jsx(o.Item,{name:"HOME_HERO_TITLE_SUFFIX",label:"Tiêu đề hậu tố (Dòng 3)",rules:[{required:!0}],children:e.jsx(E,{size:"small",placeholder:"Ví dụ: EXPERIENCE"})})}),e.jsx(p,{span:24,children:e.jsx(o.Item,{name:"HOME_HERO_DESC",label:"Mô tả ngắn Hero",rules:[{required:!0}],children:e.jsx(E.TextArea,{rows:4,placeholder:"Nhập mô tả giới thiệu..."})})}),e.jsx(p,{span:24,children:e.jsx(o.Item,{name:"HOME_HERO_IMG",label:"Hình ảnh Hero (Visual)",children:e.jsx(M,{title:"Hero Image",showTitle:!1,helperText:"Kích thước gợi ý: 1000x1000 (Tỉ lệ 1:1)",uploadText:"Tải lên",altText:"hero visual"})})})]}),e.jsx(y,{type:"primary",size:"small",htmlType:"submit",loading:a,style:{marginTop:"1rem"},children:"Lưu thay đổi trang chủ"})]})},se=()=>{const[i,l]=T.useState([]),[a,n]=T.useState(!0),d=async()=>{n(!0);try{const r=await j.get("cau-hinh-trang");l(r.data)}catch{R.error({message:"Lỗi khi tải cấu hình"})}finally{n(!1)}};T.useEffect(()=>{d()},[]);const s=async r=>{try{await j.patch("cau-hinh-trang",r),R.success({message:"Cập nhật cấu hình thành công"}),d()}catch{R.error({message:"Lỗi khi cập nhật"})}},t=[{key:"header",label:"Header",children:e.jsx(Y,{configs:i,onUpdate:s,loading:a})},{key:"home",label:"Trang chủ",children:e.jsx(Z,{configs:i,onUpdate:s,loading:a})},{key:"footer",label:"Footer",children:e.jsx(K,{configs:i,onUpdate:s,loading:a})},{key:"contact",label:"Liên hệ",children:e.jsx(W,{configs:i,onUpdate:s,loading:a})}];return e.jsx(k,{title:"Cấu hình giao diện Trang",size:"small",children:e.jsx(S,{defaultActiveKey:"header",items:t})})};export{se as default};
