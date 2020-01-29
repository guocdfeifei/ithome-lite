import request from './request'
import { platform } from './index'

const baseUrlApi = platform === 'h5' ? '/api' : 'https://api.ithome.com'
const blogUrlApi = platform === 'h5' ? '/api' : 'http://localhost:8000'
const baseUrlDyn = platform === 'h5' ? '/dyn' : 'https://dyn.ithome.com'
const baseUrlQuan = platform === 'h5' ? '/apiquan' : 'https://apiquan.ithome.com'

const api = {
  getNewsList: (r) => request.get('/articles/', null, {
    baseURL: blogUrlApi
  }),
  getNews: (id) => request.get(`/detailarticles/${id}`, null, {
    baseURL: blogUrlApi
  }),
  getRelatedNews: (id) => request.get(`/json/tags/0${id.slice(0, 3)}/${id}.json`, null, {
    baseURL: baseUrlApi,
    parseJson: false
  }),
  getNewsComments: (id) => request.get(`/json/commentlist/350/87a8e5b144d81938.json`, null, {
    baseURL: baseUrlDyn
  }),
  getSlides: () => request.get('/toparticles/', null, {
    baseURL: blogUrlApi
  }),
  getTopics: (r) => request.get('/qzarticles/44/', {
    categoryid: 0,
    type: 0,
    orderTime: r,
    visistCount: '',
    pageLength: ''
  }, {
    baseURL: blogUrlApi
  }),
  getTopic: (id) => request.get(`/detailarticles/${id}`, null, {
    baseURL: blogUrlApi
  }),
  getTopicComments: (id, last) => request.get('/api/reply', {
    postid: id,
    replyidlessthan: last
  }, {
    baseURL: baseUrlQuan
  })
}

export default api
