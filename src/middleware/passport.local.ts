import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserSumCart,
  getUserWithRolesById,
} from "services/client/auth.services";
import { comparePassword } from "services/user.services";

const configPassPortLocal = () => {
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, async function verify(
      req,
      username,
      password,
      callback
    ) {
      const { session } = req as any;
      if (session?.messages?.length) {
        session.messages = [];
      }
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        // throw new Error(`Username: ${username} not found`);
        return callback(null, false, {
          message: `Username/password invalid`,
        });
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        // throw new Error(`Invalid password`);
        return callback(null, false, {
          message: `Username/password invalid`,
        });
      }
      return callback(null, user as any);
    })
  );

  passport.serializeUser(function (user: any, callback) {
    callback(null, { id: user.id, username: user.username });
  });

  passport.deserializeUser(async function (user: any, callback) {
    const { id, username } = user;
    //qurrey db
    const userInDB: any = await getUserWithRolesById(id);

    const sumCart = await getUserSumCart(id);

    return callback(null, { ...userInDB, sumCart: sumCart });
  });
};

export default configPassPortLocal;
