
all: capnp/.built

capnp/.built: build/.built
	capnp compile -o- /usr/include/capnp/*.capnp | \
		node --experimental-modules build/index.js

build/.built: \
	$(shell find * -type f -name '*.ts') \
	schema-bootstrap.d.ts \
	schema-bootstrap.js
	npm run build

clean-capnp:
	rm -rf capnp/

clean-build:
	rm -rf build/

clean: clean-capnp clean-build

.PHONY: all clean clean-capnp clean-build
