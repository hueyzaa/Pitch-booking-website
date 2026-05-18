import{u,r as f,A as j,B as F,n,F as a,k as g,m,j as h,D as y,o as p,s as e,z as b}from"./index-DpH7D4J6.js";import{B as l}from"./BaseForm-DkyjgyHI.js";import{F as w,B as P,g as S,e as k,a as c,b as d}from"./AuthForm.styles-Cxuescae.js";import{A as B}from"./AuthLayout.styles-d9atmCI3.js";import"./BaseInput-BWXNuiaP.js";import"./InputPassword-g9p3CYVE.js";import"./BaseCheckbox-DunPE09m.js";import"./index-DS7tv41e.js";const I=()=>{const s=u(),[t,r]=f.useState(!1);return{handleSubmit:async x=>{try{r(!0);const o=await j.post(`${F.FORGOTPASS}`,x);o.code===200?s("/auth/security-code"):o.message==="USER_NOT_FOUND"?n.error({message:"Không tìm thấy tài khoản"}):n.error({message:o.message})}catch(o){n.error({message:"Có lỗi xảy ra vui lòng thử lại sau",description:o.message}),console.error("Forgot password error:",o)}finally{r(!1)}},isLoading:t}},T=h.div`
  margin-bottom: 1.875rem;
  color: var(--text-main-color);
  font-size: ${a.xs};
  font-weight: ${g.regular};

  @media only screen and ${m.xs} {
    font-size: ${a.xxs};
  }

  @media only screen and ${m.md} {
    font-size: ${a.xs};
  }
`,$=h(y)`
  font-size: ${a.md};
  font-weight: ${g.semibold};
  width: 100%;
  margin-top: 1.125rem;
  margin-bottom: 1rem;
`,E={email:"",tai_khoan:""},v=()=>{const{t:s}=p(),t=u(),{handleSubmit:r,isLoading:i}=I();return e.jsx(w,{children:e.jsxs(l,{layout:"vertical",onFinish:r,requiredMark:"optional",initialValues:E,children:[e.jsxs(P,{onClick:()=>t(-1),children:[e.jsx(S,{}),s("common.back")]}),e.jsx(k,{children:s("common.resetPassword")}),e.jsx(T,{children:s("forgotPassword.description")}),e.jsx(c,{name:"email",label:s("common.email"),rules:[{required:!0,message:s("common.emailError")},{type:"email",message:s("common.notValidEmail")}],children:e.jsx(d,{size:"middle",placeholder:s("common.email")})}),e.jsx(c,{name:"tai_khoan",label:s("common.username"),rules:[{required:!0,message:s("common.usernameError")}],children:e.jsx(d,{size:"middle",placeholder:s("common.username")})}),e.jsx(l.Item,{noStyle:!0,children:e.jsx($,{type:"primary",htmlType:"submit",loading:i,children:s("forgotPassword.sendInstructions")})})]})})},q=()=>{const{t:s}=p();return e.jsxs(e.Fragment,{children:[e.jsx(b,{children:s("common.forgotPass")}),e.jsx(B,{children:e.jsx(v,{})})]})};export{q as ForgotPasswordPage,q as default};
