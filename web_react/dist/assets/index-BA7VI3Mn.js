import{j as a,s as e,B as c}from"./index-DpH7D4J6.js";import{B as d}from"./BaseInput-BWXNuiaP.js";const u=a.div`
  border: 1px solid var(--border-base-color);
  border-radius: 6px;
  padding: 0 0.75rem;
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--text-main-color);
  font-weight: 400;
  background-color: var(--background-color);

  span {
    font-size: 13px;
  }
`,n=["#db4437","#4285f4","#0f9d58","#f4b400","#9c27b0","#3f51b5","#00bcd4","#795548"],x=a.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,l=a.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,b=a.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 8px;
  background-color: ${r=>r.color||"#fff"};
  border: 2px solid var(--border-base-color);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
`,f=a.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 4px 0;
`,m=a.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${r=>r.color};
  cursor: pointer;
  border: 2px solid ${r=>r.active?"var(--primary-color)":"transparent"};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`,v=({value:r="",onChange:s,disabled:t})=>{const i=o=>{t||s==null||s(o)},p=o=>{s==null||s(o.target.value)};return e.jsxs(x,{children:[e.jsxs(l,{children:[e.jsx(b,{color:r}),e.jsx(d,{value:r,onChange:p,placeholder:"#000000",size:"small",disabled:t,style:{flex:1}})]}),e.jsx(f,{children:n.map(o=>e.jsx(m,{color:o,active:(r||"").toLowerCase()===o.toLowerCase(),onClick:()=>i(o)},o))})]})},h=c.CONG_NGHE,w="common.cong-nghe",A=1,_=0,C={STT:"50px",ACTION:"120px",MO_TA:"300px",MAU:"100px",TRANG_THAI:"120px",NGAY_TAO:"180px"};export{v as C,A as S,u as T,_ as a,C as b,w as c,h as d};
