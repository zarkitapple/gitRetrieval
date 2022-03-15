import { Octokit } from "octokit";
import 'dotenv/config'
import * as fs from "fs"
import {exec} from "child_process"

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

//get all repositories
const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    type: "all",
    page:1,
    per_page: 100,

});
let allrepos = repos.map(repo => {
    return {
        name: repo.name,
        owner: repo.owner.login,
        url: repo.git_url
    }
});



// filter by regex
allrepos = allrepos.filter(repo => {
    return repo.name.match(`^G81.2022.[0-9]{2}.E${process.env.EXERCISE_ID}$`);
});

// sort by name
allrepos = allrepos.sort((a, b) => {
    let first = a.name.split(".");
    let second = b.name.split(".");
    if(first[2] < second[2]) return -1;
    if(first[2] > second[2]) return 1;
    return 0;
        
}) 

console.log(allrepos);

// Uncomment the next lines to download and clone de repos

//fs.mkdirSync(`./ge${process.env.EXERCISE_ID}`, { mode: 0o777 });
//process.chdir(`./ge${process.env.EXERCISE_ID}`);

//git clone repositories
// allrepos.forEach(repo => {
//     const cmd = `git clone https://github.com/${repo.owner}/${repo.name}.git`;
//     console.log(cmd);
//     exec(cmd, (err, stdout, stderr) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(stdout);
//     });
// });