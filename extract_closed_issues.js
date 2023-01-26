const {Octokit} = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

const TOKEN=''

const repos = ['ipython/ipython']

const getAllData = async (owner, repo) => {
    const issues  = []
    let page = 0;
    let progressJson = null;
    let issuesJson = null;

    // Check if progress.json exists
    const progressPath = path.join(__dirname, `adi/progress_${repo}.json`);
    if (fs.existsSync(progressPath)) {
        const progress = JSON.parse(fs.readFileSync(progressPath));
        page = progress.page;
        console.log('progress: ', progress);
        // Read issues.json
        const issuesPath = path.join(__dirname, `adi/issues_${repo}_2.json`);
        if (fs.existsSync(issuesPath)) {
            issuesJson = JSON.parse(fs.readFileSync(issuesPath));
            issues.push(...issuesJson);   
        }
    }

    const octokit = new Octokit({
        auth: TOKEN
    });
    while (true) {
        try{
            const {data} = await octokit.request('GET /repos/{owner}/{repo}/issues', {
                owner,
                repo,
                state: 'closed', // ['all', 'open', 'closed']
                per_page: 100,
                page: page
            });

        console.log('page: ', page, data.length)
        if (data.length <= 0) {
            issues.push(...data);
            break;
        }
        issues.push(...data);
        page++;
        } catch (error) {
            console.log('error: ', error);
            // Retry
            console.log('Retrying in 2 seconds', page);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        // Write progress.json
        progressJson = JSON.stringify({page}, null, 2);
        fs.writeFileSync(progressPath, progressJson);

        // Write issues.json
        issuesJson = JSON.stringify(issues, null, 2);
        fs.writeFileSync(path.join(__dirname, `adi/issues_${repo}_2.json`), issuesJson);
    }
    return issues;
}

failed=[]
const runScript = async () => {
   for(const repo of repos) {
        const [owner, repoName] = repo.split('/');
        console.log('owner: ', owner, 'repo: ', repoName);fs.lstat
        // try {
            await getAllData(owner, repoName).then((issues) => {
                const issuesJson = JSON.stringify(issues, null, 2);
                // Write to issues_reponame.json
                fs.writeFileSync(path.join(__dirname, `adi/issues_${repoName}_2.json`), issuesJson);
            });
        // } catch (error) {
            // failed.push(repoName);
        // }
    }
    console.log('failed: ', failed);
}

runScript();