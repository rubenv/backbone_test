JS_FILES=app/backend/*.js app/backend/*/*.js public/js/app.js

all:
	./tools/js-validate/do-validate.sh $(JS_FILES)
