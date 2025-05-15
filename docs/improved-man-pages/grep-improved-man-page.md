# GREP(1) - Improved Man Page

## NAME
grep - search for patterns in text

## QUICK START
```
grep "pattern" file        # Search for pattern in file
grep -i "pattern" file     # Case-insensitive search
grep -r "pattern" directory # Recursive search through directory
```

## VISUAL SYNTAX
```
grep [OPTIONS] PATTERN [FILE...]
```

## DESCRIPTION
`grep` searches for PATTERN in each FILE. It prints each line that matches the pattern.

By default, grep prints the matching lines. If no FILE is specified, grep reads from standard input.

## COMMONLY USED OPTIONS

### Search Control
| Option | Long Option | Description | Example |
|--------|-------------|-------------|---------|
| `-i` | `--ignore-case` | Ignore case distinctions | `grep -i "error" log.txt` |
| `-v` | `--invert-match` | Select non-matching lines | `grep -v "success" log.txt` |
| `-w` | `--word-regexp` | Match whole words only | `grep -w "log" file.txt` |
| `-x` | `--line-regexp` | Match whole lines only | `grep -x "exactly this" file.txt` |
| `-E` | `--extended-regexp` | Use extended regular expressions | `grep -E "error|warning" log.txt` |
| `-F` | `--fixed-strings` | Interpret pattern as fixed strings, not regex | `grep -F "a+b" file.txt` |

### Output Control
| Option | Long Option | Description | Example |
|--------|-------------|-------------|---------|
| `-n` | `--line-number` | Show line numbers | `grep -n "error" log.txt` |
| `-c` | `--count` | Print only a count of matches | `grep -c "error" log.txt` |
| `-l` | `--files-with-matches` | Print only names of files with matches | `grep -l "error" *.log` |
| `-L` | `--files-without-match` | Print only names of files without matches | `grep -L "error" *.log` |
| `-o` | `--only-matching` | Show only the matched parts | `grep -o "IP: [0-9.]+" log.txt` |
| `-A NUM` | `--after-context=NUM` | Print NUM lines after match | `grep -A 3 "error" log.txt` |
| `-B NUM` | `--before-context=NUM` | Print NUM lines before match | `grep -B 3 "error" log.txt` |
| `-C NUM` | `--context=NUM` | Print NUM lines around match | `grep -C 3 "error" log.txt` |

### File Selection
| Option | Long Option | Description | Example |
|--------|-------------|-------------|---------|
| `-r` | `--recursive` | Read all files under directories recursively | `grep -r "TODO" src/` |
| `-R` | `--dereference-recursive` | Like -r but follow symbolic links | `grep -R "config" /etc/` |
| `--include=GLOB` | | Search only files matching GLOB | `grep --include="*.py" -r "def" src/` |
| `--exclude=GLOB` | | Skip files matching GLOB | `grep --exclude="*.bak" -r "error" ./` |
| `--exclude-dir=GLOB` | | Skip directories matching GLOB | `grep --exclude-dir=".git" -r "TODO" ./` |

## REGULAR EXPRESSION BASICS
When not using `-F`, grep interprets PATTERN as a regular expression. Here are some basics:

| Pattern | Matches |
|---------|---------|
| `.` | Any single character |
| `^` | Start of line |
| `$` | End of line |
| `[abc]` | Any character in the set |
| `[^abc]` | Any character NOT in the set |
| `a*` | Zero or more occurrences of 'a' |
| `a+` | One or more occurrences of 'a' (with -E) |
| `a?` | Zero or one occurrence of 'a' (with -E) |
| `a{3}` | Exactly 3 occurrences of 'a' (with -E) |
| `a{3,5}` | 3 to 5 occurrences of 'a' (with -E) |
| `a\|b` | Either 'a' or 'b' (with -E) |
| `()` | Grouping (with -E) |

## PRACTICAL EXAMPLES

### Finding text in files
```bash
# Find "error" in a log file
grep "error" log.txt

# Find "error" regardless of case
grep -i "error" log.txt

# Find lines NOT containing "error"
grep -v "error" log.txt

# Count error occurrences
grep -c "error" log.txt
```

### Working with multiple files
```bash
# Search multiple files
grep "function" *.js

# Search recursively in a directory
grep -r "TODO" src/

# List only filenames containing "TODO"
grep -l "TODO" *.py

# Find in specific file types
grep --include="*.py" -r "def main" ./
```

### Context control
```bash
# Show 3 lines after match
grep -A 3 "error" log.txt

# Show 3 lines before match
grep -B 3 "error" log.txt

# Show 3 lines around match
grep -C 3 "error" log.txt
```

### Regular expression examples
```bash
# Find IP addresses using basic regex
grep -E "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" log.txt

# Find words starting with "error"
grep -E "\berror\w*" log.txt

# Find either "error" or "warning"
grep -E "error|warning" log.txt

# Find email addresses
grep -E "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" file.txt
```

### Combining with other commands
```bash
# Find errors and sort uniquely
grep "error" log.txt | sort | uniq

# Find errors in processes
ps aux | grep "nginx"

# Count occurrences of each error type
grep "error" log.txt | cut -d: -f2 | sort | uniq -c
```

## ENVIRONMENT
`grep` is affected by the following environment variables:

- `GREP_OPTIONS`: Default options added before any explicit options
- `LC_ALL`, `LC_CTYPE`, `LANG`: Locale settings that affect character interpretation

## SEE ALSO
egrep(1), fgrep(1), sed(1), awk(1), find(1)

## TIPS
- Use `-F` when searching for text with special regex characters to treat them literally
- Use `-w` to avoid partial word matches
- Combine `grep` with other commands using pipes for powerful text processing
- For complex patterns, consider using `-E` (extended regex) mode

## COMMON ERRORS
- **No matches found**: Check case sensitivity, use `-i` if needed
- **Too many matches**: Make pattern more specific or use `-w` for word boundaries
- **Pattern not working**: Check if you need `-E` for extended regex features
- **Regex errors**: Use `-F` if your search contains regex special characters

## VERSION DIFFERENCES
- GNU grep vs. BSD grep (macOS) have slight syntax differences
- For maximum portability, use basic features and avoid complex regex
