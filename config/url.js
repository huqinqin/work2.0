import env from './env'

// const DEV_URL = 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/'
// const PRO_URL = 'https://produce.com'
const DEV_URL = 'http://47.96.141.89:8085'
const PRO_URL = 'http://api.ltsecurityinc.com'

export default env === 'development' ? DEV_URL : PRO_URL
