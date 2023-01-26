# Bugs4Py

Bugs4Py is a dataset of bug reports from 4 open-source Python projects - Ansible, Pandas, Scikit-learn and IPython. It contains the bug reports and the commits associated with the bug report. It is a useful resource for developing automated bug localization systems, particularly ML/DL based systems which require large amounts of training data.  

## Usage 
Bugs4Py is provided as a set of JSONL files, one for each project in the dataset. Each line in the JSONL files is a JSON object with keys and values 

## Reproduction 
The scripts used to create to Bugs4Py have been provided here.  

First, ```extract_closed_issues.js``` is used to extract all closed issues for a specified repository. Use ```npm -i``` to install the required dependencies using ```package.json```.   
Once the issues are extracted, ```issues_with_commits.ipynb``` is used to extract the issues and PRs with commits associated with it.   
Finally, ```final_dataset.ipynb``` is used to create the dataset after filtering issues for bug reports.  


## Auxillary files 
The intermediate files such as the list of all issues, issues with commits etc. are available in this [folder](https://drive.google.com/drive/folders/1BQdyQfRZuQIGz6DVdkvVZcEFSFJDop6E).  