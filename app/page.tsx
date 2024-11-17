import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, Blog } from 'contentlayer/generated'
import Main from './Main'

// 主页文章
export default async function Page() {
  // MARK 这里筛选onhomepage
  const filteredBlogs = allBlogs.filter((blog) => blog.onhomepage === true)
  const sortedPosts = sortPosts(filteredBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
