# frontend department of blog (conected to laravel api)

## Features :

- **Authentication and Autherization** with JWT(json web token) .
- **Strong validation before send request to API** in all form using react-hook-form .
- **Protected routes** depending on (Roles , Registeration) using react-router-dom .
- contain (add post , edit post , delete post , edit users , delete users , edit roles ,)methods from api .
- Unregistered users can read firt 50 word of post only .
- Save needed previos routes in session so :
  - _when register from post page return to same post page_ .
  - _when delete or update from home route or posts route return to same route_ .
- There is the three main roles :
  - _user_ ,no permisions .
  - _Admin_ ,permisions: (Add Post , Edit Post , Delete Post ) .
  - _Super Admin_ ,permisions: (Add Post , Edit Post , Delete Post ,Edit Users , Delete Users ) .

## Technologies :

- react hooks
- context api
- react-quill
- react-router-dom
- react-cookies
- react-hook-form
- html-react-parser
- axios

## API reference:

[GitHub Repo](https://github.com/Ahmad-Ahmad-1/blog_demo_3/tree/ApiOnly)
