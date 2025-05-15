# WC(1) Enhanced Manual Page

## NAME
**wc** - print newline, word, and byte counts for files

## QUICK START
```bash
# Count lines, words and bytes in a file
wc file.txt

# Count only lines
wc -l file.txt

# Count lines in multiple files
wc -l file1.txt file2.txt file3.txt

# Count lines from standard input
cat file.txt | wc -l
```

## VISUAL SYNTAX
```
wc [OPTIONS] [FILE...]
 │      │       │
 │      │       └─ One or more files to count (or stdin if omitted)
 │      └─ Options specifying what to count
 └─ The wc command itself
```

## DESCRIPTION
`wc` (word count) is a command that displays the number of lines, words, and bytes in files or from standard input. By default, it outputs three numbers representing the count of lines, words, and bytes, followed by the filename.

If multiple files are specified, a line showing the total counts is also displayed. When no file is specified, `wc` reads from standard input.

## COMMONLY USED OPTIONS

| Short | Long          | Description                               | Example                    |
|-------|---------------|-------------------------------------------|----------------------------|
| `-c`  | `--bytes`     | Print only the byte count                 | `wc -c file.txt`           |
| `-m`  | `--chars`     | Print only the character count            | `wc -m file.txt`           |
| `-l`  | `--lines`     | Print only the newline count              | `wc -l file.txt`           |
| `-w`  | `--words`     | Print only the word count                 | `wc -w file.txt`           |
| `-L`  | `--max-line-length` | Print length of longest line        | `wc -L file.txt`           |

### Output Format Options

| Short | Long              | Description                                | Example                     |
|-------|--------------------|--------------------------------------------|-----------------------------|
| `-z`  | `--zero-terminated`| Line delimiter is NUL, not newline         | `find . -print0 \| wc -z`   |
| `--total` | `--total`      | Print a total line when multiple files     | `wc --total *.txt`          |

## COUNT DEFINITIONS

Understanding exactly what is being counted:

| Count Type | Definition                                                       |
|------------|------------------------------------------------------------------|
| Lines      | Number of newline characters (`\n`)                              |
| Words      | Number of sequences of non-whitespace characters separated by whitespace |
| Bytes      | Number of bytes in the file                                      |
| Characters | Number of characters (may differ from bytes in multibyte encodings) |

## PRACTICAL EXAMPLES

### Basic Usage

```bash
# Get all counts (lines, words, bytes) for a file
wc README.md

# Count only lines in a file
wc -l logfile.txt

# Count only words in a file
wc -w document.txt

# Count bytes in a file
wc -c image.jpg
```

### Multiple Files

```bash
# Count lines in all text files
wc -l *.txt

# Count words in specific files
wc -w report.doc letter.txt notes.md

# Display counts for every Python file
wc *.py
```

### With Pipes

```bash
# Count lines of output from another command
ls -la | wc -l

# Count words in command output
cat document.txt | grep "important" | wc -w

# Count non-blank lines in a file
grep -v "^$" file.txt | wc -l
```

### Special Applications

```bash
# Count number of files in a directory
ls | wc -l

# Count logical lines of code (excluding comments and blank lines)
grep -v '^$\|^\s*#' script.py | wc -l

# Find the longest line in a file
wc -L file.txt

# Count total bytes across multiple files
wc -c *.log --total
```

### Advanced Examples

```bash
# Count unique words in a file
cat file.txt | tr -s '[:space:]' '\n' | sort | uniq | wc -l

# Count lines containing a pattern
grep "ERROR" logfile.txt | wc -l

# Count files recursively in a directory
find . -type f | wc -l

# Count characters (not bytes) in a UTF-8 file
wc -m utf8_file.txt
```

## ENVIRONMENT
No specific environment variables directly affect `wc` behavior.

## SEE ALSO
cat(1), grep(1), sort(1), uniq(1), awk(1), tr(1)

## TIPS

1. **For line counts only**, `-l` is much faster than the default operation since it doesn't need to parse words.

2. **Get exact file sizes** using the `-c` option instead of `ls -l` which shows rounded values.

3. **Count characters in multibyte encodings** (like UTF-8) using `-m` instead of `-c` which counts bytes.

4. **Combine with `find`** to count specific file types:
   ```bash
   find . -name "*.java" | xargs wc -l
   ```

5. **Use `--files0-from`** to handle files with spaces:
   ```bash
   find . -name "*.txt" -print0 | wc --files0-from=-
   ```

## COMMON ERRORS

| Error/Confusion                       | Explanation/Solution                          |
|--------------------------------------|--------------------------------------------|
| Line count doesn't match expectations | Files might not end with a newline character |
| Character vs byte count discrepancy   | Use `-m` for characters and `-c` for bytes in multibyte encodings |
| Zero counts for binary files          | Expected behavior; `wc` is designed for text files |
| "No such file" errors                 | Check file paths and permissions |

## VERSION DIFFERENCES

- **GNU wc** (Linux): Supports options like `--max-line-length` and `--files0-from`.
- **BSD wc** (macOS, FreeBSD): May have fewer options than GNU version.
- **POSIX wc**: Only guarantees `-c`, `-l`, and `-w` options for portability.

Check your version with `wc --version` on GNU systems.
