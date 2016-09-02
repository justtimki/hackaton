@echo off
npm install -g grunt-cli && npm install && cd node_modules && git clone https://git.epam.com/epm-uui/uui-framework.git && cd uui-framework && npm install && grunt uui && cd ../.. && run.bat