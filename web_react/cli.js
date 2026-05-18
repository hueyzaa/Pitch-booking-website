/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { paramCase, pascalCase, camelCase, snakeCase } = require('change-case');

const actionName = yargs.argv._[0];
const dirName = yargs.argv._[1];
let moduleName = yargs.argv._[2];

if (!actionName) {
  console.log('Chua dung cu phap > node cli.js add <dir-name> <module-name>');
  return false;
}

if (!dirName) {
  console.log(`Chua dung cu phap > node cli.js ${actionName} <dir-name> <module-name>`);
  return false;
}

// if (!moduleName) {
//   console.log(`Chua dung cu phap > node cli.js ${actionName} ${dirName} <module-name>`);
//   return false;
// }

function genNames(rawName = '') {
  const pascalCaseName = pascalCase(rawName);
  const camelCaseName = camelCase(rawName);
  const paramCaseName = paramCase(rawName);
  const sentenceCaseName = snakeCase(rawName);

  return {
    pascalCaseName,
    paramCaseName,
    camelCaseName,
    sentenceCaseName
  };
}

function addNewModule() {
  const { paramCaseName, pascalCaseName, camelCaseName, sentenceCaseName } = genNames(
    moduleName ? moduleName : dirName
  );
  const { pascalCaseName: baseModulePascalName, paramCaseName: baseModuleParamName } = genNames(dirName);
  const moduleFolder = moduleName
    ? `./src/pages/${baseModulePascalName}/${pascalCaseName}`
    : `./src/pages/${baseModulePascalName}`;

  fs.mkdirSync(moduleFolder, { recursive: true });
  fs.readdirSync('./templates').forEach((filename) => {
    const oldPath = path.join('./templates', filename);
    const newName = filename.replace('.template', '.tsx').replace('ComponentName', pascalCaseName);
    const newPath = path.join(moduleFolder, newName);
    if (fs.existsSync(newPath)) {
      return false;
    }

    try {
      fs.copyFileSync(oldPath, newPath);
      // Update noi dung file
      let fileContent = '';
      fileContent = fs.readFileSync(newPath).toString();
      fileContent = fileContent.replace(/\[component-name\]/g, paramCaseName);
      fileContent = fileContent.replace(/\[ComponentName\]/g, pascalCaseName);
      fileContent = fileContent.replace(/\[componentName\]/g, camelCaseName);
      fileContent = fileContent.replace(/\[component_name\]/g, sentenceCaseName);
      fileContent = fileContent.replace(/\[COMPONENT_NAME\]/g, sentenceCaseName.toUpperCase());
      fs.writeFileSync(newPath, fileContent);
    } catch (error) {
      console.error('@addNewModule > ' + error.stack);
    }

    console.log('-> generated: ' + newPath);
  });

  try {
    // Thêm cấu hình route cho component trong router mới
    const routerConfigsPath = './src/router/routes/protectedRoutes.tsx';
    let routerConfigsContent = fs.readFileSync(routerConfigsPath).toString();

    // Thêm route vào children array
    routerConfigsContent = routerConfigsContent.replace(
      `{/*Declare route here*/}`,
      `{
        path: '${paramCaseName}',
        element: <${pascalCaseName} />,
      },
      {/*Declare route here*/}`
    );

    // Thêm lazy import
    routerConfigsContent = routerConfigsContent.replace(
      `/*import-component-here*/`,
      moduleName
        ? `const ${pascalCaseName}Page = React.lazy(() => import('@app/pages/${baseModulePascalName}/${pascalCaseName}/${pascalCaseName}'));
/*import-component-here*/`
        : `const ${pascalCaseName}Page = React.lazy(() => import('@app/pages/${baseModulePascalName}/${baseModulePascalName}'));
/*import-component-here*/`
    );

    // Thêm wrapped component với withLoading HOC
    routerConfigsContent = routerConfigsContent.replace(
      `/*import-component-with-loading-here*/`,
      `const ${pascalCaseName} = withLoading(${pascalCaseName}Page);
/*import-component-with-loading-here*/`
    );

    fs.writeFileSync(routerConfigsPath, routerConfigsContent);

    // Thêm cấu hình Sidebar cho API Configs
    const apiConfigsPath = './src/configs/api-configs.ts';
    let apiConfigsContent = fs.readFileSync(apiConfigsPath).toString();
    apiConfigsContent = apiConfigsContent.replace(
      `/*new-api-path-here*/`,
      `${sentenceCaseName.toUpperCase()}: '/${paramCaseName}',` + `\n  /*new-api-path-here*/`
    );
    fs.writeFileSync(apiConfigsPath, apiConfigsContent);

    // Thêm sidebar navigation
    const sidebarnavConfigsPath = './src/components/layouts/main/sider/sidebarNavigation.tsx';
    let sidebarConfigsContent = fs.readFileSync(sidebarnavConfigsPath).toString();
    sidebarConfigsContent = sidebarConfigsContent.replace(
      `/*new-sidebar-nav-here*/`,
      `{
    title: 'common.${paramCaseName}',
    key: '${paramCaseName}',
    icon: <StarOutlined />,
    url: '/${paramCaseName}'
  },` + `\n  /*new-sidebar-nav-here*/`
    );
    fs.writeFileSync(sidebarnavConfigsPath, sidebarConfigsContent);
  } catch (error) {
    console.error(error.stack);
  }
}

if (actionName.toUpperCase() === 'ADD') {
  addNewModule();
} else {
  console.log('Action khong dung => add');
}
