import{u as f,a as b,r as w,A as v,B as y,c8 as $,n as j,j as n,m as a,k as d,F as o,D as F,q as _,o as x,s as r,N as z,z as P}from"./index-DpH7D4J6.js";import{B as l}from"./BaseForm-DkyjgyHI.js";import{p as u}from"./patterns-CiPeFOmw.js";import{C as k}from"./auth.api-Cz41MuMr.js";import{B as I}from"./BaseInput-BWXNuiaP.js";import{I as L}from"./InputPassword-g9p3CYVE.js";import{A as S}from"./AuthLayout-DGIkzW-q.js";import"./v4-C6aID195.js";import"./AuthLayout.styles-d9atmCI3.js";const T=()=>{const s=f(),e=b(),[c,i]=w.useState(!1);return{handleSubmit:async p=>{try{i(!0);const t=await k({...p,is_first_change:1});(t==null?void 0:t.code)===200&&((await v.post(`${y.LOGOUT}`)).code===200&&e($()),s("/auth/login"))}catch(t){j.error({message:t.message}),console.error("First login password change error:",t)}finally{i(!1)}},isLoading:c}},B=n.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  box-sizing: border-box;
`,A=n.div`
  padding: 3rem;
  width: 100%;
  max-width: 32rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background-color: var(--background-color);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  }

  @media only screen and (${a.xs}) {
    padding: 1.5rem;
    max-width: 100%;
    border-radius: 16px;
  }

  @media only screen and (${a.sm}) {
    padding: 2rem;
    max-width: 24rem;
  }

  @media only screen and (${a.md}) {
    padding: 2.5rem;
    max-width: 28rem;
  }

  @media only screen and (${a.lg}) {
    padding: 3rem;
    max-width: 32rem;
  }
`,E=n.div`
  margin-bottom: 2rem;
  color: var(--text-secondary-color);
  font-size: ${o.md};
  font-weight: ${d.regular};
  line-height: 1.6;
  text-align: center;

  @media only screen and (${a.xs}) {
    font-size: ${o.xs};
    margin-bottom: 1.5rem;
  }

  @media only screen and (${a.md}) {
    font-size: ${o.md};
  }
`,q=n.div`
  margin-bottom: 1rem;
  font-size: 1.75rem;
  font-weight: ${d.bold};
  line-height: 1.3;
  text-align: center;
  color: var(--primary-color);
  letter-spacing: -0.02em;

  @media only screen and (${a.xs}) {
    font-size: 1.5rem;
  }

  @media only screen and (${a.lg}) {
    font-size: 2rem;
  }
`,h=n(l.Item)`
  margin-bottom: 1.25rem;

  & .ant-form-item-control-input {
    min-height: 3.5rem;
  }

  & .ant-form-item-explain-error {
    font-size: ${o.xs};
    margin-top: 0.5rem;
  }

  & label {
    color: var(--text-main-color);
    font-size: ${o.md};
    font-weight: ${d.semibold};
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }
`;n(I)`
  color: var(--text-main-color);
  background: transparent;
  border-radius: 10px;
  height: 3rem;
  font-size: ${o.md};

  & input.ant-input {
    background: transparent;
    border-radius: 10px;
    font-size: ${o.md};
  }

  &:hover,
  &:focus,
  &.ant-input-affix-wrapper-focused {
    border-color: var(--primary-color);
  }
`;const g=n(L)`
  color: var(--text-main-color);
  background: transparent;
  border-radius: 10px;
  height: 3rem;
  font-size: ${o.md};

  & input.ant-input {
    background: transparent;
    border-radius: 10px;
    font-size: ${o.md};
  }

  &:hover,
  &:focus,
  &.ant-input-affix-wrapper-focused {
    border-color: var(--primary-color);
  }
`,N=n(F)`
  font-size: ${o.md};
  font-weight: ${d.semibold};
  width: 100%;
  height: 3rem;
  margin-top: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`,C=()=>{const s=_(m=>m.user.user),{t:e}=x(),{handleSubmit:c,isLoading:i}=T();return s!=null&&s.need_change_password?r.jsx(B,{children:r.jsx(A,{children:r.jsxs(l,{layout:"vertical",onFinish:c,children:[r.jsx(q,{children:e("newPassword.title")}),r.jsx(E,{children:"Thay đổi nhập mật khẩu mới cho lần đầu đăng nhập"}),r.jsx(h,{name:"mat_khau_moi",label:e("common.password"),rules:[{required:!0,message:e("common.requiredField")},{pattern:u,message:e("profile.nav.securitySettings.notValidPassword")}],children:r.jsx(g,{size:"middle",placeholder:e("common.password")})}),r.jsx(h,{label:e("common.confirmPassword"),name:"mat_khau_moi_xac_nhan",dependencies:["mat_khau_moi"],rules:[{required:!0,message:e("common.requiredField")},{pattern:u,message:e("profile.nav.securitySettings.notValidPassword")},({getFieldValue:m})=>({validator(p,t){return!t||m("mat_khau_moi")===t?Promise.resolve():Promise.reject(new Error(e("common.confirmPasswordError")))}})],hasFeedback:!0,children:r.jsx(g,{placeholder:e("common.confirmPassword")})}),r.jsx(l.Item,{children:r.jsx(N,{type:"primary",htmlType:"submit",loading:i,children:e("common.login")})})]})})}):r.jsx(z,{to:"/",replace:!0})},J=()=>{const{t:s}=x();return r.jsxs(r.Fragment,{children:[r.jsx(P,{children:s("common.firstLogin")}),r.jsx(S,{children:r.jsx(C,{})})]})};export{J as FirstLoginPage,J as default};
