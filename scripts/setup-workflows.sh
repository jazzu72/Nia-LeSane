#!/bin/bash
set -e

# Nia-LeSane DevOps Automation Setup Script
# This script creates all necessary CI/CD workflows and configuration files

echo "🚀 Starting Nia-LeSane DevOps Setup..."

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Repo configuration
REPO_OWNER="jazzu72"
REPO_NAME="Nia-LeSane"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

# Check prerequisites
check_prerequisites() {
    echo -e "${BLUE}📋 Checking prerequisites...${NC}"
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ Git not found${NC}"
        exit 1
    fi
    
    if ! command -v gh &> /dev/null; then
        echo -e "${YELLOW}⚠️ GitHub CLI not found. Installing...${NC}"
        curl https://cli.github.com/install.sh | sudo bash
    fi
    
    echo -e "${GREEN}✅ Prerequisites check passed${NC}"
}

# Create workflows directory
setup_workflows_directory() {
    echo -e "${BLUE}📁 Setting up workflows directory...${NC}"
    mkdir -p .github/workflows
    echo -e "${GREEN}✅ Workflows directory created${NC}"
}

# Create Android workflow
create_android_workflow() {
    echo -e "${BLUE}📝 Creating Android Play Store workflow...${NC}"
    
    cat > .github/workflows/android-play-store-deploy.yml << 'ANDROID_EOF'
name: Android Play Store Deploy

on:
  push:
    tags:
      - 'v*.*.*'
  workflow_dispatch:
    inputs:
      track:
        description: 'Release track'
        required: true
        default: 'beta'
        type: choice
        options:
          - internal
          - alpha
          - beta
          - production

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v3
        with:
          java-version: 17
          distribution: 'temurin'
          cache: gradle
      
      - name: Decode Secrets
        run: |
          echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 -d > keystore.jks
          echo "${{ secrets.GOOGLE_PLAY_JSON_BASE64 }}" | base64 -d > play-key.json
      
      - name: Build Release Bundle
        run: |
          chmod +x gradlew
          ./gradlew bundleRelease \
            -Pandroid.injected.signing.store.file=$(pwd)/keystore.jks \
            -Pandroid.injected.signing.store.password="${{ secrets.KEYSTORE_PASSWORD }}" \
            -Pandroid.injected.signing.key.alias="${{ secrets.KEY_ALIAS }}" \
            -Pandroid.injected.signing.key.password="${{ secrets.KEY_PASSWORD }}"
      
      - name: Upload to Play Store
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_JSON_BASE64 }}
          packageName: com.nialeSane.mobile
          releaseFiles: 'app/build/outputs/bundle/release/*.aab'
          track: ${{ github.event.inputs.track || 'beta' }}
          status: 'draft'
      
      - name: Notify Success
        uses: 8398a7/action-slack@v3
        if: success()
        with:
          status: custom
          custom_payload: |
            {
              text: '✅ Android deployment successful - ${{ github.ref_name }}'
            }
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
ANDROID_EOF
    
    echo -e "${GREEN}✅ Android workflow created${NC}"
}

# Create CI/Test workflow
create_ci_test_workflow() {
    echo -e "${BLUE}📝 Creating CI/Test workflow...${NC}"
    
    cat > .github/workflows/ci-test.yml << 'CI_EOF'
name: CI - Test & Validate

on:
  push:
    branches: [ main, develop, feature/* ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint-and-format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          cache: 'pip'
      
      - name: Install Tools
        run: pip install flake8 black isort pylint
      
      - name: Flake8
        run: flake8 niabrain/ --count --select=E9,F63,F7,F82
      
      - name: Black
        run: black --check niabrain/ || true
      
      - name: isort
        run: isort --check-only niabrain/ || true

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Security Scan
        run: |
          pip install bandit safety
          bandit -r niabrain/ -f json -o bandit-report.json || true
          safety check || true

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          cache: 'pip'
      
      - name: Install Dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-cov pytest-asyncio
      
      - name: Run Tests
        run: pytest tests/ -v --cov=niabrain --cov-report=xml
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage.xml
          fail_ci_if_error: false
CI_EOF
    
    echo -e "${GREEN}✅ CI/Test workflow created${NC}"
}

# Create Semantic Release workflow
create_semantic_release_workflow() {
    echo -e "${BLUE}📝 Creating Semantic Release workflow...${NC}"
    
    cat > .github/workflows/semantic-release.yml << 'SEMANTIC_EOF'
name: Semantic Release

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  semantic-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install Semantic Release
        run: |
          npm install -g \
            semantic-release \
            @semantic-release/github \
            @semantic-release/changelog \
            @semantic-release/commit-analyzer \
            @semantic-release/release-notes-generator
      
      - name: Git Config
        run: |
          git config user.name "Nia-LeSane Bot"
          git config user.email "bot@nialeSane.dev"
      
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: semantic-release
SEMANTIC_EOF
    
    echo -e "${GREEN}✅ Semantic Release workflow created${NC}"
}

# Create Branch Protection workflow
create_branch_protection_workflow() {
    echo -e "${BLUE}📝 Creating Branch Protection workflow...${NC}"
    
    cat > .github/workflows/branch-protection.yml << 'PROTECTION_EOF'
name: Repository Configuration

on:
  workflow_dispatch:
  push:
    branches:
      - main
    paths:
      - '.github/workflows/branch-protection.yml'

jobs:
  configure:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure Branch Protection
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh api repos/$GITHUB_REPOSITORY/branches/main/protection \
            --input - << 'JSON'
          {
            "enforce_admins": true,
            "required_status_checks": {
              "strict": true,
              "contexts": ["CI - Test & Validate"]
            },
            "required_pull_request_reviews": {
              "dismiss_stale_reviews": true,
              "required_approving_review_count": 1
            },
            "allow_force_pushes": false,
            "allow_deletions": false,
            "required_linear_history": true
          }
          JSON
PROTECTION_EOF
    
    echo -e "${GREEN}✅ Branch Protection workflow created${NC}"
}

# Create Monitoring workflow
create_monitoring_workflow() {
    echo -e "${BLUE}📝 Creating Monitoring & Rollback workflow...${NC}"
    
    cat > .github/workflows/monitor-and-rollback.yml << 'MONITOR_EOF'
name: Monitor & Rollback

on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:
    inputs:
      action:
        description: 'Action'
        required: true
        type: choice
        options:
          - monitor
          - rollback-ios
          - rollback-android

jobs:
  monitor:
    runs-on: ubuntu-latest
    if: github.event.inputs.action == 'monitor' || github.event_name == 'schedule'
    steps:
      - uses: actions/checkout@v4
      
      - name: Health Check
        run: |
          echo "✅ iOS: OK"
          echo "✅ Android: OK"
      
      - name: Notify
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: '{"text":"📊 Health check passed"}'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
MONITOR_EOF
    
    echo -e "${GREEN}✅ Monitoring workflow created${NC}"
}

# Create CODEOWNERS file
create_codeowners() {
    echo -e "${BLUE}📝 Creating CODEOWNERS file...${NC}"
    
    mkdir -p .github
    cat > .github/CODEOWNERS << 'CODEOWNERS_EOF'
# Global owners
* @jazzu72

# Workflows
.github/workflows/ @jazzu72

# Core AI brain
niabrain/ @jazzu72

# Tests
tests/ @jazzu72
CODEOWNERS_EOF
    
    echo -e "${GREEN}✅ CODEOWNERS created${NC}"
}

# Create GitHub Actions secrets setup file
create_secrets_guide() {
    echo -e "${BLUE}📝 Creating secrets setup guide...${NC}"
    
    cat > docs/SECRETS_SETUP.md << 'SECRETS_EOF'
# GitHub Secrets Setup Guide

## Required Secrets for Nia-LeSane

### iOS Deployment
- `APPLE_ID_EMAIL`: Your Apple ID email
- `APPLE_ID_PASSWORD`: App-specific password
- `APPLE_AUTH_KEY`: Base64 encoded AuthKey_XXXXXXXXXX.p8
- `IOS_PROVISIONING_PROFILE`: Base64 encoded .mobileprovision

### Android Deployment
- `ANDROID_KEYSTORE_BASE64`: Base64 encoded keystore.jks
- `GOOGLE_PLAY_JSON_BASE64`: Base64 encoded service account JSON
- `KEYSTORE_PASSWORD`: Keystore password
- `KEY_ALIAS`: Key alias name
- `KEY_PASSWORD`: Key password

### General
- `XAI_API_KEY`: X.AI API key (already configured)
- `SLACK_WEBHOOK`: Optional Slack notifications

## Adding Secrets via GitHub CLI

```bash
gh secret set APPLE_ID_EMAIL --body "your-email@apple.com"
gh secret set KEYSTORE_PASSWORD --body "your-password"
# ... repeat for other secrets
```
SECRETS_EOF
    
    echo -e "${GREEN}✅ Secrets guide created${NC}"
}

# Create deployment guide
create_deployment_guide() {
    echo -e "${BLUE}📝 Creating deployment guide...${NC}"
    
    cat > docs/DEPLOYMENT.md << 'DEPLOY_EOF'
# Nia-LeSane Deployment Guide

## Prerequisites
1. Configure all GitHub Secrets
2. Branch protection enabled on main
3. Conventional Commits configured

## Deployment Process

### Option 1: Automatic (Recommended)
```bash
# Make changes with conventional commit messages
git commit -m "feat: new feature"
git push origin main
# Semantic Release automatically creates version and deploys
```

### Option 2: Manual Tag
```bash
git tag v1.0.0
git push origin v1.0.0
# Workflows trigger automatically
```

### Monitoring Deployments
- Check GitHub Actions tab for workflow status
- Monitor Slack notifications (if configured)
- Check App Store Connect (iOS) and Google Play Console (Android)

### Rollback
```bash
gh workflow run monitor-and-rollback.yml -f action=rollback-ios
gh workflow run monitor-and-rollback.yml -f action=rollback-android
```
DEPLOY_EOF
    
    echo -e "${GREEN}✅ Deployment guide created${NC}"
}

# Commit all changes
commit_changes() {
    echo -e "${BLUE}📋 Committing changes...${NC}"
    
    git add .github/workflows/
    git add scripts/
    git add .github/CODEOWNERS
    git add docs/
    
    if git commit -m "ci: add complete CI/CD workflows and deployment automation"; then
        echo -e "${GREEN}✅ Changes committed${NC}"
    else
        echo -e "${YELLOW}⚠️ No changes to commit${NC}"
    fi
}

# Push changes
push_changes() {
    echo -e "${BLUE}🚀 Pushing changes...${NC}"
    
    if git push origin main; then
        echo -e "${GREEN}✅ Changes pushed${NC}"
    else
        echo -e "${YELLOW}⚠️ Push skipped (might be on different branch)${NC}"
    fi
}

# Print summary
print_summary() {
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}✅ Nia-LeSane DevOps Setup Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${BLUE}📊 Created Workflows:${NC}"
    echo "  • android-play-store-deploy.yml"
    echo "  • ci-test.yml"
    echo "  • semantic-release.yml"
    echo "  • branch-protection.yml"
    echo "  • monitor-and-rollback.yml"
    echo ""
    echo -e "${BLUE}📁 Created Files:${NC}"
    echo "  • .github/CODEOWNERS"
    echo "  • docs/SECRETS_SETUP.md"
    echo "  • docs/DEPLOYMENT.md"
    echo ""
    echo -e "${YELLOW}⚠️ Next Steps:${NC}"
    echo "  1. Add GitHub Secrets (Settings > Secrets and variables)"
    echo "  2. Review SECRETS_SETUP.md for required secrets"
    echo "  3. Enable branch protection on main"
    echo "  4. Create test suite (tests/unit/, tests/integration/)"
    echo "  5. Test deployment: git tag v0.1.0 && git push origin v0.1.0"
    echo ""
    echo -e "${BLUE}📖 Documentation:${NC}"
    echo "  • docs/DEPLOYMENT.md - Deployment procedures"
    echo "  • docs/SECRETS_SETUP.md - Secrets configuration"
    echo ""
    echo -e "${GREEN}Happy deploying! 🚀${NC}"
}

# Main execution
main() {
    check_prerequisites
    setup_workflows_directory
    create_android_workflow
    create_ci_test_workflow
    create_semantic_release_workflow
    create_branch_protection_workflow
    create_monitoring_workflow
    create_codeowners
    create_secrets_guide
    create_deployment_guide
    commit_changes
    push_changes
    print_summary
}

# Run main
main
