const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute shell commands
const execCommand = command => {
  try {
    execSync(command, {stdio: 'inherit'});
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

// Get the project name and package name from the command line arguments
const [projectName, packageName] = process.argv.slice(2);

if (!projectName || !packageName) {
  console.error('Usage: node scripts/setup.js <ProjectName> <PackageName>');
  process.exit(1);
}

// Function to update Android package name
const updateAndroidPackageName = packageName => {
  const filesToModify = [
    'android/app/src/main/AndroidManifest.xml',
    'android/app/build.gradle',
    'android/app/src/debug/AndroidManifest.xml',
    'android/app/src/main/java/com/projectname/MainActivity.java',
    'android/app/src/main/java/com/projectname/MainApplication.java',
  ];

  filesToModify.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/com\.projectname/g, packageName);
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });

  // Rename the Java directory structure
  const oldDir = path.join(
    process.cwd(),
    'android/app/src/main/java/com/projectname',
  );
  const newDir = path.join(
    process.cwd(),
    'android/app/src/main/java',
    packageName.replace(/\./g, '/'),
  );

  fs.mkdirSync(newDir, {recursive: true});
  fs.readdirSync(oldDir).forEach(file => {
    fs.renameSync(path.join(oldDir, file), path.join(newDir, file));
  });
  fs.rmdirSync(
    path.join(process.cwd(), 'android/app/src/main/java/com/projectname'),
    {recursive: true},
  );
};

// Function to update iOS bundle identifier
const updateIOSBundleIdentifier = bundleId => {
  const infoPlistPath = path.join(
    process.cwd(),
    'ios',
    projectName,
    'Info.plist',
  );
  const projectPbxprojPath = path.join(
    process.cwd(),
    'ios',
    projectName + '.xcodeproj',
    'project.pbxproj',
  );

  if (fs.existsSync(infoPlistPath)) {
    let content = fs.readFileSync(infoPlistPath, 'utf8');
    content = content.replace(
      /<key>CFBundleIdentifier<\/key>\s*<string>.*<\/string>/,
      `<key>CFBundleIdentifier</key>\n\t<string>${bundleId}</string>`,
    );
    fs.writeFileSync(infoPlistPath, content, 'utf8');
  }

  if (fs.existsSync(projectPbxprojPath)) {
    let content = fs.readFileSync(projectPbxprojPath, 'utf8');
    content = content.replace(
      /PRODUCT_BUNDLE_IDENTIFIER = .*;/g,
      `PRODUCT_BUNDLE_IDENTIFIER = ${bundleId};`,
    );
    fs.writeFileSync(projectPbxprojPath, content, 'utf8');
  }
};

// Function to update project files with new project name and package name
const updateProjectFiles = (oldName, newName, packageName) => {
  const filesToModify = [
    'android/app/src/main/AndroidManifest.xml',
    'android/app/build.gradle',
    'android/app/src/debug/AndroidManifest.xml',
    'android/app/src/main/java/com/projectname/MainActivity.java',
    'android/app/src/main/java/com/projectname/MainApplication.java',
    `ios/${oldName}/Info.plist`,
    `ios/${oldName}.xcodeproj/project.pbxproj`,
  ];

  filesToModify.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content
        .replace(new RegExp(oldName, 'g'), newName)
        .replace(/com\.projectname/g, packageName);
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });

  // Rename iOS directory structure
  const oldIOSDir = path.join(process.cwd(), 'ios', oldName);
  const newIOSDir = path.join(process.cwd(), 'ios', newName);
  if (fs.existsSync(oldIOSDir)) {
    fs.renameSync(oldIOSDir, newIOSDir);
  }
};

// Execute the script
const oldProjectName = 'rn-starter'; // Replace with the current project name in the boilerplate
const newProjectDir = path.join(process.cwd(), projectName);
if (oldProjectName !== projectName) {
  fs.renameSync(path.join(process.cwd(), oldProjectName), newProjectDir);
}

updateProjectFiles(oldProjectName, projectName, packageName);
updateAndroidPackageName(packageName);
updateIOSBundleIdentifier(packageName);

execCommand('npm install');

console.log('React Native project setup complete!');
