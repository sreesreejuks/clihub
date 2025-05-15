# TR(1) User Commands

## NAME
**tr** - translate or delete characters

## QUICK START
```bash
# Convert lowercase to uppercase
echo "hello world" | tr 'a-z' 'A-Z'

# Delete specific characters
echo "hello world" | tr -d 'aeiou'

# Squeeze repeated characters
echo "hello      world" | tr -s ' '

# Delete all but specified characters
echo "hello 123 world" | tr -cd 'a-zA-Z\n'
```

## VISUAL SYNTAX
```
tr [OPTION]... SET1 [SET2]
```

## DESCRIPTION
The `tr` command translates, deletes, or squeezes characters from standard input, writing to standard output. It works character by character, replacing or removing characters from SET1 with corresponding characters from SET2, or performing other specified operations.

## COMMONLY USED OPTIONS

| Option | Description | Example |
|--------|-------------|---------|
| `-c`, `--complement` | Complement the set of characters in SET1 | `tr -c 'a-zA-Z' ' '` |
| `-d`, `--delete` | Delete characters in SET1 | `tr -d '\n'` |
| `-s`, `--squeeze-repeats` | Replace each sequence of repeated characters with single occurrence | `tr -s ' '` |
| `-t`, `--truncate-set1` | Truncate SET1 to length of SET2 | `tr -t 'abcdef' '123'` |
| `--help` | Display help information | `tr --help` |
| `--version` | Output version information | `tr --version` |

## CHARACTER SETS AND CLASSES

### Character Set Notation
| Notation | Description | Example |
|----------|-------------|---------|
| `char1-char2` | All characters from char1 to char2 in ascending order | `a-z` |
| `[char*]` or `char*` | Repeat char until length of other set | `[a*]` or `a*` |
| `[char*n]` | Repeat char n times | `[a*5]` |
| `[\ooo]` | Octal value character | `[\141]` for 'a' |
| `[\x0a]` | Hex value character | `[\x41]` for 'A' |

### Character Classes
| Class | Description | Equivalent |
|-------|-------------|------------|
| `[:alnum:]` | Alphanumeric characters | `a-zA-Z0-9` |
| `[:alpha:]` | Alphabetic characters | `a-zA-Z` |
| `[:blank:]` | Space and tab | `[ \t]` |
| `[:cntrl:]` | Control characters | |
| `[:digit:]` | Digits | `0-9` |
| `[:graph:]` | Printable characters, excluding space | |
| `[:lower:]` | Lowercase letters | `a-z` |
| `[:print:]` | Printable characters, including space | |
| `[:punct:]` | Punctuation characters | |
| `[:space:]` | Whitespace characters | `[ \t\n\r\f\v]` |
| `[:upper:]` | Uppercase letters | `A-Z` |
| `[:xdigit:]` | Hexadecimal digits | `0-9a-fA-F` |

### Special Backslash Sequences
| Sequence | Description |
|----------|-------------|
| `\a` | Bell (alert) |
| `\b` | Backspace |
| `\f` | Form feed |
| `\n` | New line |
| `\r` | Carriage return |
| `\t` | Horizontal tab |
| `\v` | Vertical tab |
| `\\` | Backslash |

## PRACTICAL EXAMPLES

### Character Translation
```bash
# Convert lowercase to uppercase
echo "hello world" | tr 'a-z' 'A-Z'
# Output: HELLO WORLD

# Convert uppercase to lowercase
echo "HELLO WORLD" | tr 'A-Z' 'a-z'
# Output: hello world

# Convert spaces to tabs
echo "hello world" | tr ' ' '\t'
# Output: hello	world

# Convert newlines to spaces
tr '\n' ' ' < file.txt
# Output: all lines joined with spaces

# ROT13 encoding (shift letters 13 positions)
echo "hello" | tr 'a-zA-Z' 'n-za-mN-ZA-M'
# Output: uryyb
```

### Deleting Characters
```bash
# Delete all vowels
echo "hello world" | tr -d 'aeiou'
# Output: hll wrld

# Delete all digits
echo "hello123world456" | tr -d '0-9'
# Output: helloworld

# Delete all non-printable characters
tr -d "[:cntrl:]" < file.txt
# Output: file without control characters

# Delete all except letters and newlines
echo "hello 123 world!" | tr -cd 'a-zA-Z\n'
# Output: helloworld
```

### Squeezing Repeats
```bash
# Squeeze repeated spaces into single spaces
echo "hello    world" | tr -s ' '
# Output: hello world

# Squeeze repeated newlines into single newlines
tr -s '\n' < file.txt
# Output: file without multiple blank lines

# Squeeze multiple repeats of any character
echo "heeelllooo   wooorld" | tr -s 'a-zA-Z '
# Output: helo world
```

### Complex Transformations
```bash
# Uppercase all consonants only
echo "hello world" | tr 'bcdfghjklmnpqrstvwxyz' 'BCDFGHJKLMNPQRSTVWXYZ'
# Output: HeLLo WoRLD

# Replace punctuation with spaces
echo "hello, world! how are you?" | tr '[:punct:]' ' '
# Output: hello  world  how are you 

# Normalize whitespace (tabs to spaces + squeeze)
echo "hello   world	next" | tr '\t' ' ' | tr -s ' '
# Output: hello world next

# Create comma-separated list from whitespace-separated list
echo "item1 item2  item3	item4" | tr -s '[:space:]' ','
# Output: item1,item2,item3,item4
```

### Complement Set Operations
```bash
# Replace all non-alphanumeric characters with underscores
echo "hello, world! 123" | tr -c '[:alnum:]\n' '_'
# Output: hello__world__123

# Delete everything except digits
echo "hello123world456" | tr -cd '0-9'
# Output: 123456

# Keep only letters, digits, and safe punctuation
echo "hello, world! <script>" | tr -cd 'a-zA-Z0-9,. \n'
# Output: hello, world 
```

### Security-Related Examples
```bash
# Remove unprintable characters from file
tr -cd "[:print:]\n" < potentially_dangerous.txt > clean.txt

# Normalize line endings (Windows to Unix)
tr -d '\r' < windows_file.txt > unix_file.txt

# Generate random passwords (with external tools)
head -c 20 /dev/urandom | tr -cd '[:alnum:]' | head -c 16
```

## ENVIRONMENT
The behavior of `tr` is affected by the following environment variables:

- `LC_ALL`, `LC_CTYPE`, `LANG`: These affect the interpretation of character classes when using bracket expressions like `[:alpha:]`.

## SEE ALSO
- `sed` - Stream editor for filtering and transforming text
- `awk` - Pattern scanning and processing language
- `iconv` - Convert text from one character encoding to another
- `head` - Output the first part of files
- `tail` - Output the last part of files
- `cut` - Remove sections from each line of files

## TIPS
- When using character ranges like `a-z`, make sure they're not affected by the current locale settings if that matters for your application
- For complex transformations of many characters, consider using `sed` instead
- When working with UTF-8 or multibyte characters, be aware that `tr` operates on bytes, not characters
- Use `tr -d '\r'` to convert DOS/Windows line endings to Unix line endings
- For squeezing whitespace, the combination `tr -s '[:space:]'` is safer than just `tr -s ' '`
- Be careful with the complement option (`-c`) - it affects all characters not in the specified set, including newlines
- Remember that `tr` always reads from stdin, not from files specified as arguments

## COMMON ERRORS

| Error | Cause | Solution |
|-------|-------|----------|
| `tr: missing operand` | Command requires at least SET1 | Add SET1 to the command |
| `tr: extra operand` | Too many parameters | Check syntax and quotes |
| `tr: range-endpoints of 'X-Y' are in reverse collating sequence order` | Invalid character range | Fix range order (`a-z` not `z-a`) |
| `tr: invalid character class` | Invalid or unsupported character class | Check character class syntax |
| `tr: when translating, string1 and string2 must be the same length` | SET1 longer than SET2 without -t | Add -t flag or make both sets equal length |
| No apparent changes in output | Missing or incorrectly specified characters | Verify character ranges and special characters |

## VERSION DIFFERENCES
- **GNU tr** (Linux): Supports all options mentioned above
- **BSD tr** (macOS): May have minor differences in handling character classes
- **POSIX tr**: The standardized subset of features supported across platforms

Notable differences:
- Some systems may not support all character classes
- The behavior of the complement option (`-c`) may vary slightly between implementations
- Special sequence handling may differ between implementations
