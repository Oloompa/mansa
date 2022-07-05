# API

As i was able to modify API contract, i made some changes.

| verb | path     | request               | answer                                       |
| ---: | :------- | :-------------------- | :------------------------------------------- |
|  GET | /ping    | NA                    | 201 if app is up                             |
| POST | /sign-up | name, email, password | 201 or 400 + validation errors or 409 or 500 |
| POST | /sign-in | email, password       | 200 or 400 or 401 or 500                     |
