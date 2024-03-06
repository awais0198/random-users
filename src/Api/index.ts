import axios from 'axios'

import { User } from '@types'

const BASE_URL = 'https://randomuser.me'

const instance = axios.create({ baseURL: BASE_URL })

instance.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
)

const fetchRandomUsers = async ({ page = 1 } = {}): Promise<User[]> => {
  const { data } = await instance.get(`/api?page=${page}&results=9&seed=random&inc=gender,name,email,phone,picture,location`)
  return data.results
}

export default fetchRandomUsers
