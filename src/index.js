
/**
 * parse CLI arguments and flags
 * take arguments and use with Github API
 * get results from API and show on screen
 * package as a CLI
 * publish on NPM
 * write a README.md
 */
const { Octokit } = require("@octokit/rest")
const gh = new Octokit()

const loop = (tm) => {
  return new Promise((resolve, rej) => {
    const id = setTimeout(() => {
      resolve()
    }, tm);
  })
}

const wait = (promise) => promise.then(res => [, res]).catch(e => [e])

const run = async () => {
  let package = process.argv[2]
  let [owner, repo] = package.split("/")

  const [e, res] = await wait(gh.repos.get({owner, repo}))

  if (e) {
    console.error(`Invalid Repo: ${repo}`)
    process.exit(1)
  }

  const stars = res.data.stargazers_count
  console.log(`Repo has ${stars} stars`)    
}

run()