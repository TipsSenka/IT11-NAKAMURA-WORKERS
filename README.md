# IT11-NAKAMURA

Cloudflare PagesとWorkersで動かす、API動作確認用の小さなサンプルです。

## ローカル確認

Workerの依存関係をインストールして起動します。

```powershell
Set-Location .\worker
npm install
npm run dev
```

ブラウザで`pages/index.html`を開き、Worker URLに`http://127.0.0.1:8787`を指定してください。

## デプロイ

```powershell
Set-Location .\worker
npm run deploy
```

デプロイ後、`pages/index.html`のWorker URL入力欄へ発行された`https://<worker-name>.<subdomain>.workers.dev`を設定します。Pagesの公開URLが確定したら、`worker/wrangler.toml`の`ALLOWED_ORIGIN`をPagesドメインへ変更して再デプロイしてください。

## API

| パス | 内容 |
| --- | --- |
| `GET /api` | API情報 |
| `GET /api/course` | コース一覧 |
| `GET /api/hello?name=山田` | 挨拶。`name`未指定は400 |
| `GET /api/fortune` | 今日の運勢 |
| `GET /api/events` | イベント一覧 |

未定義パスは404を返します。