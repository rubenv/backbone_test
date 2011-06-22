BASEDIR=./tools/js-validate
BACKEND_FILES=app/backend/*.js app/backend/*/*.js
CLIENT_FILES=public/js/app.js

all:
	$(BASEDIR)/run.js node $(BACKEND_FILES)
	$(BASEDIR)/run.js browser $(CLIENT_FILES)
