rem we use this to create a npm-shrinkwrap file
rem the package-lock.json file includes the reference URLs that might point to an unreachable NPM mirror,
rem therefore we avoid it.
set PATH=..\..\..\target\node;%PATH%
del npm-shrinkwrap.json
call npm shrinkwrap --dev
call node filter-shrinkwrap.js
