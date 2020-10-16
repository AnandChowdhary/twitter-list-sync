# 🐦 Twitter List Sync

GitHub Action to sync your Twitter followers and following users to a list.

[![Build CI](https://github.com/AnandChowdhary/twitter-list-sync/workflows/Build%20CI/badge.svg)](https://github.com/AnandChowdhary/twitter-list-sync/actions?query=workflow%3A%22Build+CI%22)
[![Test CI](https://github.com/AnandChowdhary/twitter-list-sync/workflows/Test%20CI/badge.svg)](https://github.com/AnandChowdhary/twitter-list-sync/actions?query=workflow%3A%22Test+CI%22)
[![Release CI](https://github.com/AnandChowdhary/twitter-list-sync/workflows/Release%20CI/badge.svg)](https://github.com/AnandChowdhary/twitter-list-sync/actions?query=workflow%3A%22Release+CI%22)
[![Node CI](https://github.com/AnandChowdhary/twitter-list-sync/workflows/Node%20CI/badge.svg)](https://github.com/AnandChowdhary/twitter-list-sync/actions?query=workflow%3A%22Node+CI%22)

## ⭐ Features

- Schedule this action to run every day and neatly sync all your followers
- Unfollow all accounts every day and add them in a "Following" list

## 💻 Usage

You need the following environment variables:

| Environment variable          | Description                 |
| ----------------------------- | --------------------------- |
| `TWITTER_API_KEY`             | Twitter API key             |
| `TWITTER_API_SECRET_KEY`      | Twitter API secret          |
| `TWITTER_ACCESS_TOKEN`        | Twitter access token        |
| `TWITTER_ACCESS_TOKEN_SECRET` | Twitter access secret       |
| `FOLLOWING_LIST`              | List ID for following       |
| `FOLLOWERS_LIST`              | List ID for followers       |
| `REMOVE_AFTER_ADDING`         | Whether to remove following |

Here's an example workflow using the action `AnandChowdhary/twitter-list-sync`:

```yaml
name: Twitter List Sync CI
on:
  repository_dispatch:
    types: [sync]
  schedule:
    - cron: "45 * * * *"
  push:
    branches: [master]
  workflow_dispatch:
jobs:
  release:
    name: Sync
    runs-on: ubuntu-18.04
    if: "!contains(github.event.head_commit.message, '[skip ci]')"
    steps:
      - name: Twitter List Sync
        uses: AnandChowdhary/twitter-list-sync@master
        env:
          TWITTER_API_KEY: ${{ secrets.TWITTER_API_KEY }}
          TWITTER_API_SECRET_KEY: ${{ secrets.TWITTER_API_SECRET_KEY }}
          TWITTER_ACCESS_TOKEN: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          TWITTER_ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
          FOLLOWING_LIST: ${{ secrets.FOLLOWING_LIST }}
          FOLLOWERS_LIST: ${{ secrets.FOLLOWERS_LIST }}
          REMOVE_AFTER_ADDING: ${{ secrets.REMOVE_AFTER_ADDING }}
```

## 📄 License

- Code: [MIT](./LICENSE) © [Koj](https://koj.co)
- "GitHub" is a trademark of GitHub, Inc.
