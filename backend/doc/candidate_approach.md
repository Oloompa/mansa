# Candidate Approach

1. read back end readme
2. clone repository
3. read rot readme
4. inspect file tree
5. inspect configuration
6. inspect source code
7. run scripts

## First conclusions

### Already good

- npm workspace
- typescript is used
- editorconfig is used
- an advanced formatter (prettier) is used

### Bad

- permissive typescript configuration
- there is a package-lock.json in backend folder
- .gitignore configuration exclude package-lock.json
- wrong vscode extension.json file name
- using a linter as formatter
- [conflicts](https://blog.theodo.com/2019/08/empower-your-dev-environment-with-eslint-prettier-and-editorconfig-with-no-conflicts/) between prettier and editorconfig

### Missing

- linter
- naming conventions
- test

## Actions

### fix configuration

### add linter

### add test

### prepare new architecture

### move code to new architecture
