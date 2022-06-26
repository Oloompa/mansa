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
- there is a package-lock.json in backend folder (probably a file before using npm workspace)
- package-lock.json should always be send to repo (.gitignore configuration exclude it)
- wrong vscode extension.json file name
- using a linter as formatter
- [conflicts](https://blog.theodo.com/2019/08/empower-your-dev-environment-with-eslint-prettier-and-editorconfig-with-no-conflicts/) between prettier and editorconfig
- no source map in dist

### Missing

- linter
- naming conventions
- test

## Actions and progress

| order | status | description                   |
| :---: | :----: | :---------------------------- |
|   1   |  [X]   | Fix configuration             |
|   2   |  [ ]   | Add linter                    |
|   3   |  [ ]   | Prepare new architecture      |
|   4   |  [ ]   | Move code to new architecture |
|   6   |  [ ]   | Fix bad features              |
|   7   |  [ ]   | Add missing features          |
|   8   |  [ ]   | Suggest improvements          |

## Details

### Dependencies choice

Here is the list of my criteria when i choose a dependency:

- focus my need
- having small footprint (avoid [dependency hell](https://wikiless.org/wiki/Dependency_hell?lang=en))
- being alive
- being enough documented
- having a good code quality

I use [npms](https://npms.io/) and [packagephobia](https://packagephobia.com/) to address my need.

#### Linter

ES lint was supposed (in this project) to be used as a formatter. Linter and formatters are two different jobs. I love the [linux philosophy](https://wikiless.org/wiki/Unix_philosophy?lang=en#Do_One_Thing_and_Do_It_Well) and specifically the principe to have multiples programs doing one simple things rather than a big one doing the coffee.

That's why i prefer [Fimbullinter](https://github.com/fimbullinter) over ESLint.

#### Test

I love to have blazing fast test execution. It allow me to run all my unit tests each time i save a single file. That's the best way to safely refactor the code. That's why I ignore frameworks who invest on marketing. I prefer unknown frameworks who focus on running tests as fast as possible. In past i used [Ava](https://github.com/avajs/ava). Now i use [Zora](https://github.com/lorenzofox3/zora).

In future i will take a look to the [native nodejs test library](https://nodejs.org/api/test.html)

### Architecture

### Commit lint

I use conventional commit. To make me sure I respect the syntax each time i use a hook i developed in past.

### Prod ready required improvements

- logging
- tracing
-
