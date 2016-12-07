echo off
set arg1=%1
shift
git commit -am %arg1%
git push origin master
grunt build
grunt buildcontrol