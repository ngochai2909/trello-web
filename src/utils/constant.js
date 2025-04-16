let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
} else if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'http://trello-web-lake-eight.vercel.app/'
}

export const API_ROOT = apiRoot
