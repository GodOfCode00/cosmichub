# Cosmic Hub

## Entity table
| Entity            | Description                               | Global |
| ----------------- | ----------------------------------------- | ------ |
| User              | End-user account                          | Yes    |
| Problem           | Problem statements posted by user         | Yes    |
| Tag               | Unique tag hash for problem or discussion | Yes    |
| ProblemTag        | Tag associated with Problem               | No     |
| Discussion        | Discussion to the problem                 | No     |
| ProblemDiscussion |                                           |        |
| UserDiscussion    |                                           |        |

### APIs
[See postman collection](https://documenter.getpostman.com/view/23347707/2s83tDpCS3)

## Libraries Used
- `@theinternetfolks/context`
- `@theinternetfolks/snowflake`
- `bcrypt`
- `cookie-parser`
- `jsonwebtoken`
- `cors`
- `env-cmd`
- `express`
- `mongoose`

## SetUp
### Install Dependacies
Enter `npm install` in terminal

### Environment Variable
- Create a `.env` file at root
- Set `PORT` as server port to listen
- Set `MONGOURI` as your local mongo connection uri string
- Set `TOKEN_KEY` as your `jsonwebtoken` token key

### Run
- Enter `npm run dev` in terminal
- Browse to `http://localhost:{PORT}/`
