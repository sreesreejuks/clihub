# SED(1) User Commands

## NAME
**sed** - stream editor for filtering and transforming text

## QUICK START
```bash
# Replace first occurrence of a pattern in each line
sed 's/old/new/' file.txt

# Replace all occurrences of a pattern in each line
sed 's/old/new/g' file.txt

# Edit file in place (modify the original file)
sed -i 's/old/new/g' file.txt

# Apply multiple editing commands
sed -e 's/old/new/g' -e '/pattern/d' file.txt
```

## VISUAL SYNTAX
```
sed [OPTION]... {script} [input-file]...
sed [OPTION]... -f script-file [input-file]...
```

## DESCRIPTION
`sed` (stream editor) is a powerful text processing tool that performs basic text transformations on an input stream (file or input from a pipeline). It reads input line by line, applying specified operations to each line, then outputs the result. Unlike interactive text editors, sed works non-interactively, making it ideal for automated text processing in scripts.

## COMMONLY USED OPTIONS

### General Options
| Short | Long | Description | Example |
|-------|------|-------------|---------|
| `-n` | `--quiet`, `--silent` | Suppress automatic printing of pattern space | `sed -n '/pattern/p' file.txt` |
| `-e` | `--expression=script` | Add script to commands to be executed | `sed -e 's/a/b/' -e 's/c/d/' file.txt` |
| `-f` | `--file=script-file` | Add contents of script-file to commands | `sed -f commands.sed file.txt` |
| `-i[SUFFIX]` | `--in-place[=SUFFIX]` | Edit files in place (makes backup if SUFFIX supplied) | `sed -i.bak 's/old/new/g' file.txt` |
| `-E` | `--regexp-extended` | Use extended regular expressions | `sed -E 's/[0-9]+/NUMBER/g' file.txt` |
| `-s` | `--separate` | Consider files as separate rather than continuous | `sed -s 's/^/- /' file1 file2` |

### Output Control Options
| Short | Long | Description | Example |
|-------|------|-------------|---------|
| `-l N` | `--line-length=N` | Specify line-wrap length for `l` command | `sed -l 80 'l' file.txt` |
| `-u` | `--unbuffered` | Load minimal amounts of data and flush output buffers frequently | `sed -u 's/error/ERROR/g' logfile` |
| `--follow-symlinks` | | Follow symlinks when processing in place | `sed -i --follow-symlinks 's/old/new/g' symlink.txt` |

## SED COMMANDS AND ADDRESSING

### Addresses
Addresses determine which lines a command operates on:

| Address Form | Description | Example |
|--------------|-------------|---------|
| `n` | Line number | `sed '5d' file.txt` (delete line 5) |
| `$` | Last line | `sed '$d' file.txt` (delete last line) |
| `/regex/` | Lines matching regex | `sed '/error/d' file.txt` (delete lines with "error") |
| `addr1,addr2` | Range of lines | `sed '1,5d' file.txt` (delete lines 1-5) |
| `addr1,+n` | addr1 and n lines after | `sed '/start/,+3d' file.txt` (delete match plus 3 lines) |
| `addr1,~n` | addr1 to next line divisible by n | `sed '1,~3d' file.txt` (delete lines in groups of 3) |
| `addr!` | Lines not matching addr | `sed '/error/!d' file.txt` (keep only lines with "error") |

### Basic Commands

| Command | Description | Example |
|---------|-------------|---------|
| `s/regex/replacement/flags` | Substitute text | `sed 's/hello/world/g' file.txt` |
| `d` | Delete line(s) | `sed '/pattern/d' file.txt` |
| `p` | Print line(s) (often used with -n) | `sed -n '/pattern/p' file.txt` |
| `i\text` | Insert text before line | `sed '3i\New line' file.txt` |
| `a\text` | Append text after line | `sed '/pattern/a\New line' file.txt` |
| `c\text` | Change (replace) line | `sed '/pattern/c\New content' file.txt` |
| `y/set1/set2/` | Transliterate characters | `sed 'y/abc/ABC/' file.txt` |
| `q` | Quit | `sed '/END/q' file.txt` |
| `r file` | Read file contents | `sed '/Here/r insert.txt' file.txt` |
| `w file` | Write pattern space to file | `sed -n '/important/w extract.txt' file.txt` |

### Substitution Flags

| Flag | Description | Example |
|------|-------------|---------|
| `g` | Global (all occurrences on a line) | `sed 's/old/new/g' file.txt` |
| `number` | Replace only nth occurrence | `sed 's/old/new/2' file.txt` |
| `p` | Print modified lines (often with -n) | `sed -n 's/old/new/p' file.txt` |
| `w file` | Write modified lines to file | `sed 's/old/new/w changes.txt' file.txt` |
| `i` | Case-insensitive match | `sed 's/old/new/gi' file.txt` |
| `I` | Case-insensitive match (GNU extension) | `sed 's/old/new/gI' file.txt` |

### Hold Space Commands

| Command | Description | Example |
|---------|-------------|---------|
| `h` | Copy pattern space to hold space | `sed 'h;s/old/new/g;H;g' file.txt` |
| `H` | Append pattern space to hold space | `sed '/pattern/H' file.txt` |
| `g` | Copy hold space to pattern space | `sed 'h;s/old/new/;g' file.txt` |
| `G` | Append hold space to pattern space | `sed 'G' file.txt` (add blank line after each line) |
| `x` | Exchange pattern and hold spaces | `sed '/begin/,/end/x' file.txt` |

## REGULAR EXPRESSIONS

### Basic Regular Expression Elements
| Element | Description | Example |
|---------|-------------|---------|
| `.` | Any single character | `sed 's/h.t/HOT/g'` |  
| `*` | Zero or more of previous character | `sed 's/ta*/tb/g'` |
| `^` | Beginning of line | `sed 's/^/> /g'` (add `> ` at start of each line) |
| `$` | End of line | `sed 's/$/;/g'` (add `;` at end of each line) |
| `[]` | Character class | `sed 's/[aeiou]/X/g'` |
| `[^]` | Negated character class | `sed 's/[^0-9]/_/g'` |
| `\(pattern\)` | Capture group (basic regex) | `sed 's/\(foo\)\(bar\)/\2\1/g'` |
| `\n` | Backreference | `sed 's/\(a\)b\1/FOUND/g'` |

### Extended Regular Expression Elements
When using `-E` or `-r`:

| Element | Description | Example |
|---------|-------------|---------|
| `+` | One or more of previous character | `sed -E 's/ta+/tb/g'` |
| `?` | Zero or one of previous character | `sed -E 's/colou?r/COLOR/g'` |
| `{n}` | Exactly n occurrences | `sed -E 's/[0-9]{3}/NUM/g'` |
| `{n,m}` | n to m occurrences | `sed -E 's/[0-9]{2,4}/NUM/g'` |
| `(pattern)` | Capture group (extended regex) | `sed -E 's/(foo)(bar)/\2\1/g'` |
| `|` | Alternation (OR) | `sed -E 's/(cat|dog)/animal/g'` |

## PRACTICAL EXAMPLES

### Basic Text Substitution
```bash
# Replace first occurrence of "apple" with "orange" on each line
sed 's/apple/orange/' file.txt

# Replace all occurrences of "apple" with "orange"
sed 's/apple/orange/g' file.txt

# Replace only the 3rd occurrence of "apple" on each line
sed 's/apple/orange/3' file.txt

# Case-insensitive replacement
sed 's/apple/orange/gi' file.txt

# Replace "apple" with "orange" only on lines containing "fruit"
sed '/fruit/s/apple/orange/g' file.txt
```

### Line Operations
```bash
# Print lines 1-5
sed -n '1,5p' file.txt

# Delete lines 1-5
sed '1,5d' file.txt

# Delete blank lines
sed '/^$/d' file.txt

# Delete lines containing "pattern"
sed '/pattern/d' file.txt

# Delete lines not containing "pattern"
sed '/pattern/!d' file.txt

# Insert "# " at the beginning of each line (comment out)
sed 's/^/# /' file.txt

# Remove first 3 characters from each line
sed 's/^...//' file.txt

# Keep only lines between "START" and "END" patterns (inclusive)
sed -n '/START/,/END/p' file.txt

# Add a blank line after each line
sed G file.txt
```

### Multiple Commands and In-place Editing
```bash
# Apply multiple substitutions
sed -e 's/apple/orange/g' -e 's/red/blue/g' file.txt

# Edit file in-place
sed -i 's/apple/orange/g' file.txt

# Edit file in-place with backup
sed -i.bak 's/apple/orange/g' file.txt

# Use a script file for complex operations
sed -f script.sed file.txt
```

### Advanced Examples
```bash
# Reverse order of lines in a file
sed '1!G;h;$!d' file.txt

# Extract lines between two patterns (exclusive)
sed -n '/START/,/END/{/START/n;/END/b;p}' file.txt

# Number non-blank lines
sed '/./=' file.txt | sed 'N; s/\n/ /'

# Remove trailing whitespace
sed 's/[ \t]*$//' file.txt

# Convert DOS/Windows line endings to Unix
sed 's/\r$//' file.txt

# Double-space a file (add blank line between each line)
sed G file.txt

# Add line numbers with leading zeros
sed = file.txt | sed 'N;s/\n/\t/' | sed 's/^[ \t]*//' | sed 's/^/000/' | sed 's/\(.*\)\t\(.*\)/\1\t\2/'
```

### Multiline Processing
```bash
# Join lines (replace newlines with space)
sed ':a;N;$!ba;s/\n/ /g' file.txt

# Join lines that end with backslash
sed -e :a -e '/\\$/N; s/\\\n//; ta' file.txt

# Replace text across multiple lines
sed ':a;N;$!ba;s/line1\nline2/REPLACED/g' file.txt

# Delete block of lines matching start/end patterns
sed '/start/,/end/d' file.txt
```

### Working with CSV and Data Files
```bash
# Extract specific column from CSV (e.g., 3rd column)
sed -E 's/[^,]*,[^,]*,([^,]*).*/\1/' data.csv

# Add quotes around each CSV field
sed 's/\([^,]*\)/"\1"/g' data.csv

# Convert CSV to TSV (comma to tab)
sed 's/,/\t/g' data.csv

# Extract and format specific data
sed -n 's/.*id="\([^"]*\)".*/\1/p' xml_file.xml
```

## ENVIRONMENT
The behavior of `sed` is affected by the following environment variables:

- `LC_ALL`, `LC_CTYPE`, `LANG`: These affect pattern matching and character class interpretation
- `POSIXLY_CORRECT`: When set, ensures POSIX-compliant behavior
- `TMPDIR`: Directory for temporary files when using `-i` with large files

## SEE ALSO
- `awk` - Pattern scanning and processing language
- `grep` - Print lines matching a pattern
- `tr` - Translate or delete characters
- `ed` - Line-oriented text editor
- `perl` - Perl language interpreter (often used for similar text processing)
- `ex` - Line editor for the vi text editor

## TIPS
- Use single quotes around sed scripts to prevent shell expansion of special characters
- For complex operations, consider writing a sed script file instead of long command lines
- When working with large files, use `-i` with caution; consider making backups
- For very complex text manipulations, consider `awk` or `perl` as alternatives
- When debugging complex sed scripts, add `-n` and explicit print commands (`p`) to see only the affected lines
- Use the `q` command to exit early when processing large files if you only need results from the beginning
- Remember that `sed` processes input line by line; multiline operations require special handling

## COMMON ERRORS

| Error | Cause | Solution |
|-------|-------|----------|
| `sed: -e expression #1, char X: unterminated 's' command` | Missing closing delimiter in substitution | Add closing delimiter (e.g., `/`) |
| `sed: couldn't open file: No such file or directory` | File doesn't exist or wrong path | Check file path and existence |
| `sed: -e expression #1, char X: unknown option to 's'` | Invalid flag after substitution | Check valid flags (g, p, i, etc.) |
| `sed: -e expression #1, char X: invalid reference \n on 's' command's RHS` | Invalid backreference | Check capture group exists and number is correct |
| `sed: couldn't edit file: not a regular file` | Trying to edit directories or special files with `-i` | Use `-i` only on regular files |
| `sed: invalid option -- 'X'` | Unrecognized command line option | Check valid options in documentation |

## VERSION DIFFERENCES
- **GNU sed** (Linux): Most feature-rich version with extensions like `-i` for in-place editing and `-r`/`-E` for extended regexes
- **BSD sed** (macOS): Has some syntax differences, particularly with labels and branching
- **POSIX sed**: The standardized subset of features supported across platforms

Notable differences:
- GNU sed supports case-insensitive matching with `/i` and `/I` flags
- BSD sed might require different syntax for multiline operations
- The `-i` option behaves differently between GNU and BSD versions (BSD requires an argument, even if empty)
- Some extended regex features may work differently across implementations
- Character escaping rules can vary between versions
