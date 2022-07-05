# API

As i was able to modify API contract, i made some changes.

| verb | path     | answer                                       |
| ---: | :------- | :------------------------------------------- |
|  GET | /ping    | HTTP code 201 if app is up                   |
| POST | /sign-up | 201 or 400 + validation errors or 409 or 500 |
| POST | /sign-in | 200 or 400 or 500                            |
