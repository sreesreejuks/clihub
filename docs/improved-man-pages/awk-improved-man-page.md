# AWK(1) User Commands

## NAME
**awk** - pattern scanning and processing language

## QUICK START
```bash
# Print specific fields (columns) from a file
awk '{print $1, $3}' file.txt

# Filter lines matching a pattern
awk '/pattern/' file.txt

# Use field separator other than whitespace
awk -F: '{print $1, $3}' /etc/passwd

# Process with variables and calculations
awk '{sum += $1} END {print "Sum:", sum}' numbers.txt
```

## VISUAL SYNTAX
```
awk [OPTION]... [program] [file]...
awk [OPTION]... -f program-file [file]...
```

## DESCRIPTION
`awk` is a powerful programming language designed for text processing and typically used as a data extraction and reporting tool. It scans each input line, matches patterns, and performs actions. The name "awk" comes from its creators: Aho, Weinberger, and Kernighan. It treats each input line as a record containing fields separated by whitespace (by default).

## COMMONLY USED OPTIONS

### General Options
| Option | Description | Example |
|--------|-------------|---------|
| `-F fs` | Set field separator | `awk -F: '{print $1}' /etc/passwd` |
| `-f file` | Read program from file | `awk -f script.awk data.txt` |
| `-v var=val` | Assign value to variable | `awk -v name="John" '{print name, $1}' file.txt` |
| `-e program` | Specify program as an argument | `awk -e '{print $1}' file.txt` |
| `--posix` | Use POSIX compatibility mode | `awk --posix '{print $1}' file.txt` |
| `--` | Signal end of options | `awk -- '{print $1}' -filename.txt` |

### Diagnostic Options
| Option | Description | Example |
|--------|-------------|---------|
| `-d[file]` | Debug mode, dump to file | `awk -d '{print $1}' file.txt` |
| `--dump-variables[=file]` | Print globals to file | `awk --dump-variables '{print $1}' file.txt` |
| `--lint[=fatal]` | Check syntax | `awk --lint '{print $1}' file.txt` |
| `--profile[=file]` | Generate profiling code | `awk --profile '{print $1}' file.txt` |

### Input Processing Options
| Option | Description | Example |
|--------|-------------|---------|
| `-b` | Treat all input as binary | `awk -b '{print}' binary_file` |
| `-r` | Treat all input as record-oriented | `awk -r '{print}' data.txt` |
| `-L [val]` | Non-decimal input uses locale settings | `awk -L '{print $1}' file.txt` |
| `-N` | Treat all input as non-decimal | `awk -N '{print $1}' file.txt` |
| `-l [lib]` | Load extension library | `awk -l mathlib '{print sin($1)}' file.txt` |

## AWK PROGRAM STRUCTURE

An AWK program consists of a sequence of pattern-action statements:

```
pattern { action }
```

### Program Sections
| Section | Description | Example |
|---------|-------------|---------|
| `BEGIN {...}` | Actions performed before processing | `BEGIN {print "Start";}` |
| `pattern {...}` | Actions performed on matching lines | `/error/ {print $0;}` |
| `END {...}` | Actions performed after processing | `END {print "Total:", count}` |

### Patterns
| Pattern | Description | Example |
|---------|-------------|---------|
| `/regex/` | Lines matching regular expression | `/^[0-9]+/ {print $0}` |
| `expression` | Lines where expression is true | `$1 > 100 {print $0}` |
| `pattern1, pattern2` | Range of lines from pattern1 to pattern2 | `/START/, /END/ {print}` |
| `BEGIN` | Executed before any input is read | `BEGIN {FS=":"; OFS="\t"}` |
| `END` | Executed after all input is read | `END {print "Total:", sum}` |

### Fields
| Reference | Description | Example |
|-----------|-------------|---------|
| `$0` | Entire line/record | `{print $0}` |
| `$1, $2, ...` | Field 1, Field 2, etc. | `{print $1, $3}` |
| `$(expr)` | Field selected by expression result | `{print $(i+1)}` |
| `NF` | Number of fields in current record | `{print $1, $NF}` |

## BUILT-IN VARIABLES

### Data Processing Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `$0` | Current input record | - |
| `$n` | nth field in current record | - |
| `FS` | Field separator | `" "` (space) |
| `OFS` | Output field separator | `" "` (space) |
| `RS` | Record separator | `"\n"` (newline) |
| `ORS` | Output record separator | `"\n"` (newline) |
| `FPAT` | Field pattern | `"[^[:space:]]+"` |
| `IGNORECASE` | Ignore case in regex | `0` (case-sensitive) |

### Positional Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `NF` | Number of fields in current record | - |
| `NR` | Current record number | - |
| `FNR` | Current record number in file | - |
| `ARGC` | Number of command-line arguments | - |
| `ARGV` | Array of command-line arguments | - |
| `ARGIND` | Index of current file in ARGV | - |
| `FILENAME` | Current input filename | - |

### Formatting Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `OFMT` | Output format for numbers | `"%.6g"` |
| `CONVFMT` | Conversion format for numbers | `"%.6g"` |
| `BINMODE` | Binary mode for I/O | `0` |
| `FIELDWIDTHS` | Fixed width field spec | - |
| `SUBSEP` | Subscript separator | `"\034"` |

## OPERATORS

### Arithmetic Operators
| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `a + b` |
| `-` | Subtraction | `a - b` |
| `*` | Multiplication | `a * b` |
| `/` | Division | `a / b` |
| `%` | Modulus | `a % b` |
| `^` | Exponentiation | `a ^ b` |
| `++` | Increment | `a++` or `++a` |
| `--` | Decrement | `a--` or `--a` |

### String Operators
| Operator | Description | Example |
|----------|-------------|---------|
| Space | Concatenation | `"abc" "def"` |
| `~` | Matches regex | `$1 ~ /pattern/` |
| `!~` | Doesn't match regex | `$1 !~ /pattern/` |

### Comparison Operators
| Operator | Description | Example |
|----------|-------------|---------|
| `<` | Less than | `a < b` |
| `<=` | Less than or equal | `a <= b` |
| `==` | Equal | `a == b` |
| `!=` | Not equal | `a != b` |
| `>=` | Greater than or equal | `a >= b` |
| `>` | Greater than | `a > b` |

### Logical Operators
| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | Logical AND | `a && b` |
| `\|\|` | Logical OR | `a \|\| b` |
| `!` | Logical NOT | `!a` |

### Assignment Operators
| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Assignment | `a = 10` |
| `+=`, `-=`, etc. | Operation and assignment | `a += 5` |

## BUILT-IN FUNCTIONS

### String Functions
| Function | Description | Example |
|----------|-------------|---------|
| `length(str)` | Length of string | `length($1)` |
| `index(str, substr)` | Position of substring | `index($1, "abc")` |
| `substr(str, pos, len)` | Extract substring | `substr($1, 2, 3)` |
| `match(str, regex)` | Match regex in string | `match($1, /[0-9]+/)` |
| `split(str, arr, sep)` | Split string into array | `split($1, a, ",")` |
| `sub(regex, repl, str)` | Replace first match | `sub(/old/, "new", $1)` |
| `gsub(regex, repl, str)` | Replace all matches | `gsub(/old/, "new")` |
| `tolower(str)` | Convert to lowercase | `tolower($1)` |
| `toupper(str)` | Convert to uppercase | `toupper($1)` |
| `sprintf(fmt, expr...)` | Format string | `sprintf("%.2f", $1)` |
| `gensub(r, s, h, t)` | Advanced substitution | `gensub(/a/, "b", "g")` |

### Mathematical Functions
| Function | Description | Example |
|----------|-------------|---------|
| `int(x)` | Integer part of x | `int(3.14)` |
| `sqrt(x)` | Square root | `sqrt(16)` |
| `exp(x)` | Exponential | `exp(1)` |
| `log(x)` | Natural logarithm | `log(10)` |
| `sin(x)`, `cos(x)` | Trigonometric functions | `sin(0)` |
| `atan2(y, x)` | Arc tangent | `atan2(1, 0)` |
| `rand()` | Random number (0-1) | `rand()` |
| `srand(x)` | Seed random number generator | `srand(42)` |

### I/O Functions
| Function | Description | Example |
|----------|-------------|---------|
| `print expr,...` | Print to stdout | `print $1, $2` |
| `printf(fmt, expr,...)` | Formatted print | `printf("%.2f", $1)` |
| `getline` | Read next input line | `getline var` |
| `system(cmd)` | Execute shell command | `system("ls -l")` |
| `close(file)` | Close file/pipe | `close("file.txt")` |
| `fflush(file)` | Flush file buffer | `fflush("")` |

### Time Functions (GNU awk)
| Function | Description | Example |
|----------|-------------|---------|
| `systime()` | Current time (seconds since epoch) | `systime()` |
| `strftime(fmt, timestamp)` | Format time string | `strftime("%Y-%m-%d")` |
| `mktime(datespec)` | Make timestamp from date string | `mktime("2023 01 01 12 00 00")` |

## PRACTICAL EXAMPLES

### Basic Field Processing
```bash
# Print first and third field
awk '{print $1, $3}' file.txt

# Print last field
awk '{print $NF}' file.txt

# Print all fields in reverse order
awk '{for (i=NF; i>=1; i--) printf "%s ", $i; print ""}' file.txt

# Sum the values in first column
awk '{sum += $1} END {print "Sum:", sum}' file.txt

# Calculate average of first field
awk '{sum += $1; count++} END {print "Average:", sum/count}' file.txt
```

### Filtering and Pattern Matching
```bash
# Print lines matching a pattern
awk '/error/' logfile.txt

# Print lines where first field is greater than 100
awk '$1 > 100' data.txt

# Print lines where field 3 matches regex
awk '$3 ~ /^[0-9]+$/' file.txt

# Print lines between START and END patterns
awk '/START/,/END/' file.txt

# Print all except lines matching pattern
awk '!/pattern/' file.txt

# Print the line number and contents for matching lines
awk '/pattern/ {print NR, $0}' file.txt
```

### Field Manipulation
```bash
# Change field separator
awk -F: '{print $1, $3}' /etc/passwd

# Change output field separator
awk 'BEGIN {OFS=","} {print $1, $2, $3}' file.txt

# Read CSV file, output as TSV
awk -F, 'BEGIN {OFS="\t"} {print $1, $2, $3}' data.csv

# Reorder fields
awk '{print $3, $1, $2}' file.txt

# Add new fields
awk '{$4 = $1 + $2 + $3; print}' numbers.txt

# Remove a field
awk '{$2=""; print}' file.txt | awk '{$1=$1}1'
```

### Data Processing
```bash
# Count occurrences of patterns
awk '/pattern1/ {count1++} /pattern2/ {count2++} END {print "Pattern1:", count1, "Pattern2:", count2}' file.txt

# Calculate sum and average per group
awk '{sum[$1] += $2; count[$1]++} END {for (group in sum) print group, sum[group], sum[group]/count[group]}' data.txt

# Find maximum value
awk 'BEGIN {max = 0} {if ($1 > max) max = $1} END {print "Max:", max}' numbers.txt

# Remove duplicate lines
awk '!seen[$0]++' file.txt

# Replace field based on condition
awk '{if ($3 > 100) $3 = "HIGH"; print}' file.txt
```

### Text Transformation
```bash
# Convert to upper case
awk '{print toupper($0)}' file.txt

# Replace strings
awk '{gsub(/pattern/, "replacement"); print}' file.txt

# Add line numbers
awk '{print NR, $0}' file.txt

# Format output as CSV
awk 'BEGIN {OFS=","} {print $1, $2, $3}' file.txt

# Pad fields to fixed width
awk '{printf "%-20s %10s %5s\n", $1, $2, $3}' file.txt

# Extract substring
awk '{print substr($1, 1, 3)}' file.txt
```

### File Operations
```bash
# Process multiple files with filename
awk '{print FILENAME, $0}' file1.txt file2.txt

# Filter and write to different files
awk '$1 > 100 {print > "large.txt"; next} {print > "small.txt"}' data.txt

# Merge fields from two files
awk 'NR==FNR {a[$1]=$2; next} $1 in a {print $0, a[$1]}' file1.txt file2.txt

# Number lines per file
awk '{print FILENAME, FNR, $0}' file1.txt file2.txt

# Count lines, words, chars in file
awk '{chars += length($0) + 1; words += NF} END {print NR, words, chars}' file.txt

# Safely process file with ":" in name
awk -v INFILE="file:with:colons" '{print INFILE}' ARGV[1]=dummy
```

### Advanced Examples
```bash
# Simple spreadsheet column sum (A1:A10)
awk 'NR >= 1 && NR <= 10 {sum += $1} END {print "Sum(A1:A10):", sum}' data.txt

# Generate statistics (min, max, average, median)
awk '{
    sum += $1
    if (NR == 1 || $1 < min) min = $1
    if (NR == 1 || $1 > max) max = $1
    arr[NR] = $1
} END {
    avg = sum/NR
    asort(arr)
    if (NR % 2) median = arr[(NR+1)/2]
    else median = (arr[NR/2] + arr[NR/2+1])/2
    print "Min:", min, "Max:", max, "Avg:", avg, "Median:", median
}' numbers.txt

# Parse Apache log files
awk '
    /GET/ {gets++}
    /POST/ {posts++}
    {requests++}
    END {
        print "Total:", requests
        print "GET:", gets, "(" gets/requests*100 "%)"
        print "POST:", posts, "(" posts/requests*100 "%)"
    }
' access.log

# CSV to JSON conversion
awk -F, '
    BEGIN {
        print "["
        OFS="\""
    }
    NR==1 {
        for (i=1; i<=NF; i++) {
            headers[i] = $i
        }
        next
    }
    {
        print "  {"
        for (i=1; i<=NF; i++) {
            printf "    \"%s\": \"%s\"%s\n", headers[i], $i, (i<NF ? "," : "")
        }
        print "  }" (NR==FNR ? "" : ",")
    }
    END {
        print "]"
    }
' data.csv

# Create a frequency table
awk '
    {count[$1]++}
    END {
        printf "%-20s %10s %10s\n", "Word", "Count", "Frequency"
        printf "%-20s %10s %10s\n", "----", "-----", "---------"
        for (word in count) {
            printf "%-20s %10d %10.2f%%\n", word, count[word], count[word]/NR*100
        }
    }
' data.txt
```

## ENVIRONMENT
The behavior of `awk` is affected by the following environment variables:

- `AWKPATH`: Directories to search for awk program files
- `AWKLIBPATH`: Directories to search for extension libraries
- `LC_ALL`, `LC_CTYPE`, `LANG`: Locale settings affecting character handling
- `POSIXLY_CORRECT`: When set, ensures POSIX-compliant behavior
- `TZ`: Time zone for time functions

## SEE ALSO
- `gawk` - GNU implementation of awk
- `mawk` - A faster implementation of awk
- `nawk` - New awk implementation
- `sed` - Stream editor for filtering and transforming text
- `grep` - Print lines matching a pattern
- `perl` - Perl language interpreter (more powerful alternative)
- `cut` - Remove sections from lines of files
- `join` - Join lines of two files on a common field

## TIPS
- For complex programs, use a separate script file with `-f` instead of command line
- Use `$0` to reference the entire line, useful for printing or modifying the whole record
- Remember that field numbering starts at 1, not 0
- Use BEGIN block for initialization and END block for final reporting
- For complex data processing, consider defining functions in the BEGIN block
- When manipulating fields, `$0` is automatically rebuilt from the fields using OFS
- Redirecting to a file with `>` or `>>` inside awk is extremely useful for splitting data
- For performance with large files, use more specific patterns to filter early
- Use arrays for storing aggregated data and associative arrays for lookups
- Remember to quote your awk program to prevent shell expansion
- Use the `-v` option to pass shell variables into your awk program

## COMMON ERRORS

| Error | Cause | Solution |
|-------|-------|----------|
| `awk: cmd. line:1: fatal: cannot open file 'file.txt' for reading` | File doesn't exist | Check path and file existence |
| `awk: cmd. line:1: warning: regexp escape sequence not recognized` | Invalid regex | Check regex pattern syntax |
| `awk: cmd. line:1: warning: [s]printf: value X out of range for format code Y` | Format specifier mismatch | Verify format string matches data type |
| `awk: cmd. line:1: fatal: division by zero attempted` | Dividing by zero | Check divisors for zero before division |
| `awk: cmd. line:1: fatal: attempt to use scalar X as an array` | Type mismatch | Ensure variables are used consistently |
| `awk: cmd. line:1: fatal: can't open file Z for reading` | File not found or no permission | Check permissions and path |
| `awk: cmd. line:1: warning: function name X conflicts with previously defined variable` | Name conflict | Use unique names for variables/functions |

## VERSION DIFFERENCES
- **GNU awk (gawk)**: The most feature-rich implementation with many extensions
- **mawk**: Faster implementation for basic operations
- **nawk**: New awk, a descendant of the original Bell Labs awk
- **POSIX awk**: The standardized subset of features supported across platforms

Notable differences:
- Time functions (`systime()`, `strftime()`) are only available in gawk
- Some string functions like `gensub()` are gawk-specific
- Regular expression handling differs between implementations
- Non-POSIX implementations may have different behavior for some operators
- GNU awk has more built-in variables and functions than standard awk
- Performance characteristics vary significantly between implementations
