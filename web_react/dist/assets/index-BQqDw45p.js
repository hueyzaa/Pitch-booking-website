import{j as t,m,F as n,k as p,D as j,r as l,u as T,a as v,G as O,s as e,N as w,R as $,C as P,n as c,f as F,H as z,o as k,z as R}from"./index-DpH7D4J6.js";import{V as B,G}from"./auth.api-Cz41MuMr.js";import{B as d}from"./BaseForm-DkyjgyHI.js";import{q as I}from"./base-DTzaVxil.js";import{B as q}from"./BaseInput-BWXNuiaP.js";import{A as C}from"./AuthLayout.styles-d9atmCI3.js";import"./v4-C6aID195.js";const N=t.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`,S=t.div`
  padding: 2.5rem;
  width: 31.75rem;
  border-radius: 20px;
  box-shadow: var(--box-shadow-login);
  border-radius: 20px;
  background-color: var(--background-color);

  @media only screen and (${m.xs}) {
    padding: 1.25rem;
    width: 20.75rem;
    max-height: calc(100vh - 3rem);
  }

  @media only screen and (${m.md}) {
    padding: 2.5rem;
    width: 31.75rem;
    max-height: calc(100vh - 3rem);
  }
`,V=t.div`
  margin-bottom: 1.875rem;
  color: var(--text-main-color);
  font-size: ${n.xs};
  font-weight: ${p.regular};

  @media only screen and (${m.xs}) {
    font-size: ${n.xxs};
  }

  @media only screen and (${m.md}) {
    font-size: ${n.xs};
  }
`,E=t.div`
  margin-bottom: 0.625rem;
  font-size: ${n.xxl};
  font-weight: ${p.bold};
  line-height: 1.5625rem;
  text-align: center;
`,A=t(d.Item)`
  margin-bottom: 0.75rem;
  & .ant-form-item-control-input {
    min-height: 3.125rem;
  }

  & .ant-form-item-explain-error {
    font-size: ${n.xs};
  }

  & label {
    color: var(--primary-color);
    font-size: ${n.md};
    line-height: 1.25rem;
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }
`,X=t(q)`
  color: var(--text-main-color);
  background: transparent;

  & input.ant-input {
    background: transparent;
  }
`,D=t(j)`
  font-size: ${n.md};
  font-weight: ${p.semibold};
  width: 100%;
`,L=t.div`
  margin-top: 16px;
  text-align: center;
`,W=t.button`
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
  &:disabled {
    color: #bfbfbf;
    cursor: not-allowed;
  }
`,H=()=>{const[a,o]=l.useState(!1),f=T(),g=v(),[i,h]=l.useState(60),x=window.location.href,u=I.parseUrl(x).query.email;l.useEffect(()=>{let r;return i>0&&(r=setTimeout(()=>h(i-1),1e3)),()=>clearTimeout(r)},[i]);const b=async r=>{try{o(!0);const s=await B({email:u,otp:r.otp});(s==null?void 0:s.isVerified)===!0&&(c.success({message:"Xác thực OTP thành công"}),g(F(s)),z(),f("/"))}catch(s){c.error({message:s.message||"Xác thực OTP thất bại"})}finally{o(!1)}},y=async()=>{try{o(!0),await G({email:u})&&c.success({message:"Mã OTP đã được gửi lại, vui lòng kiểm tra email."}),h(60)}catch(r){c.error({message:r.message||"Gửi lại OTP thất bại"})}finally{o(!1)}};return O()?e.jsx(N,{children:e.jsx(S,{children:e.jsx($,{children:e.jsx(P,{span:24,children:e.jsxs(d,{layout:"vertical",onFinish:b,children:[e.jsx(E,{children:"Xác thực OTP"}),e.jsx(V,{style:{textAlign:"center"},children:"Vui lòng nhập OTP đã được gửi đến email của bạn"}),e.jsx(A,{name:"otp",label:"OTP",rules:[{required:!0,message:"OTP là bắt buộc"}],children:e.jsx(X,{size:"middle",placeholder:"Nhập OTP"})}),e.jsx(d.Item,{children:e.jsx(D,{type:"primary",htmlType:"submit",loading:a,children:"Xác thực"})}),e.jsx(L,{children:e.jsx(W,{type:"button",onClick:y,disabled:i>0||a,children:i>0?`Gửi lại mã sau ${i}s`:"Gửi lại mã OTP"})})]})})})})}):e.jsx(w,{to:"/",replace:!0})},ee=()=>{const{t:a}=k();return e.jsxs(e.Fragment,{children:[e.jsx(R,{children:a("common.verifyOtp")}),e.jsx(C,{children:e.jsx(H,{})})]})};export{ee as VerifyOtpPage,ee as default};
