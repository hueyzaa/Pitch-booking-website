/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { paramCase, pascalCase, camelCase, snakeCase } = require('change-case');

const actionName = yargs.argv._[0];
const moduleName = yargs.argv._[1];

if (!actionName) {
  console.log('Thieu action (add|remove)');
  return;
}

if (!moduleName) {
  console.log('Thieu ten module');
  return;
}

function genNames(rawName = '') {
  let paramCaseName = paramCase(rawName);
  let pascalCaseName = pascalCase(paramCaseName);
  let camelCaseName = camelCase(paramCaseName);
  let sentenceCaseName = snakeCase(paramCaseName);
  return {
    pascalCaseName,
    paramCaseName,
    camelCaseName,
    sentenceCaseName,
  };
}

function addNewModule() {
  const { paramCaseName, pascalCaseName, camelCaseName, sentenceCaseName } =
    genNames(moduleName);

  const moduleFolder = `./src/${paramCaseName}`;
  const moduleDtoFolder = path.join(moduleFolder, 'dto');

  fs.mkdirSync(moduleDtoFolder, { recursive: true });
  fs.readdirSync('./template').forEach((filename) => {
    const newName = filename
      .replace('.tpl', '.ts')
      .replace('template', paramCaseName);
    const oldPath = path.join('./template', filename);

    let newPath = '';
    if (/controller|module|service/.test(filename)) {
      newPath = path.join(moduleFolder, newName);
    } else if (/dto/.test(filename)) {
      newPath = path.join(moduleDtoFolder, newName);
    } else if (/entity/.test(filename)) {
      return;
    }

    if (fs.existsSync(newPath)) {
      return;
    }

    try {
      fs.copyFileSync(oldPath, newPath);

      // Update noi dung file
      let fileContent = '';
      fileContent = fs.readFileSync(newPath).toString();
      fileContent = fileContent.replace(/\[module-name\]/g, paramCaseName);
      fileContent = fileContent.replace(/\[ModuleName\]/g, pascalCaseName);
      fileContent = fileContent.replace(/\[moduleName\]/g, camelCaseName);
      fileContent = fileContent.replace(/\[module_name\]/g, sentenceCaseName);
      fs.writeFileSync(newPath, fileContent);
    } catch (error) {
      console.error(error.stack);
    }

    try {
      // Update Import Module
      if (/module/.test(filename)) {
        const moduleName = `${pascalCaseName}Module`;
        const appModulePath = './src/app.module.ts';
        let appModuleContent = fs.readFileSync(appModulePath).toString();
        appModuleContent = appModuleContent.replace(
          '/*IMPORT_OTHER_MODULE_HERE*/',
          `import { ${moduleName} } from './${paramCaseName}/${paramCaseName}.module';` +
            `\n/*IMPORT_OTHER_MODULE_HERE*/`,
        );
        appModuleContent = appModuleContent.replace(
          '/*ADD_OTHER_MODULE_HERE*/',
          `${moduleName},` + `\n    /*ADD_OTHER_MODULE_HERE*/`,
        );
        fs.writeFileSync(appModulePath, appModuleContent);
      }
    } catch (error) {
      console.error(error.stack);
    }

    console.log('-> generated: ' + newPath);
  });

  // Add permission
  let permissionFileContent = fs
    .readFileSync('src/configs/permission.config.ts')
    .toString();
  permissionFileContent = permissionFileContent.replace(
    '/*IMPORT_OTHER_PERMISSON_HERE*/',
    '{\n' +
      `    name: '${paramCaseName}',\n` +
      '    actions: {\n' +
      '      index: true,\n' +
      '      create: true,\n' +
      '      show: true,\n' +
      '      edit: true,\n' +
      '      delete: true,\n' +
      '      export: true,\n' +
      '      showMenu: true,\n' +
      '    },\n' +
      '  },\n' +
      '  /*IMPORT_OTHER_PERMISSON_HERE*/',
  );
  fs.writeFileSync('src/configs/permission.config.ts', permissionFileContent);
}

function removeModule() {
  const { paramCaseName, pascalCaseName } = genNames(moduleName);

  const moduleFolder = `./src/${paramCaseName}`;
  fs.rmSync(moduleFolder, { recursive: true, force: true });

  try {
    // Update Import Module
    const moduleName = `${pascalCaseName}Module`;
    const appModulePath = './src/app.module.ts';
    let appModuleContent = fs.readFileSync(appModulePath).toString();
    appModuleContent = appModuleContent.replace(
      `import { ${moduleName} } from './${paramCaseName}/${paramCaseName}.module';`,
      '',
    );
    appModuleContent = appModuleContent.replace(`${moduleName},`, '');
    fs.writeFileSync(appModulePath, appModuleContent);
  } catch (error) {
    console.error(error.stack);
  }
}

function updateNameEntities() {
  try {
    const fileNames = fs.readdirSync('src/database/entities');

    console.log(JSON.stringify(fileNames, null, 2));

    fileNames.forEach((oldFileName) => {
      fs.renameSync(
        path.join('src/database/entities', oldFileName),
        path.join(
          'src/database/entities',
          paramCase(oldFileName.replace('.ts', '')) + '.entity.ts',
        ),
      );
    });
  } catch (error) {
    console.log(error.stack);
  }
}

if (actionName.toUpperCase() === 'ADD') {
  addNewModule();
} else if (actionName.toUpperCase() === 'REMOVE') {
  removeModule();
} else if (actionName.toUpperCase() === 'UPDATE-NAME-ENTITY') {
  updateNameEntities();
} else {
  console.log('Action khong dung => add | remove');
}
