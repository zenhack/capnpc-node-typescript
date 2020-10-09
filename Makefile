
CORE_SCHEMA ?= /usr/include

all: capnp/.built

capnp/.built: build/.built
	capnp compile -o- \
		--src-prefix=$(CORE_SCHEMA)/ \
		$(CORE_SCHEMA)/capnp/*.capnp \
		| ./capnpc-node-typescript.js

build/.built: $(shell find * -type f -name '*.ts')
	npm run build

clean:
	rm -rf build/

.PHONY: all clean
