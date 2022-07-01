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
- typescript is used (even if useless in current state)
- editorconfig is used (even if prettier override it)
- an advanced formatter (prettier) is used

### Bad config

- permissive typescript configuration
- there is a package-lock.json in backend folder (probably a file before using npm workspace)
- package-lock.json should always be send to repo (.gitignore configuration exclude it)
- wrong vscode extension.json file name
- using a linter as formatter
- [conflicts](https://blog.theodo.com/2019/08/empower-your-dev-environment-with-eslint-prettier-and-editorconfig-with-no-conflicts/) between prettier and editorconfig
- no source map in dist

### Bad code

- settings are hardcoded
- spelling errors (url `registrtion` should be `registration`)
- logic code is tightly coupled to presentation and infrastructure
- wrong url for heath check (path `health` should be `healthz` => probably a mistake in doc)
- use of GET http method everywhere
- no explicit validation error message
- a validation error will probably cause an error 500
- table Persons is created each time the http server run
- table Persons has a unused fields

### Missing

- linter
- naming conventions
- test

## Actions and progress

| order | status | description                     |
| :---: | :----: | :------------------------------ |
|   1   |  [X]   | Fix configuration               |
|   2   |  [X]   | Add linter                      |
|   3   |  [X]   | Prepare new architecture        |
|   4   |  [X]   | Add logger                      |
|   5   |  [⠀]   | Implement features from scratch |
|  5.1  |  [⠀]   | Implement registration          |
|  5.1  |  [⠀]   | Implement login                 |
|   6   |  [⠀]   | Suggest improvements            |

### Usecases

#### Registration

name + valid email + valid password

#### Authentication

email + password
OK => return name
KO => return validation error list

### Data

#### User

name alphanumeric with length in `[4, 50]` and UNIQUE
email contains alphanumeric, a single @ and length < 256 and UNIQUE
password alphanumeric with length in `[4, 50]`

### Logs

JSON

### Errors handling

up to me

### API

/healthz
=> respond 200 (with)

## Details

### Commit lint

I use conventional commit because:

- standardisation is good in computing
- commit messages are more readable
- it allow us to use semantic versioning later

To make me sure I respect the syntax each time i use a git hook i developed in past.

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

In future i will take a look to the coming [native nodejs test library](https://nodejs.org/api/test.html)

### Implementation

I used port and adapters pattern in order to:

- make the brain of app independent of any framework / presenter / infrastructure choice
- to allow us to easily test the app
- to allow us to refactor app without the need of rewrite tests

I make the choice to rewrite the app from scratch rather than adapt it because:

- code base is currently very light (main reason)
- there is no test
- code base is really bad and full of bugs

I used TDD to easily get the "minimal" required code to address business rules.

#### Validation

I think validation of data should move on domain part. But i am not sure of the good way to do it.

### Prod ready required improvements

- logging (use a prod ready adapter)
- tracing
- CI/CD
  - quality code check like [Sonar Cloud](https://sonarcloud.io/)
  - semantic versioning
  - test
  - build
  - deploy if everything is OK
- monitoring
- use a professional email checker like [mailboxlayer](https://mailboxlayer.com/)
- add session management
- add permission management
- encrypt the password
- switch typescript config to [project reference](https://www.typescriptlang.org/docs/handbook/project-references.html) in order to increase build speed (and immediate test running speed) (by side effect)
- add sign-out feature

### Suggestions

- Allow multiple users with same name. In real life homonyms exists.
- Your email validation rule is not correct. It will accept wrong emails and refuse legit ones.
- Don't limit password max length ...
- and allow all characters
- but ask for longer passwords ...
- and refuse too weak passwords or passwords already known by dictionaries.

### Bonus

I corrected some errors in your markdown:

- spelling errors => you should use a spell extension
  - `charaters`
  - `lenght`
  - `consumming`
- lint errors => there are also linters for markdown
  - spaces
  - same head title used two times

### Conclusion

There was too much issues. I am pretty sure i forgot something.
