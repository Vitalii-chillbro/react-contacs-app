import { rest } from "msw"
import { setupServer } from "msw/lib/node"
import { users } from "./_fixtures_/users"

export const handlers = [
    rest.get('https://randomuser.me/api/?results=200', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                results: users,
            })
        )
    })
]

export const server = setupServer(...handlers)