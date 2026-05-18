import{o as k,al as g,s as e,D as L,t as S,j as d,a8 as B}from"./index-DpH7D4J6.js";import{R as $}from"./PlusOutlined-CpA_v2gg.js";import{I as z}from"./index-BYkIjxbO.js";import{R as E}from"./DeleteOutlined-D8cQtTJF.js";const l=180,F=d(B)`
  width: ${l}px;
  height: ${l}px;

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
`,T=d.div`
  position: relative;
  display: inline-block;
  width: ${l}px;
  height: ${l}px;
  border-radius: 8px;
  border: 1px solid var(--border-base-color);
  overflow: hidden;
`,M=d.div`
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
`,O={position:"absolute",top:8,right:8,width:28,height:28,padding:0,borderRadius:8,border:"1px solid var(--error-color)",backgroundColor:"var(--background-color)",zIndex:3,display:"inline-flex",alignItems:"center",justifyContent:"center"},A=(c,t)=>{if(!t)return"";if(t.startsWith("http"))return t;const r=t.replace(/\\/g,"/").replace(/^\//,"");return`${c}/${r}`},G=({id:c,value:t,onChange:r,title:b,showTitle:x=!0,helperText:y,helperHint:h,uploadText:j,altText:v,aspectRatio:U=1,previewWidth:s=l,disabled:p})=>{const{t:m}=k(),n=g.useMemo(()=>{if(typeof t=="string"&&t.trim()!=="")return{url:A(S,t),objectUrl:void 0};if(Array.isArray(t)&&t.length>0){const o=t[0],i=o.originFileObj||o;if(i instanceof File||i instanceof Blob){const f=URL.createObjectURL(i);return{url:f,objectUrl:f}}if(o.url)return{url:o.url,objectUrl:void 0}}return{url:void 0,objectUrl:void 0}},[t]);g.useEffect(()=>()=>{n.objectUrl&&URL.revokeObjectURL(n.objectUrl)},[n.objectUrl]);const u=n.url,w=o=>{const i=[{uid:o.uid||Date.now().toString(),name:o.name,status:"done",originFileObj:o}];return r==null||r(i),!1},I=()=>{r==null||r(void 0)},a=s/U,R=p?e.jsx("div",{style:{width:s,height:a,border:"1px dashed var(--border-base-color)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-light-color)"},children:m("common.noImage")}):e.jsx(F,{listType:"picture-card",showUploadList:!1,beforeUpload:w,accept:"image/*",style:{width:s,height:a,margin:0},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",pointerEvents:"none"},children:[e.jsx($,{style:{fontSize:20,color:"var(--primary-color)"}}),e.jsx("div",{style:{marginTop:8,fontSize:12,color:"var(--text-main-color)",fontWeight:600},children:j})]})});return e.jsxs("div",{id:c,style:{width:"100%"},children:[x&&e.jsx("div",{style:{marginBottom:12,color:"var(--primary-color)",fontSize:13,fontWeight:600},children:b}),u?e.jsxs(T,{style:{width:s,height:a},children:[e.jsx(M,{children:e.jsx(z,{src:u,alt:v,style:{width:"100%",height:"100%",display:"block",objectFit:"cover"},preview:{mask:m("common.view")}})}),!p&&e.jsx(L,{icon:e.jsx(E,{style:{color:"#ff4d4f"}}),onClick:I,size:"small",style:O})]}):R,e.jsxs("div",{style:{marginTop:8,color:"var(--text-light-color)",fontSize:12},children:[e.jsx("div",{children:y}),!!h&&e.jsx("div",{children:h})]})]})};export{G as M};
