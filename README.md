# Project Name

## Overview
This project is built using PHP, JavaScript, TypeScript, React, and utilizes Docker for containerization. It also uses npm and Composer for package management.

## Prerequisites
- Docker
- Docker Compose


## Setup

### Clone the repository
```sh
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

### on aggreagatorApi folder
```sh
composer install
npm i
```

### After the installing php dependencies and javascript dependencies, run sail to get you php container
```sh
sail up -d
```

### Run the migrations with the seed, you will have the first user on the database 
```sh
sail artisan migrate:fresh --seed
```

### now you should run the site scraper to get the data from the apis
```sh
sail php artisan fetch:articles
```

## Now let's go to the site_agggregator_frontend folder and run
```sh
npm i
```

### After the installing javascript dependencies, let's run docker-compose to get the frontend container
```sh
docker compose up -d
```

### Now you can access the frontend on http://localhost:3000

