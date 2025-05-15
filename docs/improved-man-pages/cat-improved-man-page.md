# CAT(1) User Commands

## NAME
**cat** - concatenate and display files

## QUICK START
```bash
# Display contents of a file
cat filename.txt

# Display contents of multiple files
cat file1.txt file2.txt

# Create a new file using output redirection
cat > newfile.txt

# Append content to an existing file
cat >> existingfile.txt
```

## VISUAL SYNTAX
```
cat [OPTION]... [FILE]...
```

## DESCRIPTION
The `cat` (short for concatenate) command reads files sequentially and writes their contents to standard output. When no file is specified or when `-` is specified as a filename, `cat` reads from standard input.

## COMMONLY USED OPTIONS

### Display Options
| Short | Long          | Description                                      | Example                |
|-------|---------------|--------------------------------------------------|------------------------|
| `-n`  | `--number`    | Number all output lines                          | `cat -n file.txt`      |
| `-b`  | `--number-nonblank` | Number only non-empty output lines         | `cat -b file.txt`      |
| `-s`  | `--squeeze-blank` | Squeeze multiple adjacent blank lines        | `cat -s file.txt`      |
| `-E`  | `--show-ends` | Display $ at end of each line                    | `cat -E file.txt`      |
| `-T`  | `--show-tabs` | Display TAB characters as ^I                     | `cat -T file.txt`      |
| `-v`  | `--show-nonprinting` | Use ^ and M- notation for control chars   | `cat -v file.txt`      |
| `-A`  | `--show-all`  | Equivalent to -vET (show all special characters) | `cat -A file.txt`      |

### General Options
| Short | Long          | Description                                      | Example                |
|-------|---------------|--------------------------------------------------|------------------------|
| `-`   | `--`          | Read from standard input                         | `cat - file.txt`       |
|       | `--help`      | Display help information                         | `cat --help`           |
|       | `--version`   | Output version information                       | `cat --version`        |

## PRACTICAL EXAMPLES

### Basic File Operations
```bash
# Display contents of a file
cat document.txt

# Display contents of multiple files
cat header.txt content.txt footer.txt

# Combine multiple files into one
cat file1.txt file2.txt file3.txt > combined.txt

# Append text to an existing file
cat additional.txt >> document.txt
```

### Interactive Input
```bash
# Create a new file from standard input (press Ctrl+D to end)
cat > newfile.txt

# Append to an existing file from standard input (press Ctrl+D to end)
cat >> existingfile.txt

# Read from standard input and pipe to another command
cat - | grep "search term"
```

### File Formatting and Analysis
```bash
# Display a file with line numbers
cat -n script.sh

# Display a file with line numbers only for non-empty lines
cat -b log.txt

# Remove multiple blank lines from output
cat -s large-file.txt

# Show all non-printing characters
cat -A config.file

# Display tabs as ^I and end of lines as $
cat -ET source.code
```

### Combining with Other Commands
```bash
# Use cat with pipes to filter text
cat log.txt | grep "ERROR" | sort

# Read from stdin, process, then write to file
cat - | tr '[:lower:]' '[:upper:]' > uppercase.txt

# Display the first 10 lines of a file with line numbers
cat -n file.txt | head -10

# Count number of lines in a file
cat file.txt | wc -l
```

## ENVIRONMENT
The behavior of `cat` is affected by the following environment variables:

- `LC_ALL`, `LC_CTYPE`, `LANG`: These variables affect the interpretation of character classes in the handling of the `-b`, `-n` options.

## SEE ALSO
- `tac` - Concatenate and print files in reverse
- `less` - Display text files with paging capability
- `more` - Display content one screen at a time
- `head` - Output the first part of files
- `tail` - Output the last part of files
- `nl` - Number lines of files

## TIPS
- Use `cat` primarily for viewing small files or combining files.
- For large files, consider using `less` or `more` for pagination.
- When working with binary files, the `-A` option can help identify non-printing characters.
- The `tac` command (cat spelled backwards) shows file contents in reverse order.
- `cat` is often used in scripts as part of a pipeline to process text files.

## COMMON ERRORS

| Error | Cause | Solution |
|-------|-------|----------|
| `cat: file.txt: No such file or directory` | File doesn't exist or path is incorrect | Check filename and path |
| `cat: file.txt: Permission denied` | User doesn't have read permission | Change permissions with `chmod +r file.txt` |
| `cat: write error: Broken pipe` | The command receiving output from cat terminated early | Usually safe to ignore; check receiving command |
| File appears garbled or contains strange characters | Viewing binary file or file with non-ASCII characters | Use `-A` option or try `hexdump` instead |

## VERSION DIFFERENCES
- GNU cat (Linux): Has the full range of options listed above
- BSD cat (macOS): May have slightly different behavior with `-b` and `-n` options
- POSIX cat: Defines only a subset of the options (mainly `-u`, `-v`, `-e`, `-t`)

Most modern Linux distributions use GNU cat, which includes all the features described in this man page. The main differences between versions are in how special characters are displayed and how line numbering works.
