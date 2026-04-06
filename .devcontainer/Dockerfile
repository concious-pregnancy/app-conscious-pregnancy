# Pin Playwright version - must match @playwright/test in frontend/package.json
ARG PLAYWRIGHT_VERSION=1.58.2
FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble AS playwright

FROM debian:trixie-20260112 AS base

# Set the working directory for all dockerfile commands
WORKDIR /workspace

# Install dependencies
RUN apt update \
    && apt install -y --no-install-recommends \
    sudo \
    zsh \
    curl \
    git \
    unzip \
    nodejs \
    locales locales-all \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install oh-my-zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended || true

# Set the default shell for the root user to zsh
RUN usermod --shell /bin/zsh root && chsh -s /bin/zsh root || true

# Configure locales
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen \
    && locale-gen en_US.UTF-8 \
    && update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# Set default locale environment variables
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8 \
    PATH="/root/.bun/bin:${PATH}" \
    BUN_VERSION=1.1.38

# Install Bun runtime (pinned version)
RUN curl -fsSL https://bun.sh/install | bash \
    && /root/.bun/bin/bun --version

# Install TypeScript compiler globally (pinned version)
RUN /root/.bun/bin/bun add -g typescript@5.8.3 \
    && /root/.bun/bin/bunx tsc --version || echo "TypeScript installed via Bun"

# Install additional development tools and Playwright system dependencies
RUN apt update && apt install -y --no-install-recommends \
    lsof \
    gnupg \
    vim \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon0 \
    libxdamage1 \
    libpango-1.0-0 \
    libasound2 \
    libatspi2.0-0 \
    xdg-utils \
    libnss3 \
    libnspr4 \
    libxcomposite1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libcairo2 \
    xvfb \
    xauth \
    && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI (used by agent for PR creation, CI checks, code review)
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt update && apt install -y --no-install-recommends gh \
    && rm -rf /var/lib/apt/lists/*

# Install Sentry CLI (used by agent for error investigation)
RUN curl -sL https://sentry.io/get-cli/ | bash

# Install AWS CLI v2
RUN curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-$(uname -m).zip" -o /tmp/awscliv2.zip \
    && unzip -q /tmp/awscliv2.zip -d /tmp \
    && /tmp/aws/install \
    && rm -rf /tmp/awscliv2.zip /tmp/aws

# Copy pre-built Playwright browsers from official image (avoids runtime download)
COPY --from=playwright /ms-playwright /ms-playwright
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
RUN /ms-playwright/chromium-*/chrome-linux/chrome --version || echo "WARNING: Chromium binary may not be compatible"

# Set up workspace directory
RUN mkdir -p /workspace && chmod 777 /workspace

# Set the default shell for interactive sessions
SHELL ["/bin/zsh", "-c"]
