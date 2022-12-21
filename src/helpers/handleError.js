export const serverError = (res) => res.status(500).json({ code: 500, message: 'Internal Server Error' });
export const notFoundError = (res, message) => res.status(404).json({ code: 404, message  })
export const existError = (res, message) => res.status(409).json({ code: 409, message })
export const accessDenied = (res) => res.status(403).json({ code: 403, message: 'Access denied' })