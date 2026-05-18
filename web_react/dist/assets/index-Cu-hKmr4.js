import{I as i,m as r,j as n,T as c,o as m,s as e,L as d,z as l}from"./index-DpH7D4J6.js";import{I as g}from"./index-BYkIjxbO.js";import"./css-CG3sgCP8.js";const x=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.75rem 1.25rem;
  border-radius: ${i};

  background-color: var(--background-color);

  @media only screen and ${r.md} {
    padding: 2.5rem 6.25rem 6.25rem;
  }

  @media only screen and ${r.xl} {
    flex-direction: row-reverse;
    justify-content: center;
    padding: 12.5rem 3.5rem;
  }
`,p=n(g)`
  margin-bottom: 4rem;

  @media only screen and ${r.xxl} {
    margin-bottom: 0;
  }
`,f=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and ${r.xl} {
    margin-right: 7.5rem;
  }
`,s=n(c.Text)`
  font-size: 2.25rem;
  font-weight: 600;
  margin-bottom: 1rem;

  color: var(--text-main-color);

  @media only screen and ${r.md} {
    font-size: 3rem;
    margin-bottom: 1.75rem;
  }

  @media only screen and ${r.xl} {
    font-size: 4rem;
    margin-bottom: 2.25rem;
  }
`,y=n(s)`
  font-size: 0.875rem;
  margin-bottom: 1.25rem;

  @media only screen and ${r.md} {
    font-size: 1.12rem;
    margin-bottom: 1.45rem;
  }

  @media only screen and ${r.xl} {
    font-size: 1.5rem;
    margin-bottom: 1.8rem;
  }
`,b=({img:o,msg:a})=>{const{t}=m();return e.jsxs(x,{children:[e.jsx(p,{preview:!1,src:o}),e.jsxs(f,{children:[e.jsx(s,{children:t("common.oops")}),e.jsx(y,{children:a}),e.jsx(d,{to:"/",className:"ant-btn ant-btn-link",children:t("error404.comeBack")})]})]})},j="/assets/error404-BDyoNmQL.svg",v=()=>{const{t:o}=m();return e.jsxs(e.Fragment,{children:[e.jsx(l,{children:o("common.clientError")}),e.jsx(b,{img:j,msg:o("error404.notFound")})]})};export{v as Error404Page,v as default};
