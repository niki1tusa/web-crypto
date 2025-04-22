import { type Express } from "express"
import { AppContext } from "./ctx"
import { Passport } from "passport"
import { ExtractJwt, Strategy as JWTStategy } from "passport-jwt"

//в payload лежит зашифровка, был зашифрован id user
export const applyPassportToExpressApp = (
  app: Express,
  ctx: AppContext,
): void => {
  const passport = new Passport()

  passport.use(
    new JWTStategy(
      {
        secretOrKey: "token",
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
      },
      (JWTPayload: string, done) => {
        ctx.prisma.user
          .findUnique({
            where: { id: JWTPayload },
          })
          .then(user => {
            if (!user) {
              done(null, false)
              return
            }
            done(null, user)
          })
          .catch(e => {
            done(e, false)
          })
      },
    ),
  )
  app.use((req, res, next) => {
    if (!req.headers.authorization) {
      next()
      return
    }
    passport.authenticate("jwt", { session: false })(req, res, next)
  })
}
// next нужен для того чтобы app (express) двигался к следующему middleware (он идёт сверху вниз)
