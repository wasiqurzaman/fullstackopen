const dummy = (array) => {
  return 1;
}

const totalLikes = (array) => {
  return array.length === 0 ? 0 : array.reduce((sum, el) => sum + el.likes, 0);
}


const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.sort((a, b) => {
    return b.likes - a.likes;
  }).at(0);

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const mostBlogs = (blogs) => {
  const obj = blogs.reduce((b, { author }, i) => {
    b[author] = b[author] || 0;
    b[author] += 1;
    return b;
  }, [])
  return Object.keys(obj).map((auth, i) => {
    return {
      author: auth, blogs: Object.values(obj)[i]
    }
  }).sort((a, b) => b.blogs - a.blogs).at(0);
}

const mostLikes = () => {
  const obj = blogs.reduce((b, { author, likes }) => {
    b[author] = b[author] || 0;
    b[author] += likes
    return b;
  }, {})
  return Object.keys(obj).map((auth, i) => {
    return {
      author: auth,
      likes: Object.values(obj)[i]
    }
  }).sort((a, b) => b.likes - a.likes)[0];
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}