## purpose

- this project to create npm library for pickly posts client. This client is generated using open api tools based off the openAPI defenitions for the posts api.

## Build prerequisits

- inialize project

  1. run `git init`
  2. run `yarn init` in the root directory
  3. In package.json:
     - "name": "PACKAGE-NAME"
     - "repository": {
       "type": "git",
       "url": "https://github.com/Sahl-A/posts_client"
       }
     - "main": "lib/index.js"

- semantic-release

  1. Documentation: https://semantic-release.gitbook.io/semantic-release/v/beta/
  2. create github token: https://github.com/semantic-release/github
  3. Add the generated token as a secret in the github repo with name GH_TOKEN
  4. yarn add semantic-release-cli --dev
  5. in the root directory: `npx semantic-release-cli setup` and answer the questions and provide the github token and choose github actions as our CI
  6. Once finished, it will add changes to package.json, e.g, add semantic release script, add it to dependencies, convert the repository url to https
  7. Add the CI configuration in release.yaml inside .github/workflows.
     - make sure to add GH_TOKEN & NPM_TOKEN as environment variables. The NPM_TOKEN will be added to the repo secrets automatically when running the CI action
     - make sure to enable the npm package to work with github CI:
       -- https://github.blog/changelog/2020-10-02-npm-automation-tokens/
  8. Add the following configuration in releaserc.yaml in project root directory:

  ```
  branches:
  - main
  ```

- commitizen

  1. Add commitizen locally: `yarn add commitizen --dev`
  2. Initialize the conventional changelog adapter:
     `npx commitizen init cz-conventional-changelog --save-dev --save-exact`
  3. The above command added cz-conventional-changelog package and added it to dependencies and added its configuration to package.json
  4. For the sake of consistency, remove the config of commitizen added by the above command from package.json and add the following in .czrc:

  ```
  {
  "path": "cz-conventional-changelog"
  }
  ```

  4. The command `npx commitizen init cz-conventional-changelog --save-dev --save-exact` ran using npm and added package-lock.json. Since we work with yarn, we will run `yarn` to update the yarn.lock file, then remove package-lock.json
  5. add `"commit": "cz"` in scripts in package.json
  6. run `yarn commit`, it will open a dialoge to fullfill.
  7. Read more about the commit conventions:
     1. https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format
     2. https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#

## Buisness logic prerequisits

- openAPI definitions file

  - add post.openApi.yml file in the root directory

- openapi-generator-cli

  1. if not installed: `sudo yarn global add @openapitools/openapi-generator-cli`
  2. after installation run the following in project root path `openapi-generator-cli`
  3. `openapi-generator-cli generate -g typescript-axios -i OPENAPI_FILE.yaml -o lib/`

- axios

  1. `yarn add axios`

- typescript
  1. if typescript is not installed: `yarn global add typescript`
  2. in project root directory `tsc --init`
  3. In the created tsconfig.json uncomment the following keys:
     - moduleResolution: "node"
     - declaration: true
     - sourceMap: true
     - target: "ESNext"
  4. in project root directory `tsc --build`
  5. in package.json add "main": "lib/index.js"
