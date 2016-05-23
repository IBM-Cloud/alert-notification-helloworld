FROM registry.ng.bluemix.net/ibmnode

	ADD . /node-alert

        WORKDIR /node-alert 

        RUN npm install

	ENV NODE_ENV production

	EXPOSE 8080
	
	CMD ["node", "/node-alert/app.js", "--container"]
