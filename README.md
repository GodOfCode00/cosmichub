# Cosmic Hub

## Entity table
| Entity            | Description               | Global        |
|-------------------|---------------------------|---------------|
| User              |                           |               |              
| Problem           |                           |               |
| UserProblem       |                           |               |
| Discussion        |                           |               |
| ProblemDiscussion |                           |               |
| UserDiscussion    |                           |               |

### User
GET All  `http://localhost:7000/cosmichub/user`

GET Single `http://localhost:7000/cosmichub/user/:id`

GET Me `http://localhost:7000/cosmichub/user/me`

POST SignUp `http://localhost:7000/cosmichub/user/signup`

POST SignIn `http://localhost:7000/cosmichub/user/signin`

PUT Update Me `http://localhost:7000/cosmichub/user/me`

DELETE Remove `http://localhost:7000/cosmichub/user/me`
