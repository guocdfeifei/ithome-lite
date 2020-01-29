function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const platform = process.env.UNI_PLATFORM

export function formatTime (date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatSlideList (slide) {
  const title = slide.title
  const image = `https://p1.pstatp.com/large/b71f000518565f234cd6`
  const link = slide.id
  // const id = slide.id
  return {
    title,
    image,
    link: `/pages/detail/news?id=${link}&title=${title}`
  }
}

export function formatNewsList (news) {
  // const { newsid, title, postdate, commentcount, lapinid, image } = news
  return {
    id: news.id,
    title: news.title,
    pub_time: news.pub_time,
    comment_count: news.comment_count,
    lapinid: '',
    image: `https://p1.pstatp.com/large/b71f000518565f234cd6`,
    link: `/pages/detail/news?id=${news.id}&title=${news.title}`
  }
}

export function formatTopicList (topic) {
  const { id, c, cn, t, vc, rc, rt, un, uid } = topic
  const headpath = `00${String(uid).padStart(7, '0').replace(/\B([0-9]{2})/g, '/$1')}_60.jpg`
  return {
    id,
    title: t,
    tag: c,
    type: cn,
    author: {
      nickname: un,
      headimg: `https://avatar.ithome.com/avatars/${headpath}`
    },
    viewcount: vc,
    replycount: rc,
    replytime: rt
  }
}

export function formatComment (comment) {
  return {
    id: comment.M.Ci,
    author: comment.M.N,
    phone: comment.M.Ta,
    floor: comment.M.SF || `${comment.F}楼`,
    content: comment.M.C.replace(/<img/g, '<img width="100%"')
  }
}
