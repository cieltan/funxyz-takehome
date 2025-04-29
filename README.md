# Fun.xyz Takehome Project

# Overview

For the take-home project, I wanted to make Fun.xyz more "fun". With that design philosophy in mind, I decided to implement the application with a neumorphic twist. But I didn't want users to also not be able to tell what the functionalities of the website were - so I decided to combine the familiar layout of a popular token swap website with my design system.

# Setup

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd funxyz-takehome
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FUNXYZ_API_KEY="INSERT_YOUR_API_KEY_HERE"
```

# Functionality

- User can select tokens to swap (source and target)
- User can input amounts
- User can see value of amount (unitPrice * amount)
- User can use searchParsm (/source=USDC&target=ETH) to share the site with preloaded tokens

# Afterthoughts

I wanted to set up Storybook with NextJS but it seems there might be some compatibility issues with the latest versions. With the latest Storybook beta version, we can actually see in real-time (using their preview mode) what accessiblity problems a neumorphic design might have for users (low contrast, poor touchable element indiciation).

Having one central system allows engineers and designers to collaborate and maintain a consistent design language for a product/organization without slowing down the SDLC.