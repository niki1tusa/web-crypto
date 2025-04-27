update "User"
set email = concat(
    nick,
    '@example.com'
)
where
 email is null;
--  все пользователь у кого email = null, получат email, который установил set 