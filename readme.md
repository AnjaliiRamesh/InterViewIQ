#if vscode is tracking old github repo use this command to add new repo
git remote set-url origin https://github.com/AnjaliiRamesh/InterViewIQ.git
then verify using this -> git remote -v
you must see this :
                    origin  https://github.com/AnjaliiRamesh/InterViewIQ.git (fetch)
                    origin  https://github.com/AnjaliiRamesh/InterViewIQ.git (push)
then final step :   git push -u origin main
