# ask-cmd

A CLI tool that converts natural language requests into shell commands using AI.

## Setup

1. Export your API key for the desired provider:

```bash
# For OpenAI (default)
export OPENAI_API_KEY='your-api-key'

# For GROQ
export GROQ_API_KEY='your-api-key'
export AI_PROVIDER='groq'
```

2. Install dependencies and run:

```bash
deno task start "list files in current directory"
```

## Usage

```bash
ask-cmd "your natural language request"
```

The tool will generate the appropriate command and write it to your terminal, allowing you to review and execute it by pressing Enter.

## Examples

```bash
ask-cmd "show all running processes"
# Outputs: ps aux

ask-cmd "find all pdf files in current directory"
# Outputs: find . -name "*.pdf"
```
