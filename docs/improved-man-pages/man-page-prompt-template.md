# Improved Man Page Generator Prompt

```
Please create an improved man page for the Linux command [COMMAND]. 

Follow this structure:
1. NAME - Command name and one-line description
2. QUICK START - 3-4 basic usage examples
3. VISUAL SYNTAX - Command structure visualization
4. DESCRIPTION - Brief explanation of what the command does
5. COMMONLY USED OPTIONS - Organized in tables by functional categories
6. [COMMAND-SPECIFIC SECTION] - For regex, file formats, etc. if applicable
7. PRACTICAL EXAMPLES - Real-world use cases grouped by tasks
8. ENVIRONMENT - Relevant environment variables
9. SEE ALSO - Related commands
10. TIPS - Practical advice for effective usage
11. COMMON ERRORS - Troubleshooting section
12. VERSION DIFFERENCES - Platform variations if relevant

Make it beginner-friendly while maintaining technical accuracy. Use tables for options, showing short flags, long flags, descriptions, and examples. Include plenty of practical examples showing how to combine options for common tasks.
```

## Optional Enhancements

Add any of these lines to the prompt for specific needs:

- For complex data processing commands: "Include a data flow diagram showing how input is processed into output."

- For networking tools: "Add a network diagram illustrating the command's place in typical network operations."

- For system administration commands: "Include a security considerations section highlighting potential risks."

- For file manipulation commands: "Add a detailed explanation of how the command handles different file types and encodings."

- For installation instructions: "Include distribution-specific variations (apt/yum/pacman) where applicable."

## Format Specifications

- Use tables for presenting options and flags
- Provide concrete examples with realistic file names and data
- Use code blocks with syntax highlighting for all command examples
- Organize options by functional categories rather than alphabetically
- Include expected output snippets where helpful

## Example Table Format

```markdown
### Output Control Options
| Option | Long Option | Description | Example |
|--------|-------------|-------------|---------|
| `-n` | `--line-number` | Show line numbers | `grep -n "error" log.txt` |
| `-v` | `--invert-match` | Show non-matching lines | `grep -v "success" log.txt` |
```
