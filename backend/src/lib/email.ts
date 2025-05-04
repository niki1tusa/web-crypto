import _ from "lodash"
import path from "path"
import fg from "fast-glob"
import { promises as fs } from "fs"
import { env } from "./env"
import { Idea, User } from "@prisma/client"
import Handlebars from "handlebars"
import { sendEmailThroughToBrevo } from "./brevo"
import { getNewIdeaRoute} from "@app/webapp/src/lib/routes"

// memoize - функция мемоизации
// hbr - handlebars
const getHbrTemplates = _.memoize(async () => {
    const emailsDir = path.resolve(__dirname, '../emails/dist');
    try {
        const dirStat = await fs.stat(emailsDir);
        console.log('Directory exists:', dirStat.isDirectory());
    } catch (err) {
        console.error('Directory does not exist or cannot be accessed:', err);
    }
    
    // Поиск HTML-файлов
    const htmlPathsPattern = path.join(emailsDir, '**/*.html').replace(/\\/g, '/');

    const htmlPaths = fg.sync(htmlPathsPattern);

    
    // Остальной код без изменений
    const hbrTemplates: Record<string,HandlebarsTemplateDelegate> = {}
    for (const htmlPath of htmlPaths) {
        const templateName = path.basename(htmlPath, ".html")
        const htmlTemplate = await fs.readFile(htmlPath, "utf-8")
        hbrTemplates[templateName] = Handlebars.compile(htmlTemplate)
    }

    return hbrTemplates
})


const getEmailHtml = async (
  templateName: string,
  templateVariables: Record<string, string> = {},
) => {
  const hbrTemplates = await getHbrTemplates()
  const hbrTemplate = hbrTemplates[templateName]
  const html = hbrTemplate(templateVariables)
  console.log('html:', html)
  return html
}

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string
  subject: string
  templateName: string
  templateVariables?: Record<string, any>
}) => {
  console.log("Starting sendEmail function", { to, templateName })
  try {
    const fullTemplateVariables = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    }
           
    const html = await getEmailHtml(templateName, fullTemplateVariables)
    const { loggableResponse } = await sendEmailThroughToBrevo({
      to,
      subject,
      html,
    })
    console.log("Email sent successfully", loggableResponse)
    console.info("sendEmail", {
      to,
      templateName,
      templateVariables,
      response: loggableResponse,
    })
    return { ok: true }
  } catch (e) {
    console.error("Error in sendEmail function:", e)
    return { ok: false }
  }
}
export const sendWelcomeEmail = async ({
  user,
}: {
  user: Pick<User, "nick" | "email">
}) => {
  return await sendEmail({
    to: user.email,
    subject: "Thanks For Registration!",
    templateName: "welcome",
    templateVariables: {
      userNick: user.nick,
      addIdeaUrl: `${env.WEBAPP_URL}${ getNewIdeaRoute()}`,
    },
  })
}
export const sendBlockedIdeaEmail = async ({
  user,
  idea,
}: {
  user: Pick<User, "email">
  idea: Pick<Idea, "nick">
}) => {
  return await sendEmail({
    to: user.email,
    subject: "Your Idea is Blocked!",
    templateName: "ideaBlocked",
    templateVariables: {
      ideaNick: idea.nick,
    },
  })
}
