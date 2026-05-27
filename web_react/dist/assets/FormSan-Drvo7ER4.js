import{r as c,J as m,_ as x,o as z,aB as v,t as k,s as e,D as y,j as b,ai as A,R as L,C as s,B as f,a1 as O,ad as B}from"./index-Cgakiq8m.js";import{F,B as u}from"./BaseForm-D5lkQNcM.js";import{B as j}from"./BaseInput-BYNuzrse.js";import{S as w}from"./SelectFormApi-k5ylBM-K.js";import{M as E}from"./MainImageUpload-B3cxZ0li.js";import{I as M}from"./index-Bcq22wVs.js";import{R as C}from"./DeleteOutlined-DV2bXBIR.js";import{R as P}from"./PlusOutlined-dhmXJMlI.js";var V={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"},N={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"}}]},name:"arrow-down",theme:"outlined"},q=function(t,i){return c.createElement(m,x({},t,{ref:i,icon:N}))},D=c.forwardRef(q),H=function(t,i){return c.createElement(m,x({},t,{ref:i,icon:V}))},fe=c.forwardRef(H),W={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"}}]},name:"arrow-up",theme:"outlined"},G=function(t,i){return c.createElement(m,x({},t,{ref:i,icon:W}))},X=c.forwardRef(G),J={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"},Q=function(t,i){return c.createElement(m,x({},t,{ref:i,icon:J}))},ge=c.forwardRef(Q);const Z=148,K=b.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${Z}px, 1fr));
  gap: 12px;
  align-items: stretch;
`,Y=b(A)`
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
`,ee=b.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  border: 1px solid var(--border-base-color);
  background-color: var(--background-color);
  overflow: hidden;
`,te=b.div`
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
`,re={position:"absolute",top:8,right:8,width:28,height:28,padding:0,borderRadius:8,border:"1px solid var(--error-color)",backgroundColor:"var(--background-color)",zIndex:3,display:"inline-flex",alignItems:"center",justifyContent:"center"},R={backgroundColor:"rgba(255, 255, 255, 0.92)",borderColor:"rgba(0, 0, 0, 0.1)",borderRadius:4,width:24,height:24,padding:0},ae={position:"absolute",left:8,top:8,backgroundColor:"rgba(0, 0, 0, 0.55)",color:"#fff",fontSize:10,padding:"2px 8px",borderRadius:999,fontWeight:600,zIndex:2},$=(l,t)=>{if(!t)return;if(t.includes("http"))return t;const i=t.replace(/\\/g,"/").replace(/^\//,"");return`${l}/${i}`},ne=l=>l?typeof File<"u"&&l instanceof File||typeof Blob<"u"&&l instanceof Blob:!1,le=({value:l,onChange:t,uploadText:i,disabled:p})=>{const{t:T}=z(),U=i||"Tải lên",h=v.useMemo(()=>Array.isArray(l)?l:[],[l]),g=v.useMemo(()=>h.map((a,n)=>{if(typeof a=="string")return{key:`gallery-str-${n}`,file:{uid:`gallery-str-${n}`,name:a.split("/").pop()||"image.png",url:a},url:$(k,a)};const r=a,d=r.originFileObj;if(ne(d)){const o=URL.createObjectURL(d);return{key:r.uid||`${r.name||"gallery"}-${n}`,file:r,url:o,objectUrl:o}}return r.url?{key:r.uid||`${r.name||"gallery"}-${n}`,file:r,url:$(k,r.url)}:r.thumbUrl?{key:r.uid||`${r.name||"gallery"}-${n}`,file:r,url:r.thumbUrl}:{key:r.uid||`${r.name||"gallery"}-${n}`,file:r}}),[h]);v.useEffect(()=>()=>{g.forEach(a=>{a.objectUrl&&URL.revokeObjectURL(a.objectUrl)})},[g]);const _=({fileList:a})=>{const n=a.map(r=>({...r,status:r.status||"done"}));t==null||t(n)},S=a=>n=>{n.preventDefault(),n.stopPropagation(),t==null||t(h.filter(r=>r.uid!==a))},I=(a,n)=>r=>{r.preventDefault(),r.stopPropagation();const d=n==="up"?a-1:a+1;if(d<0||d>=h.length)return;const o=[...h];[o[a],o[d]]=[o[d],o[a]],t==null||t(o)};return e.jsxs(K,{children:[g.map((a,n)=>e.jsxs(ee,{children:[e.jsx(te,{children:e.jsx(M,{src:a.url||"",alt:"gallery-image",style:{width:"100%",height:"100%",display:"block",objectFit:"cover"},preview:{mask:T("common.view")}})}),!p&&e.jsx(y,{icon:e.jsx(C,{style:{color:"#ff4d4f"}}),onClick:S(a.file.uid),size:"small",style:re}),e.jsxs("div",{style:ae,children:["Thứ tự: ",n+1]}),!p&&e.jsx("div",{style:{position:"absolute",left:0,right:0,bottom:0,display:"flex",justifyContent:"flex-end",alignItems:"center",padding:"8px 8px 10px",background:"linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 60%, rgba(0, 0, 0, 0) 100%)",zIndex:2},children:e.jsxs("div",{style:{display:"flex",gap:4},children:[e.jsx(y,{size:"small",icon:e.jsx(X,{style:{fontSize:12}}),onClick:I(n,"up"),disabled:n===0,style:R}),e.jsx(y,{size:"small",icon:e.jsx(D,{style:{fontSize:12}}),onClick:I(n,"down"),disabled:n===g.length-1,style:R})]})})]},a.key)),!p&&e.jsx(Y,{listType:"picture-card",showUploadList:!1,beforeUpload:()=>!1,onChange:_,accept:"image/*",multiple:!0,fileList:h,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",pointerEvents:"none"},children:[e.jsx(P,{style:{fontSize:20,color:"var(--primary-color)"}}),e.jsx("div",{style:{marginTop:8,fontSize:12,color:"var(--text-main-color)",fontWeight:600},children:U})]})})]})},me=({isEditing:l,form:t})=>{const i=F.useWatch("tinh_id",t),p=()=>{t.setFieldValue("xa_id",null)};return e.jsxs(L,{gutter:[32,24],children:[e.jsx(s,{span:24,lg:16,children:e.jsxs(L,{gutter:[16,16],children:[e.jsx(s,{span:24,children:e.jsx(u.Item,{name:"ten_san",label:"Tên sân",rules:[{required:!0,message:"Tên sân không được bỏ trống"}],children:e.jsx(j,{placeholder:"Nhập tên sân"})})}),e.jsx(s,{span:24,children:e.jsx(w,{name:"id_loai_san",label:"Loại sân",path:f.LOAI_SAN+"/options",placeholder:"Chọn loại sân",rules:[{required:!0,message:"Loại sân không được bỏ trống"}]})}),e.jsx(s,{span:12,children:e.jsx(w,{path:`${f.TINH}${f.OPTIONS}`,name:"tinh_id",label:"Tỉnh",placeholder:"Chọn tỉnh",rules:[{required:!0,message:"Tỉnh không được bỏ trống"}],onChange:p})}),e.jsx(s,{span:12,children:e.jsx(w,{path:`${f.XA}${f.OPTIONS}`,name:"xa_id",label:"Xã",placeholder:"Chọn xã",filter:i&&O(0,"province_code","equal",i),rules:[{required:!0,message:"Xã không được bỏ trống"}]})}),e.jsx(s,{span:24,children:e.jsx(u.Item,{name:"dia_chi",label:"Địa chỉ",rules:[{required:!0,message:"Địa chỉ không được bỏ trống"}],children:e.jsx(j.TextArea,{placeholder:"Nhập địa chỉ sân",rows:2})})}),e.jsx(s,{span:24,children:e.jsx(u.Item,{name:"tien_ich",label:"Tiện ích",children:e.jsx(B,{mode:"multiple",placeholder:"Chọn các tiện ích",options:[{label:"Wifi miễn phí",value:"wifi"},{label:"Bãi đỗ xe lớn",value:"local_parking"},{label:"Phòng tắm nóng lạnh",value:"shower"},{label:"Nước uống & Căng tin",value:"coffee"},{label:"Phòng thay đồ",value:"checkroom"},{label:"Sơ cứu y tế",value:"medical_services"}],allowClear:!0})})}),e.jsx(s,{span:24,children:e.jsx(u.Item,{name:"mo_ta",label:"Mô tả",children:e.jsx(j.TextArea,{placeholder:"Nhập mô tả chi tiết về sân bóng (ví dụ: chất lượng cỏ, hệ thống đèn, quy định sân...)",rows:4})})}),e.jsx(s,{span:24,children:e.jsx(u.Item,{name:"anh_chi_tiet",label:"Ảnh chi tiết (Chọn nhiều ảnh)",children:e.jsx(le,{uploadText:"Thêm ảnh chi tiết"})})})]})}),e.jsx(s,{span:24,lg:8,children:e.jsx(u.Item,{name:"anh_chinh",label:"Ảnh chính (Ảnh đại diện)",children:e.jsx(E,{title:"Ảnh chính",showTitle:!1,helperText:"Ảnh đại diện của sân bóng.",uploadText:"Tải ảnh chính",altText:"Ảnh chính sân bóng",aspectRatio:1,previewWidth:240})})})]})};export{me as F,fe as R,ge as a};
