dev-fe:
	cd fe/nextjs && pnpm dev

dev-be:
	cd be/axum-starter && cargo watch -x run

dev:
	make -j 2 dev-fe dev-be
