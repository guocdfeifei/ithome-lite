<template lang="pug">
.container
  .header
    h1.news-title {{title}}
    .auth-info {{news.newssource}}({{news.newsauthor}})
  .news-content(v-html="news.detail")
  h2.related-title(v-if="relatedNews.length") 相关文章
  .news-wrap
    news-item(
      v-for="news of relatedNews",
      :news="news"
      :key="news.newsid")
</template>

<script>
// import xml2json from 'xmlstring2json'
import api from '@/utils/api'
import newsItem from '@/components/news-item'
import marked from 'marked'

export default {
  components: {
    newsItem
  },
  data () {
    return {
      id: null,
      title: '',
      news: {},
      relatedNews: []
    }
  },
  async mounted () {
    console.log('aaaaa')
    console.log(this.$mp.query)
    this.id = this.$mp.query.id
    this.title = this.$mp.query.title
    await Promise.all([
      this.getNews()
      // ,this.getRelatedNews()
    ])
  },
  methods: {
    turnToComment () {
      uni.navigateTo({
        url: `/pages/news/comment?id=${this.id}`
      })
    },
    async getNews () {
      let { id } = this
      id = `${id}`
      const news = await api.getNews(id)
      if (!news) return
      // const parsedNews = xml2json(news).rss.channel.item
      this.news = {
        newssource: news.author,
        detail: marked(news.body, { sanitize: true }),
        newsauthor: news.pub_time
      }
    },
    async getRelatedNews () {
      const newslist = await api.getRelatedNews(this.id)
      if (!newslist) return
      const parsedNews = JSON.parse(newslist.replace('var tag_jsonp =', ''))
      this.relatedNews = parsedNews.slice(0, 3).map(news => {
        return {
          title: news.newstitle,
          image: news.img,
          link: `/pages/detail/news?id=${news.newsid}&title=${news.newstitle}`,
          postdate: news.postdate
        }
      })
    }
  }
}
</script>

<style lang="less">
@import (reference) "~@/styles/index.less";

.header {
  width: 100%;
  color: #fff;
  background-color: @primary-color;
  padding: 10px;
  box-sizing: border-box;
}
.news-title {
  font-size: 22px;
}
.auth-info {
  font-size: 12px;
  margin-top: 10px;
  text-align: right;
}
.news-content {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  line-height: 1.6;
}

.related-title {
  font-size: 18px;
  font-weight: 600;
  align-self: flex-start;
  border-left: 4px solid @primary-color;
  padding: 2px 5px;
}

.news-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}

.comment-btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: @primary-color;
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comment-icon {
  width: 40px;
  height: 40px;
}
</style>
