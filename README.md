# ask-cmd

A CLI tool that converts natural language requests into linux shell commands using AI.

## How to build

Deno 2 or later is required to build the project.

```bash
deno task build:binary
```

This will create a binary in the `dist` directory.

## Configuration

1. Provider configuration:
   - Command line switch: --provider
   - Environment variable: ASK_CMD_PROVIDER
   - Possible values: openai, groq, openai-like
   - Required
2. API key configuration:
   - Command line switch: --api-key
   - Environment variable: ASK_CMD_API_KEY
   - Alternative environment variables depending on the provider: OPENAI_API_KEY, GROQ_API_KEY
   - Usually required
3. Model id configuration:
   - Command line switch: --model-id
   - Environment variable: ASK_CMD_MODEL_ID
   - Required for OpenAI-like provider. Other providers may have default model ids.
4. Base URL configuration:
   - Command line switch: --base-url
   - Environment variable: ASK_CMD_BASE_URL
   - Required for OpenAI-like provider
5. Prompt template configuration:
   - Command line switch: --prompt-template
   - Environment variable: ASK_CMD_PROMPT_TEMPLATE
   - Optional
   - A text template that will have the string "{{request}}" replaced with the user's request

## Usage

```bash
ask-cmd "your natural language request"
```

The tool will generate the appropriate command and write it to your terminal, allowing you to review, edit if desired, and execute it by pressing Enter.

Pressing CTRL+C or ESC will exit the tool without executing the command.

## Examples

```bash
ask-cmd "show all running processes"
# Outputs something like: ps aux

ask-cmd "find all pdf files in current directory"
# Outputs something like: find . -name "*.pdf"
```

## License

See the [LICENSE](LICENSE.md) file for license rights.
