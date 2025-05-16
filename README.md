# EatToast – Smart Restaurant Ops Platform

## 🧱 Tech Stack

### Frontend:

- React
- Apollo Client
- Bootstrap
- CSS

### Backend:

- Node.js / Express.js
- GraphQL
- MongoDB Atlas
- Firebase (Storage & Real-time DB)
- Stripe API

### DevOps & Deployment:

- Docker & Docker Compose
- GitHub Actions for CI/CD
- AWS EC2 with Elastic IP
- Nginx (for serving frontend)
- SSH for remote deployment

## ✨ Features

- **Customer Portal**: Online ordering, table reservations, order tracking
- **Admin Dashboard**: User management, analytics, system configuration
- **Manager Interface**: Menu editing, inventory control, staff scheduling
- **Real-time Updates**: Live order status and kitchen notifications
- **Payment Processing**: Secure checkout with Stripe integration
- **Mobile Responsive**: Optimized for all device sizes
- **Role-based Access**: Different views for customers, staff, managers, and admins

## 🚀 Local Development

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Docker & Docker Compose (for containerized setup)
- MongoDB (local or Atlas connection)
- Firebase account
- Stripe account

### 1. Clone the repository

```bash
git clone https://github.com/ibidamola/Smart-Restaurant-Ops.git
cd EatToast
```

### 2. Install dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

### 3. Set up environment variables

Create `.env` files in both the frontend and backend directories:

**Backend .env:**

```
DATABASE_URL=your_mongo_url
GRAPHQL_PORT=6002
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FIREBASE_DATABASE_URL=https://...
FIREBASE_STORAGE_BUCKET=gs://...
TEST_VARIABLE=hello_world
```

**Frontend .env:**

```
REACT_APP_API_URL=http://localhost:6002
REACT_APP_FIREBASE_CONFIG={"apiKey":"...","authDomain":"..."}
```

### 4. Run locally (Non-Docker)

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm start
```

- Frontend: http://localhost:3000
- Backend (Apollo): http://localhost:6002

## 🐳 Dockerized Setup (Locally)

1. Make sure you have Docker Desktop running
2. Create appropriate `.env` files as mentioned above
3. Run with Docker Compose:

```bash
docker-compose up
```

- Frontend: http://localhost:3000
- Backend: http://localhost:6002

Note: If the frontend cannot connect to backend in Docker, it's configured to use `host.docker.internal`

## 📦 Docker Configuration

### docker-compose.yml

```yaml
version: "3"
services:
  backend:
    build: ./backend
    ports:
      - "6002:6002"
    env_file: ./backend/.env
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    env_file: ./frontend/.env
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
```

## ✅ CI/CD Pipeline – GitHub Actions

The project includes an automated CI/CD pipeline using GitHub Actions that:

1. Builds and pushes frontend & backend Docker images to Docker Hub
2. SSHs into EC2 using a .pem key stored in GitHub Secrets
3. Pulls the Docker images and runs them
4. Exposes required ports

### github-actions.yml Demo

```yaml
name: Deploy to AWS EC2

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Login to DockerHub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Backend Docker image
        uses: docker/build-push-action@v2
        with:
          context: ./backend
          push: true
          tags: yourusername/eattoast-backend:latest

      - name: Build and push Frontend Docker image
        uses: docker/build-push-action@v2
        with:
          context: ./frontend
          push: true
          tags: yourusername/eattoast-frontend:latest

      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            # Stop existing containers
            docker-compose down

            # Pull latest images
            docker pull yourusername/eattoast-backend:latest
            docker pull yourusername/eattoast-frontend:latest

            # Create backend .env file
            echo "${{ secrets.BACKEND_ENV_FILE }}" > backend.env

            # Run containers
            docker-compose -f docker-compose.prod.yml up -d
```

## 🌐 AWS Deployment (EC2)

### 1. Launch EC2 Instance

- Use Ubuntu 22.04 or Amazon Linux 2
- Minimum recommended: t2.medium (2 vCPU, 4GB RAM)
- Allow inbound traffic for ports: 22 (SSH), 80, 443, 3000, 6002
- Attach Elastic IP (so IP doesn't change when instance restarts)

### 2. SSH Key Setup

- Generate and download your `.pem` key file
- Set proper permissions: `chmod 400 your-key.pem`
- Connect via SSH: `ssh -i "your-key.pem" ec2-user@your-elastic-ip`

### 3. Manual EC2 Setup (First Time)

```bash
# Update system
sudo yum update -y  # Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y  # Ubuntu

# Install Docker
sudo yum install docker -y  # Amazon Linux
# OR
sudo apt install docker.io -y  # Ubuntu

# Start Docker service
sudo service docker start
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER

# Create directory for application
mkdir -p ~/eattoast
```

### 4. Production docker-compose.yml

```yaml
version: "3"
services:
  backend:
    image: yourusername/eattoast-backend:latest
    restart: always
    ports:
      - "6002:6002"
    env_file: ./backend.env

  frontend:
    image: yourusername/eattoast-frontend:latest
    restart: always
    ports:
      - "80:3000"
    depends_on:
      - backend
```

### 5. Required GitHub Secrets

| Name             | Description                     |
| ---------------- | ------------------------------- |
| EC2_HOST         | Your EC2 public Elastic IP      |
| EC2_USERNAME     | Usually ec2-user or ubuntu      |
| EC2_SSH_KEY      | Your base64 encoded .pem key    |
| DOCKER_USERNAME  | Docker Hub username             |
| DOCKER_PASSWORD  | Docker Hub password/token       |
| BACKEND_ENV_FILE | Your .env content as multi-line |

### 6. Testing Deployment

After successful deployment:

- Frontend: http://your-elastic-ip (port 80)
- GraphQL API: http://your-elastic-ip:6002

## 🔐 Environment Variables and Secrets

### Backend Environment Variables

| Variable                | Description                             |
| ----------------------- | --------------------------------------- |
| DATABASE_URL            | MongoDB connection string               |
| GRAPHQL_PORT            | Port for GraphQL server (default: 6002) |
| STRIPE_SECRET_KEY       | Stripe API secret key                   |
| STRIPE_WEBHOOK_SECRET   | Secret for Stripe webhook verification  |
| FIREBASE_DATABASE_URL   | Firebase Realtime DB URL                |
| FIREBASE_STORAGE_BUCKET | Firebase Storage bucket URL             |

### Frontend Apollo Client Configuration

```bash
const isDocker = window.location.hostname !== "localhost";
const client = new ApolloClient({
  uri: isDocker ? "http://host.docker.internal:6002/" : "http://localhost:6002/",
  cache: new InMemoryCache(),
});
```

## 🛠 Troubleshooting

### Common Issues

1. **Cannot connect to backend from frontend in Docker**:

   - Check that you're using `host.docker.internal` as the hostname in Docker environment

2. **MongoDB connection issues**:

   - Ensure your MongoDB Atlas IP whitelist includes your current IP address
   - For EC2 deployment, whitelist the EC2 Elastic IP

3. **SSH permission denied**:

   - Check that your .pem file has correct permissions (chmod 400)
   - Verify the EC2 username is correct (ec2-user for Amazon Linux, ubuntu for Ubuntu)

4. **GitHub Actions deployment failure**:
   - Verify all required secrets are properly configured
   - Check EC2 has sufficient disk space for Docker images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request
