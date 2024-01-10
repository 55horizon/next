<a href="https://github.com/55horizon/next"><img src="https://bafybeig45njmtzoihnkdj4rekc5af4vztiyzagqdyl2zkoavorhldi534m.ipfs.dweb.link" width="220" alt="NextJS"></a>

###

# App Router

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/55horizon/next/blob/master/LICENSE.md)

### Boilerplate for the NextJS App Router

## Getting Started

Clone the repository:

```
gh repo clone 55horizon/next
```

Open repository:

```
cd next
```

Add `.env` file for environment variables:

```
touch .env
```

Install node modules:

```
npm install
```

### Run on Local Host

Run the development server on local host:

```
npm run dev
```

Open environment in local browser:

```
http://localhost:3000
```

### Run on Local Network

Run the development server on local network:

```
npm run dev -- -H 0.0.0.0
```

Get local IP for Wi-Fi interface:

```
ipconfig getifaddr en0
```

Open environment in any browser connected to the Wi-Fi network:

```
http://YOUR_LOCAL_IP:3000
```

## Features

- Dynamic routes for pages link-4 through link-7 `/app/(pages)/(temporary)/[path]/page.js`

- OpenAI API route `http://localhost:3000/openai/api`

- 3D model-viewer with mobile AR functionality `/app/(pages)/model/components/viewer.js`

- Helpful utility functions `/app/utils/*`

- Content database `/app/database.json`

- Tailwind CSS

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) - learn about Tailwind CSS.
- [Sass Documentation](https://sass-lang.com/documentation) - learn about Sass.
- [OpenAI Documentation](https://platform.openai.com/docs/introduction/introduction) - learn about OpenAI features and API.
- [model-viewer Documentation](https://modelviewer.dev) - learn about model-viewer features and API.

## Deploy on Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
